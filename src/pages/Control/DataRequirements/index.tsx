import React, { useState, useRef } from 'react';
import { Button, Card, Tag, message, Modal, Form, Input, Upload } from 'antd';
import { ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { FileTextOutlined, EyeOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import axios from 'axios';
import type { UploadFile } from 'antd/es/upload/interface';
import './index.less';

const { TextArea } = Input;

// 数据类型定义
export interface DatasetDemandItem {
  id: string;
  userId: string;
  phone: string;
  demandName: string;
  demandCompany: string;
  demandDescription: string;
  demandMoney: number;
  publishStatus: string;
  demandStatus: string;
  auditStatus: string;
  demandContent: string | null;
  demandImage: string;
  demandImageUrl: string;
  userName: string | null;
  auditRemark: string | null;
  hasData: string | null;
}

export interface DatasetDemandListResponse {
  total: number;
  rows: DatasetDemandItem[];
  code: number;
  msg: string;
}

export interface DatasetDemandListParams {
  pageNum?: number;
  pageSize?: number;
  phone?: string;
}

const DataRequirements: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [viewData, setViewData] = useState<DatasetDemandItem | null>(null);
  const actionRef = useRef<ActionType>();

  // 打开新增弹窗
  const handleAdd = () => {
    setIsEdit(false);
    setEditingId(null);
    setModalVisible(true);
    form.resetFields();
    form.setFieldsValue({
      demandImage: "https://mdn.alipayobjects.com/huamei_0prmtq/afts/img/A*PXAJTYXseTsAAAAAAAAAAAAADvuFAQ/original",
    });
    // 设置默认首图
    setImageFileList([{
      uid: '-1',
      name: 'default-image.png',
      status: 'done',
        url: 'https://mdn.alipayobjects.com/huamei_0prmtq/afts/img/A*PXAJTYXseTsAAAAAAAAAAAAADvuFAQ/original',
    }]);
  };

  // 打开查看详情弹窗
  const handleView = async (record: DatasetDemandItem) => {
    setLoading(true);
    try {
      const response = await axios.get(`/system/datasetDemand/${record.id}`, {
        baseURL: 'http://47.99.151.88:10105',
      });

      if (response.data.code === 200 && response.data.data) {
        setViewData(response.data.data);
        setViewModalVisible(true);
      } else {
        message.error(response.data.msg || '获取详情失败');
      }
    } catch (error: any) {
      console.error('获取详情失败:', error);
      message.error(error.response?.data?.msg || '获取详情失败');
    } finally {
      setLoading(false);
    }
  };

  // 打开编辑弹窗
  const handleEdit = async (record: DatasetDemandItem) => {
    setIsEdit(true);
    setEditingId(record.id);
    setModalVisible(true);
    setLoading(true);
    
    try {
      // 获取详情
      const response = await axios.get(`/system/datasetDemand/${record.id}`, {
        baseURL: 'http://47.99.151.88:10105',
      });

      if (response.data.code === 200 && response.data.data) {
        const detail = response.data.data;
        
        // 回显表单数据
        form.setFieldsValue({
          phone: detail.phone,
          demandName: detail.demandName,
          demandCompany: detail.demandCompany,
          demandDescription: detail.demandDescription,
          demandMoney: detail.demandMoney,
        });

        // 回显首图
        if (detail.demandImageUrl) {
          setImageFileList([{
            uid: detail.demandImage || '-1',
            name: 'image.jpg',
            status: 'done',
            url: detail.demandImageUrl,
          }]);
        } else {
          setImageFileList([]);
        }
      } else {
        message.error(response.data.msg || '获取详情失败');
      }
    } catch (error: any) {
      console.error('获取详情失败:', error);
      message.error(error.response?.data?.msg || '获取详情失败');
    } finally {
      setLoading(false);
    }
  };

  // 提交表单
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      setLoading(true);
      console.log(values,'values');

      if (isEdit && editingId) {
        // 编辑：先获取完整数据
        const detailResponse = await axios.get(`/system/datasetDemand/${editingId}`, {
          baseURL: 'http://47.99.151.88:10105',
        });

        if (detailResponse.data.code === 200 && detailResponse.data.data) {
          const detail = detailResponse.data.data;
          
          // 获取图片ID：如果上传了新图片则用新ID，否则用原有的
          let demandImage = detail.demandImage;
          let demandImageUrl = detail.demandImageUrl;
          
          if (imageFileList.length > 0) {
            const file = imageFileList[0];
            if (file.response?.data?.id) {
              // 新上传的图片
              demandImage = file.response.data.id;
              demandImageUrl = file.response.data.url;
            } else if (file.uid && file.uid !== '-1' && file.uid !== detail.demandImage) {
              // 如果uid不是原有的ID，说明是新上传的
              demandImage = file.uid;
              demandImageUrl = file.url || detail.demandImageUrl;
            }
          }
          
          // 编辑接口
          const editResponse = await axios.put('/system/datasetDemand/user', {
            id: detail.id,
            userId: detail.userId,
            phone: values.phone,
            demandName: values.demandName,
            demandCompany: values.demandCompany,
            demandDescription: values.demandDescription,
            demandMoney: values.demandMoney,
            demandImage: demandImage,
            publishStatus: detail.publishStatus,
            demandStatus: detail.demandStatus,
            auditStatus: detail.auditStatus,
            demandContent: detail.demandContent,
            demandImageUrl: demandImageUrl,
            userName: detail.userName,
            auditRemark: detail.auditRemark,
            hasData: detail.hasData,
          }, {
            baseURL: 'http://47.99.151.88:10105',
          });

          if (editResponse.data.code === 200) {
            message.success('编辑成功');
            setModalVisible(false);
            form.resetFields();
            setImageFileList([]);
            actionRef.current?.reload();
          } else {
            message.error(editResponse.data.msg || '编辑失败');
          }
        } else {
          message.error('获取详情失败，无法编辑');
        }
      } else {
        // 新增：获取图片ID
        let demandImage = '';
        
        // if (imageFileList.length > 0) {
        //   const file = imageFileList[0];
        //   if (file.response?.data?.id) {
        //     demandImage = file.response.data.id;
        //   } else if (file.uid && file.uid !== '-1') {
        //     demandImage = file.uid;
        //   } else {
        //     message.error('请上传首图');
        //     setLoading(false);
        //     return;
        //   }
        // } else {
        //   message.error('请上传首图');
        //   setLoading(false);
        //   return;
        // }
        
        // 新增接口
        const response = await axios.post('/system/datasetDemand/user', {
          phone: values.phone,
          demandName: values.demandName,
          demandCompany: values.demandCompany,
          demandDescription: values.demandDescription,
          demandMoney: values.demandMoney,
          // demandImage: demandImage,
          demandImageUrl: values.demandImage,
        }, {
          baseURL: 'http://47.99.151.88:10105',
        });

        if (response.data.code === 200) {
          message.success('新增成功');
          setModalVisible(false);
          form.resetFields();
          setImageFileList([]);
          actionRef.current?.reload();
        } else {
          message.error(response.data.msg || '新增失败');
        }
      }
    } catch (error: any) {
      console.error('提交失败:', error);
      message.error(error.response?.data?.msg || '提交失败');
    } finally {
      setLoading(false);
    }
  };

  // 取消弹窗
  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
    setImageFileList([]);
    setIsEdit(false);
    setEditingId(null);
  };

  // 处理首图上传
  const handleImageChange = (info: any) => {
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

    setImageFileList(fileList);
  };

  // 自定义上传方法
  const customUpload = async (options: any) => {
    const { file, onSuccess, onError } = options;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/resource/oss/upload', formData, {
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

  // 状态映射
  const getStatusTag = (publishStatus: string, auditStatus: string) => {
    if (auditStatus === '0') {
      return <Tag color="processing">待审核</Tag>;
    } else if (auditStatus === '1') {
      if (publishStatus === '0') {
        return <Tag color="success">已发布</Tag>;
      } else {
        return <Tag color="default">已关闭</Tag>;
      }
    } else if (auditStatus === '2') {
      return <Tag color="error">审核不通过</Tag>;
    }
    return <Tag color="default">未知</Tag>;
  };

  const columns: ProColumns<DatasetDemandItem>[] = [
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
      width: 120,
      hideInSearch: false,
    },
    {
      title: '需求名称',
      dataIndex: 'demandName',
      key: 'demandName',
      width: 200,
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '需求单位',
      dataIndex: 'demandCompany',
      key: 'demandCompany',
      width: 200,
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '需求描述',
      dataIndex: 'demandDescription',
      key: 'demandDescription',
      hideInSearch: true,
      width: 250,
      ellipsis: true,
    },
    {
      title: '需求金额',
      dataIndex: 'demandMoney',
      hideInSearch: true,
      key: 'demandMoney',
      width: 120,
      render: (_, record) => `${record.demandMoney || 0} 元`,
    },
    {
      title: '状态',
      key: 'status',
      hideInSearch: true,
      width: 120,
      render: (_, record) => getStatusTag(record.publishStatus, record.auditStatus),
    },
    {
      title: '操作',
      key: 'action',
      hideInSearch: true,
      width: 180,
      fixed: 'right',
      render: (_, record) => (
        <>
          <Button 
            type="link" 
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            查看
          </Button>
          <Button 
            type="link" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="data-requirements">
      <div className="page-header">
        <h2>我的数据需求</h2>
        <Button type="primary" icon={<FileTextOutlined />} onClick={handleAdd}>
          发布新需求
        </Button>
      </div>
      
      <Card>
        <ProTable<DatasetDemandItem, DatasetDemandListParams>
          actionRef={actionRef}
          columns={columns} 
          request={async (params) => {
            try {
              const response = await axios.get('/system/datasetDemand/user/list', {
                baseURL: 'http://47.99.151.88:10105',
                params: {
                  pageNum: params.current || 1,
                  pageSize: params.pageSize || 10,
                  phone: params.phone || '',
                },
              });

              const result = response.data?.data;
              console.log(result,'result');
              if (result.code === 200) {
                return {
                  data: result.rows || [],
                  success: true,
                  total: result.total || 0,
                };
              } else {
                message.error(result.msg || '获取列表失败');
                return {
                  data: [],
                  success: false,
                  total: 0,
                };
              }
            } catch (error: any) {
              console.error('获取列表失败:', error);
              const errorMsg = error.response?.data?.msg || error.message || '获取列表失败';
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
          }}
        />
      </Card>

      {/* 新增/编辑弹窗 */}
      <Modal
        title={isEdit ? '编辑数据集需求' : '添加数据集需求'}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        confirmLoading={loading}
        width={600}
        okText="确定"
        cancelText="取消"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{}}
        >
          <Form.Item
            label="电话"
            name="phone"
            rules={[{ required: true, message: '请输入电话' }]}
          >
            <Input placeholder="请输入电话" />
          </Form.Item>

          <Form.Item
            label="需求名称"
            name="demandName"
            rules={[{ required: true, message: '请输入需求名称' }]}
          >
            <Input placeholder="请输入需求名称" />
          </Form.Item>

          <Form.Item
            label="需求单位"
            name="demandCompany"
            rules={[{ required: true, message: '请输入需求单位' }]}
          >
            <Input placeholder="请输入需求单位" />
          </Form.Item>

          <Form.Item
            label="需求描述"
            name="demandDescription"
            rules={[{ required: true, message: '请输入需求描述' }]}
          >
            <TextArea 
              placeholder="请输入内容" 
              rows={4}
              showCount
            />
          </Form.Item>

          <Form.Item
            label="首图"
            name="demandImage"
            rules={[{ required: true, message: '请上传首图' }]}
          >
            <Upload
              listType="picture-card"
              fileList={imageFileList}
              onChange={handleImageChange}
              customRequest={customUpload}
              beforeUpload={beforeUpload}
              maxCount={1}
            >
              {imageFileList.length >= 1 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>上传</div>
                </div>
              )}
            </Upload>
            <div style={{ marginTop: 8, color: '#999', fontSize: '12px' }}>
              请上传大小不超过5MB 格式为png/jpg/jpeg 的文件
            </div>
          </Form.Item>

          <Form.Item
            label="需求金额"
            name="demandMoney"
            rules={[{ required: true, message: '请输入需求金额' }]}
          >
            <Input 
              type="number"
              placeholder="请输入" 
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* 查看详情弹窗 */}
      <Modal
        title="查看详情"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalVisible(false)}>
            关闭
          </Button>
        ]}
        width={600}
      >
        {viewData && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <strong>电话：</strong>
              <span>{viewData.phone}</span>
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>需求名称：</strong>
              <span>{viewData.demandName}</span>
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>需求单位：</strong>
              <span>{viewData.demandCompany}</span>
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>需求描述：</strong>
              <div>{viewData.demandDescription}</div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>需求金额：</strong>
              <span>{viewData.demandMoney} 元</span>
            </div>
            {viewData.demandImageUrl && (
              <div style={{ marginBottom: 16 }}>
                <strong>首图：</strong>
                <div style={{ marginTop: 8 }}>
                  <img 
                    src={viewData.demandImageUrl} 
                    alt="首图" 
                    style={{ maxWidth: '100%', maxHeight: '300px' }}
                  />
                </div>
              </div>
            )}
            <div style={{ marginBottom: 16 }}>
              <strong>状态：</strong>
              {getStatusTag(viewData.publishStatus, viewData.auditStatus)}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DataRequirements;
