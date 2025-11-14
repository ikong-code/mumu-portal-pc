import React, { useState, useRef } from 'react';
import { Button, Card, Tag, message, Modal, Form, Input, Select, Radio, Upload, Checkbox, Row, Col } from 'antd';
import { ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { DatabaseOutlined, EditOutlined, PlusOutlined, EyeOutlined, DeleteOutlined, ShareAltOutlined } from '@ant-design/icons';
import { DATASET_TYPE_LIST, SHARE_MODE_LIST, DATA_FORMAT_LIST, DATA_SOURCE_LIST, DATASET_SHARE_METHOD_LIST } from './constants';
import { useRequest } from 'ahooks';
import axios from 'axios';
import type { UploadFile } from 'antd/es/upload/interface';
import './index.less';

const { Option } = Select;
const { TextArea } = Input;

// 数据类型定义
export interface DatasetItem {
  id: string;
  datasetSn: string;
  datasetName: string;
  datasetOssKey: string | null;
  ossUrl: string;
  datasetDesc: string;
  datasetType: string;
  shareMode: string;
  dataFormat: string;
  dataSource: string;
  uploadUserId: string;
  auditStatus: string;
  isShare: string;
  shareStartTime: string;
  coverImage: string;
  coverImageUrl: string;
  enName: string;
  resourceId: string | null;
  datasetDoi: string | null;
  paperDoi: string | null;
  dataAuthor: string;
  certificateNumber: string | null;
  region: string | null;
  usagePrice: number;
  dataIntro: string;
  citationInstructions: string;
  createTime: string;
  datasetCategoryList: string[];
  datasetCategoryNameList: string[] | null;
  uploadUserName: string | null;
  auditRemark: string;
  animalEthics: string;
  datasetEthics: string;
  hasManual: string;
  manualFilePath: string;
  protocolConfirmed: string;
  protocolConfirmTime: string;
  uploadUnit: string;
}

export interface DatasetListResponse {
  total: number;
  rows: DatasetItem[];
  code: number;
  msg: string;
}

export interface DatasetListParams {
  pageNum?: number;
  pageSize?: number;
  datasetName?: string;
  datasetType?: string;
  auditStatus?: string;
  isShare?: string;
}

// 数据分类接口类型定义
export interface DataCategoryItem {
  id: number;
  parentId: number;
  ancestors: string;
  name: string;
  code: string;
  level: number;
  orderNum: number;
  status: string;
  isDeleted: string;
  children: null | DataCategoryItem[];
}

const Datasets: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [coverImageFileList, setCoverImageFileList] = useState<UploadFile[]>([]);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [detailData, setDetailData] = useState<DatasetItem | null>(null);
  const actionRef = useRef<ActionType>();


  // 获取数据分类列表
  const { data: categoryList = [], loading: categoryLoading } = useRequest(
    async () => {
      const res = await axios.get<DataCategoryItem[]>('/system/dataCategory/list', {
        baseURL: 'http://47.99.151.88:10105',
      });
      // 接口直接返回数组
      if (Array.isArray(res.data)) {
        return res.data;
      }
      // 如果接口返回的是包装对象，尝试从 data 或 rows 中获取
      if (res.data && typeof res.data === 'object' && 'data' in res.data) {
        return (res.data as any).data || [];
      }
      if (res.data && typeof res.data === 'object' && 'rows' in res.data) {
        return (res.data as any).rows || [];
      }
      return [];
    },
    {
      manual: false, // 初始化自动执行
    }
  );

  // 打开新增弹窗
  const handleAdd = () => {
    setIsEdit(false);
    setEditingId(null);
    setModalVisible(true);
    form.resetFields();
    setCoverImageFileList([]);
    form.setFieldsValue({
      animalEthics: '0',
      datasetEthics: '0',
      hasManual: '0',
      protocolConfirmed: false,
      citationInstructions: '',
    });
  };

  // 打开编辑弹窗
  const handleEdit = async (record: DatasetItem) => {
    setIsEdit(true);
    setEditingId(record.id);
    setModalVisible(true);
    setLoading(true);
    
    try {
      // 获取详情
      const response = await axios.get(`/system/dataset/${record.id}`, {
        baseURL: 'http://47.99.151.88:10105',
      });

      if (response.data.code === 200 && response.data.data) {
        const detail = response.data.data;
        
        // 回显表单数据
        form.setFieldsValue({
          datasetName: detail.datasetName,
          enName: detail.enName,
          datasetType: detail.datasetType,
          shareMode: detail.shareMode,
          dataFormat: detail.dataFormat,
          dataSource: detail.dataSource,
          ossUrl: detail.ossUrl,
          dataCategory: detail.datasetCategoryList?.[0] || '',
          dataAuthor: detail.dataAuthor,
          uploadUnit: detail.uploadUnit,
          animalEthics: detail.animalEthics || '0',
          datasetEthics: detail.datasetEthics || '0',
          hasManual: detail.hasManual || '0',
          datasetDesc: detail.datasetDesc,
          dataIntro: detail.dataIntro,
          citationInstructions: detail.citationInstructions,
          protocolConfirmed: detail.protocolConfirmed === '1',
        });

        // 回显首图
        if (detail.coverImageUrl) {
          setCoverImageFileList([{
            uid: detail.coverImage || '-1',
            name: 'cover.jpg',
            status: 'done',
            url: detail.coverImageUrl,
          }]);
        } else {
          setCoverImageFileList([]);
        }
      } else {
        message.error(response.data.msg || '获取数据集详情失败');
      }
    } catch (error: any) {
      console.error('获取数据集详情失败:', error);
      message.error(error.response?.data?.msg || '获取数据集详情失败');
    } finally {
      setLoading(false);
    }
  };

  // 提交表单
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      // 检查协议确认是否勾选
      if (!values.protocolConfirmed) {
        message.warning('请确认数据共享协议后再提交');
        return;
      }
      
      setLoading(true);

      // 处理首图
      let coverImage = '';
      if (coverImageFileList.length > 0 && coverImageFileList[0].response) {
        coverImage = coverImageFileList[0].response.data?.id || coverImageFileList[0].uid;
      } else if (coverImageFileList.length > 0 && coverImageFileList[0].uid) {
        coverImage = coverImageFileList[0].uid;
      }

      // 处理协议确认时间，格式：YYYY-MM-DD HH:mm:ss
      const protocolConfirmTime = values.protocolConfirmed 
        ? (() => {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
          })()
        : '';

      const submitData: any = {
        datasetName: values.datasetName,
        ossUrl: values.ossUrl,
        datasetDesc: values.datasetDesc,
        datasetType: values.datasetType,
        shareMode: values.shareMode,
        dataFormat: values.dataFormat,
        dataSource: values.dataSource,
        enName: values.enName,
        dataAuthor: values.dataAuthor,
        dataIntro: values.dataIntro,
        citationInstructions: values.citationInstructions,
        datasetCategoryList: values.dataCategory ? [values.dataCategory] : [],
        dataCategory: values.dataCategory,
        animalEthics: values.animalEthics || '0',
        datasetEthics: values.datasetEthics || '0',
        hasManual: values.hasManual || '0',
        protocolConfirmed: values.protocolConfirmed ? '1' : '0',
        protocolConfirmTime: protocolConfirmTime,
        uploadUnit: values.uploadUnit,
      };

      if (coverImage) {
        submitData.coverImage = coverImage;
      }

      let response;
      if (isEdit && editingId) {
        // 编辑
        submitData.id = editingId.toString();
        response = await axios.put('/system/dataset', submitData, {
          baseURL: 'http://47.99.151.88:10105',
        });
      } else {
        // 新增
        response = await axios.post('/system/dataset/user', submitData, {
          baseURL: 'http://47.99.151.88:10105',
        });
      }

      if (response.data.code === 200) {
        message.success(response.data.msg || '操作成功');
        setModalVisible(false);
        form.resetFields();
        setCoverImageFileList([]);
        // 刷新列表
        actionRef.current?.reload();
      } else {
        message.error(response.data.msg || '操作失败');
      }
    } catch (error: any) {
      console.error('提交失败:', error);
      const errorMsg = error.response?.data?.msg || error.message || '操作失败';
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // 取消弹窗
  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
    setCoverImageFileList([]);
    setIsEdit(false);
    setEditingId(null);
  };

  // 打开数据详情弹窗
  const handleViewDetail = (record: DatasetItem) => {
    setDetailData(record);
    setDetailModalVisible(true);
  };

  // 删除数据集
  const handleDelete = (record: DatasetItem) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除数据集"${record.datasetName}"吗？此操作不可恢复。`,
      okText: '确定',
      cancelText: '取消',
      okType: 'danger',
      onOk: async () => {
        try {
          setLoading(true);
          const response = await axios.delete(`/system/dataset/${record.id}`, {
            baseURL: 'http://47.99.151.88:10105',
          });

          if (response.data.code === 200) {
            message.success(response.data.msg || '删除成功');
            // 刷新列表
            actionRef.current?.reload();
          } else {
            message.error(response.data.msg || '删除失败');
          }
        } catch (error: any) {
          console.error('删除失败:', error);
          const errorMsg = error.response?.data?.msg || error.message || '删除失败';
          message.error(errorMsg);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  // 共享数据集
  const handleShare = async (record: DatasetItem) => {
    try {
      setLoading(true);
      const response = await axios.put(`/system/dataset/user/share/${record.id}`, {
        isShare: record.isShare === '0' ? '1' : '0',
      }, {
        baseURL: 'http://47.99.151.88:10105',
      });

      if (response.data.code === 200) {
        message.success(response.data.msg || '共享成功');
        // 刷新列表
        actionRef.current?.reload();
      } else {
        message.error(response.data.msg || '共享失败');
      }
    } catch (error: any) {
      console.error('共享失败:', error);
      const errorMsg = error.response?.data?.msg || error.message || '共享失败';
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // 处理OSS文件选择（暂时用输入框，后续可以集成OSS选择器）
  const handleSelectOSSFile = () => {
    message.info('OSS文件选择功能待集成');
  };

  // 处理首图上传
  const handleCoverImageChange = (info: any) => {
    let fileList = [...info.fileList];
    
    // 限制只能上传一张
    fileList = fileList.slice(-1);
    
    // 读取上传后的文件
    fileList = fileList.map((file) => {
      if (file.response) {
        // 如果接口返回了图片ID和URL
        if (file.response.data?.id) {
          file.uid = file.response.data.id;
        }
        if (file.response.data?.url) {
          file.url = file.response.data.url;
        }
      }
      return file;
    });

    setCoverImageFileList(fileList);
  };

  // 自定义上传方法
  const customUpload = async (options: any) => {
    const { file, onSuccess, onError } = options;
    const formData = new FormData();
    formData.append('file', file);

    try {
      // 这里需要替换为实际的上传接口
      const response = await axios.post('/system/upload/image', formData, {
        baseURL: 'http://47.99.151.88:10105',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.code === 200) {
        onSuccess(response.data.data, file);
      } else {
        onError(new Error(response.data.msg || '上传失败'));
      }
    } catch (error: any) {
      onError(error);
    }
  };

  // 首图上传前验证
  const beforeUpload = (file: File) => {
    const isImage = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg';
    if (!isImage) {
      message.error('只能上传 PNG/JPG/JPEG 格式的图片!');
      return false;
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('图片大小不能超过 5MB!');
      return false;
    }
    return true;
  };

  const columns: ProColumns<DatasetItem>[] = [
    {
      title: '名称',
      dataIndex: 'datasetName',
      key: 'datasetName',
      width: 200,
      fixed: 'left',
      ellipsis: true,
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{text}</div>
          {record.enName && (
            <div style={{ fontSize: 12, color: '#666' }}>{record.enName}</div>
          )}
        </div>
      ),
    },
    {
      title: '类型',
      dataIndex: 'datasetType',
      key: 'datasetType',
      width: 120,
      search: false,
      render: (_, record) => {
        const type = record.datasetType;
        const typeMap: Record<string, { color: string; text: string }> = {
          '图像数据集': { color: 'blue', text: '图像数据集' },
          '文本数据集': { color: 'green', text: '文本数据集' },
          '视频数据集': { color: 'purple', text: '视频数据集' },
        };
        const config = typeMap[type] || { color: 'default', text: type };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '场景类型',
      dataIndex: 'shareMode',
      search: false,
      key: 'shareMode',
      width: 120,
      render: (_, record) => {
        const mode = record.shareMode;
        const modeMap: Record<string, { color: string; text: string }> = {
          '室外放牧': { color: 'green', text: '室外放牧' },
          '室内养殖': { color: 'blue', text: '室内养殖' },
          '实验室': { color: 'purple', text: '实验室' },
        };
        const config = modeMap[mode] || { color: 'default', text: mode };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      search: false,
      title: '数据用途',
      dataIndex: 'dataFormat',
      key: 'dataFormat',
      width: 120,
      render: (_, record) => {
        const format = record.dataFormat;
        const formatMap: Record<string, { color: string; text: string }> = {
          '无限制使用': { color: 'green', text: '无限制使用' },
          '研究用途': { color: 'blue', text: '研究用途' },
          '商业用途': { color: 'orange', text: '商业用途' },
        };
        const config = formatMap[format] || { color: 'default', text: format };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      search: false,
      title: '数据来源',
      dataIndex: 'dataSource',
      key: 'dataSource',
      width: 120,
      render: (_, record) => {
        const source = record.dataSource;
        const sourceMap: Record<string, { color: string; text: string }> = {
          '技术企业': { color: 'blue', text: '技术企业' },
          '科研院所': { color: 'green', text: '科研院所' },
          '高校': { color: 'purple', text: '高校' },
          '政府机构': { color: 'orange', text: '政府机构' },
        };
        const config = sourceMap[source] || { color: 'default', text: source };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      search: false,
      title: '审核状态',
      dataIndex: 'auditStatus',
      key: 'auditStatus',
      width: 100,
      render: (_, record) => {
        const status = record.auditStatus;
        const statusMap: Record<string, { color: string; text: string }> = {
          '0': { color: 'default', text: '待审核' },
          '1': { color: 'success', text: '已通过' },
          '2': { color: 'error', text: '已拒绝' },
        };
        const config = statusMap[status] || { color: 'default', text: '未知' };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      search: false,
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 160,
      sorter: true,
    },
    {
      search: false,
      title: '是否共享',
      dataIndex: 'isShare',
      key: 'isShare',
      width: 100,
      render: (_, record) => {
        const isShare = record.isShare;
        const shareMap: Record<string, { color: string; text: string }> = {
          '0': { color: 'default', text: '否' },
          '1': { color: 'success', text: '是' },
        };
        const config = shareMap[isShare] || { color: 'default', text: '否' };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '开始共享时间',
      dataIndex: 'shareStartTime',
      key: 'shareStartTime',
      width: 160,
      valueType: 'dateTime',
      render: (_, record) => record.shareStartTime || '-',
    },
    {
      search: false,
      title: '操作',
      key: 'action',
      width: 300,
      fixed: 'right',
      render: (_, record) => (
        <>
          <Button 
            style={{padding: 0, marginRight: 8}}
            type="link" 
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
          >
            数据详情
          </Button>
          <Button 
            style={{padding: 0, marginRight: 8}}
            type="link" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          {record.auditStatus === '0' && (
            <>
              <Button 
                style={{padding: 0, marginRight: 8}}
                type="link" 
                icon={<ShareAltOutlined />}
                onClick={() => handleShare(record)}
              >
                共享
              </Button>
              <Button 
                style={{padding: 0}}
                type="link" 
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record)}
              >
                删除
              </Button>
            </>
          )}
        </>
      ),
    },
  ];


  return (
    <div className="datasets">
      <div className="page-header">
        <h2>我的数据集</h2>
        <Button type="primary" icon={<DatabaseOutlined />} onClick={handleAdd}>新增数据集</Button>
      </div>
      
      <Card>
        <ProTable<DatasetItem, DatasetListParams>
          actionRef={actionRef}
          columns={columns}
          request={async (params) => {
            try {
              const response = await axios.get('/system/dataset/user/list', {
                baseURL: 'http://47.99.151.88:10105',
                params: {
                  pageNum: params.current || 1,
                  pageSize: params.pageSize || 10,
                  datasetName: params.datasetName,
                  datasetType: params.datasetType,
                  auditStatus: params.auditStatus,
                  isShare: params.isShare,
                },
              });

              // 根据实际接口返回格式，数据在 response.data.data 中
              const result = response.data;
              if (result.code === 200 && result.data) {
                const listData = result.data;
                return {
                  data: listData.rows || [],
                  success: true,
                  total: listData.total || 0,
                };
              } else {
                message.error(result.msg || '获取数据集列表失败');
              return {
                  data: [],
                  success: false,
                  total: 0,
                };
              }
            } catch (error: any) {
              console.error('获取数据集列表失败:', error);
              const errorMsg = error.response?.data?.msg || error.message || '获取数据集列表失败';
              message.error(errorMsg);
              return {
                data: [],
                success: false,
                total: 0,
              };
            }
          }}
          rowKey="id"
          search={{
            labelWidth: 'auto',
            defaultCollapsed: false,
          }}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
          scroll={{ x: 1400 }}
          dateFormatter="string"
          headerTitle="数据集列表"
          toolBarRender={() => [
            <Button key="refresh" onClick={() => window.location.reload()}>
              刷新
            </Button>,
          ]}
        />
      </Card>

      {/* 新增/编辑数据集弹窗 */}
      <Modal
        title={isEdit ? '编辑数据集' : '添加数据集'}
        open={modalVisible}
        onCancel={handleCancel}
        width={1000}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
            确定
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            ossUrl: 'https://dataset-bucket-ny00003.oss-cn-hangzhou.aliyuncs.com/%E4%BF%AF%E8%A7%86%E4%BD%8D%E7%BE%8A%E7%BE%A4%E5%85%B3%E9%94%AE%E7%82%B9%E3%80%81%E8%BE%B9%E7%95%8C%E6%A1%86%E3%80%81%E6%8E%A9%E7%A0%81%E6%95%B0%E6%8D%AE%E9%9B%86.zip',
          }}
          style={{ maxHeight: '70vh', overflowY: 'auto', paddingRight: 10 }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="数据集名称"
                name="datasetName"
                rules={[{ required: true, message: '请输入数据集名称' }]}
              >
                <Input placeholder="请输入数据集名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="英文名称"
                name="enName"
                rules={[{ required: true, message: '请输入英文名称' }]}
              >
                <Input placeholder="请输入英文名称" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="数据集类型"
                name="datasetType"
                rules={[{ required: true, message: '请选择数据集类型' }]}
              >
                <Select placeholder="请选择数据集类型">
                  {DATASET_TYPE_LIST.map(item => (
                    <Option key={item.value} value={item.value}>{item.label}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="场景类型"
                name="shareMode"
                rules={[{ required: true, message: '请选择场景类型' }]}
              >
                <Select placeholder="请选择场景类型">
                  {SHARE_MODE_LIST.map(item => (
                    <Option key={item.value} value={item.value}>{item.label}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="数据用途"
                name="dataFormat"
                rules={[{ required: true, message: '请选择数据用途' }]}
              >
                <Select placeholder="请选择数据用途">
                  {DATA_FORMAT_LIST.map(item => (
                    <Option key={item.value} value={item.value}>{item.label}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="数据来源"
                name="dataSource"
                rules={[{ required: true, message: '请选择数据来源' }]}
              >
                <Select placeholder="请选择数据来源">
                  {DATA_SOURCE_LIST.map(item => (
                    <Option key={item.value} value={item.value}>{item.label}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="畜种分类导航"
                name="dataCategory"
              >
                <Select 
                  placeholder="请选择畜种分类"
                  loading={categoryLoading}
                >
                  {categoryList.map((category: DataCategoryItem) => (
                    <Option key={category.id} value={String(category.id)}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="选择数据集">
                <Button type="primary" onClick={handleSelectOSSFile}>
                  从OSS选择文件
                </Button>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="OSS地址"
                name="ossUrl"
                rules={[{ required: true, message: '请选择数据集文件' }]}
              >
                <Input placeholder="请点击上方按钮选择数据集文件" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="数据作者"
                name="dataAuthor"
                rules={[{ required: true, message: '请输入数据作者' }]}
              >
                <Input placeholder="请输入数据作者" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="数据上传单位"
                name="uploadUnit"
                rules={[{ required: true, message: '请输入数据上传单位' }]}
              >
                <Input placeholder="请输入数据上传单位" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="是否涉及动物伦理"
                name="animalEthics"
                rules={[{ required: true, message: '请选择是否涉及动物伦理' }]}
              >
                <Radio.Group>
                  <Radio value="0">否</Radio>
                  <Radio value="1">是</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="数据集是否满足合规与隐私保护要求"
                name="datasetEthics"
                rules={[{ required: true, message: '请选择是否满足合规要求' }]}
              >
                <Radio.Group>
                  <Radio value="0">否</Radio>
                  <Radio value="1">是</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="是否有数据手册"
                name="hasManual"
              >
                <Radio.Group>
                  <Radio value="0">否</Radio>
                  <Radio value="1">是</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="首图"
            name="coverImage"
          >
            <Upload
              listType="picture-card"
              fileList={coverImageFileList}
              onChange={handleCoverImageChange}
              beforeUpload={beforeUpload}
              customRequest={customUpload}
              maxCount={1}
            >
              {coverImageFileList.length >= 1 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>上传</div>
                </div>
              )}
            </Upload>
            <div style={{ color: '#999', fontSize: 12, marginTop: 8 }}>
              请上传大小不超过5MB 格式为png/jpg/jpeg 的文件
            </div>
          </Form.Item>

          <Form.Item
            label="数据来源与用途说明"
            name="datasetDesc"
            rules={[{ required: true, message: '请输入数据来源与用途说明' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="请说明数据集为何被建立,强调背景、目的与未来用途。" 
            />
          </Form.Item>

          <Form.Item
            label="数据内容与格式说明"
            name="dataIntro"
            rules={[{ required: true, message: '请输入数据内容与格式说明' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="请简单介绍数据来源,以及包含采集,储存,处理等过程的基本信息。" 
            />
          </Form.Item>

          <Form.Item
            label="数据引用说明"
            name="citationInstructions"
            rules={[{ required: true, message: '请输入数据引用说明' }]}
          >
            <TextArea rows={3} 
            placeholder='本研究使用的数据来源于国家农业科学数据中心(动物科学)智慧畜牧业数据共享服务平台（https://www.ai4as.cn/），由[数据提交者姓名或单位，如适用]提供，特此致谢。' />
          </Form.Item>

          <Form.Item>
            <div style={{ marginBottom: 8 }}>
              <span>请仔细阅读并确认以下协议:</span>
              <Button type="link" style={{ padding: 0, marginLeft: 8 }}>
                数据共享协议
              </Button>
            </div>
            <Form.Item
              name="protocolConfirmed"
              valuePropName="checked"
              rules={[{ required: true, message: '请确认数据共享协议' }]}
            >
              <Checkbox>
                我已仔细阅读并同意上述数据共享协议的所有条款
              </Checkbox>
            </Form.Item>
          </Form.Item>
        </Form>
      </Modal>

      {/* 数据详情弹窗 */}
      <Modal
        title="数据详情"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        width={1000}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            关闭
          </Button>,
        ]}
      >
        {detailData && (
          <div style={{ maxHeight: '70vh', overflowY: 'auto', paddingRight: 10 }}>
            <Form layout="vertical" initialValues={detailData}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="数据集名称">
                    <Input value={detailData.datasetName} readOnly />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="英文名称">
                    <Input value={detailData.enName || ''} readOnly />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="数据集类型">
                    <Input value={detailData.datasetType || ''} readOnly />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="场景类型">
                    <Input value={detailData.shareMode || ''} readOnly />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="数据用途">
                    <Input value={detailData.dataFormat || ''} readOnly />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="数据来源">
                    <Input value={detailData.dataSource || ''} readOnly />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="畜种分类导航">
                    <Input 
                      value={detailData.datasetCategoryNameList?.join(', ') || ''} 
                      readOnly 
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="OSS地址">
                    <Input value={detailData.ossUrl || ''} readOnly />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="数据集编号">
                    <Input value={detailData.datasetSn || ''} readOnly />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="数据作者">
                    <Input value={detailData.dataAuthor || ''} readOnly />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="数据上传单位">
                    <Input value={detailData.uploadUnit || ''} readOnly />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="是否涉及动物伦理">
                    <Input 
                      value={detailData.animalEthics === '1' ? '是' : '否'} 
                      readOnly 
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="数据集是否满足合规与隐私保护要求">
                    <Input 
                      value={detailData.datasetEthics === '1' ? '是' : '否'} 
                      readOnly 
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="是否有数据手册">
                    <Input 
                      value={detailData.hasManual === '1' ? '是' : '否'} 
                      readOnly 
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="首图">
                {detailData.coverImageUrl ? (
                  <div>
                    <img 
                      src={detailData.coverImageUrl} 
                      alt="首图" 
                      style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }}
                    />
                  </div>
                ) : (
                  <div style={{ color: '#999' }}>暂无首图</div>
                )}
              </Form.Item>

              <Form.Item label="数据来源与用途说明">
                <TextArea 
                  value={detailData.datasetDesc || ''} 
                  rows={4} 
                  readOnly 
                />
              </Form.Item>

              <Form.Item label="数据内容与格式说明">
                <TextArea 
                  value={detailData.dataIntro || ''} 
                  rows={4} 
                  readOnly 
                />
              </Form.Item>

              <Form.Item label="数据引用说明">
                <TextArea 
                  value={detailData.citationInstructions || ''} 
                  rows={3} 
                  readOnly 
                />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="协议确认">
                    <Input 
                      value={detailData.protocolConfirmed === '1' ? '已确认' : '未确认'} 
                      readOnly 
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="协议确认时间">
                    <Input 
                      value={detailData.protocolConfirmTime || '-'} 
                      readOnly 
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="审核状态">
                    <Input 
                      value={
                        detailData.auditStatus === '0' ? '待审核' :
                        detailData.auditStatus === '1' ? '已通过' :
                        detailData.auditStatus === '2' ? '已拒绝' : '未知'
                      } 
                      readOnly 
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="是否共享">
                    <Input 
                      value={detailData.isShare === '1' ? '是' : '否'} 
                      readOnly 
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="开始共享时间">
                    <Input 
                      value={detailData.shareStartTime || '-'} 
                      readOnly 
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="创建时间">
                    <Input 
                      value={detailData.createTime || '-'} 
                      readOnly 
                    />
                  </Form.Item>
                </Col>
              </Row>

              {detailData.datasetDoi && (
                <Form.Item label="数据集DOI">
                  <Input value={detailData.datasetDoi} readOnly />
                </Form.Item>
              )}

              {detailData.paperDoi && (
                <Form.Item label="论文DOI">
                  <Input value={detailData.paperDoi} readOnly />
                </Form.Item>
              )}

              {detailData.certificateNumber && (
                <Form.Item label="证书编号">
                  <Input value={detailData.certificateNumber} readOnly />
                </Form.Item>
              )}

              {detailData.region && (
                <Form.Item label="地区">
                  <Input value={detailData.region} readOnly />
                </Form.Item>
              )}

              {detailData.usagePrice !== undefined && (
                <Form.Item label="使用价格">
                  <Input value={detailData.usagePrice} readOnly />
                </Form.Item>
              )}

              {detailData.auditRemark && (
                <Form.Item label="审核备注">
                  <TextArea 
                    value={detailData.auditRemark} 
                    rows={3} 
                    readOnly 
                  />
                </Form.Item>
              )}
            </Form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Datasets;
