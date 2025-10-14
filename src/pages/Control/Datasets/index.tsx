import React from 'react';
import { Button, Card, Space, Tag, Statistic, Row, Col, message } from 'antd';
import { ProTable, ProColumns } from '@ant-design/pro-components';
import { DatabaseOutlined, EyeOutlined, DownloadOutlined, ShareAltOutlined } from '@ant-design/icons';
import axios from 'axios';
import './index.less';

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

const Datasets: React.FC = () => {
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
      width: 200,
      fixed: 'right',
      render: (_, record) => (
          <Button 
          style={{padding: 0}}
            type="link" 
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            查看
          </Button>
      ),
    },
  ];

  const handleView = (record: DatasetItem) => {
    message.info(`查看数据集: ${record.datasetName}`);
    // TODO: 实现查看功能
  };

  const handleDownload = (record: DatasetItem) => {
    if (record.ossUrl) {
      window.open(record.ossUrl, '_blank');
    } else {
      message.warning('下载链接不可用');
    }
  };

  const handleShare = (record: DatasetItem) => {
    message.info(`分享数据集: ${record.datasetName}`);
    // TODO: 实现分享功能
  };

  return (
    <div className="datasets">
      <div className="page-header">
        <h2>我的数据集</h2>
        <Button type="primary" icon={<DatabaseOutlined />}>创建数据集</Button>
      </div>
      
      <Card>
        <ProTable<DatasetItem, DatasetListParams>
          columns={columns}
          request={async (params) => {
            console.log(params);
            try {
              // const {data} = await axios.get<DatasetListResponse>('https://api.ai4as.cn/system/dataset/user/list', {
              //   params: {
              //     pageNum: params.current,
              //     pageSize: params.pageSize,
              //     datasetName: params.datasetName,
              //     datasetType: params.datasetType,
              //     auditStatus: params.auditStatus,
              //     isShare: params.isShare,
              //   },
              // });
              const data = {
                "total": 1,
                "rows": [
                    {
                        "id": "1954911599415656450",
                        "datasetSn": "SP-2508-b6bb4efc2617439aaee11e06ed93263e",
                        "datasetName": "俯视位羊群关键点、边界框、掩码数据集",
                        "datasetOssKey": null,
                        "ossUrl": "https://dataset-bucket-ny00003.oss-cn-hangzhou.aliyuncs.com/%E4%BF%AF%E8%A7%86%E4%BD%8D%E7%BE%8A%E7%BE%A4%E5%85%B3%E9%94%AE%E7%82%B9%E3%80%81%E8%BE%B9%E7%95%8C%E6%A1%86%E3%80%81%E6%8E%A9%E7%A0%81%E6%95%B0%E6%8D%AE%E9%9B%86.zip",
                        "datasetDesc": "为突破羊群体尺自动测量缺俯视多模态标注数据的瓶颈，牧目智能科技2023年在内蒙古合作牧场，用2.8 m顶视4K相机采集高密度羊群视频，经人工筛帧构建含关键点-边界框-掩码的数据集，供科研训练姿态与体尺模型，未来可扩展至精准饲喂、生长监测与保险理赔。",
                        "datasetType": "图像数据集",
                        "shareMode": "室外放牧",
                        "dataFormat": "无限制使用",
                        "dataSource": "技术企业",
                        "uploadUserId": "1954906324579254273",
                        "auditStatus": "1",
                        "isShare": "1",
                        "shareStartTime": "2025-08-11 22:23:45",
                        "coverImage": "1954911189200142337",
                        "coverImageUrl": "https://preview.oss.ai4as.cn/2025/08/11/584b7b0398164e87927209e55da6c810.jpg",
                        "enName": "Top-view sheep herd dataset with keypoints, bounding boxes, and masks",
                        "resourceId": null,
                        "datasetDoi": null,
                        "paperDoi": null,
                        "dataAuthor": "牧目智能科技研发团队",
                        "certificateNumber": null,
                        "region": null,
                        "usagePrice": 0,
                        "dataIntro": "视频截帧得800张2048×1536 JPG，人工去人及模糊；配COCO格式JSON，每羊标注9关键点、轴对齐框与像素级掩码。原始视频留存公司；数据托管国家农业科学数据中心，2025年平台免费下载，支持社区持续更新。",
                        "citationInstructions": "本研究使用的数据来源于国家农业科学数据中心(动物科学)智慧畜牧业数据共享服务平台（https://www.ai4as.cn/），由[数据提交者姓名或单位，如适用]提供，特此致谢。",
                        "createTime": "2025-08-11 22:23:40",
                        "datasetCategoryList": [
                            "1945325179529392130"
                        ],
                        "datasetCategoryNameList": null,
                        "uploadUserName": null,
                        "auditRemark": "",
                        "animalEthics": "0",
                        "datasetEthics": "1",
                        "hasManual": "1",
                        "manualFilePath": "https://preview.oss.ai4as.cn/2025/08/11/e4f68716c3ec4bb2920db106188d0b99.doc",
                        "protocolConfirmed": "1",
                        "protocolConfirmTime": "2025-08-11 22:23:40",
                        "uploadUnit": "牧目智能科技（杭州）有限责任公司"
                    }
                ],
                "code": 200,
                "msg": "查询成功"
            }
              return {
                data: data.rows,
                success: data.code === 200,
                total: data.total,
              };
            } catch (error) {
              message.error('获取数据集列表失败');
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
    </div>
  );
};

export default Datasets;
