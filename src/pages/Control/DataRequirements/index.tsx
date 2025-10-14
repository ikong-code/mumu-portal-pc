import React from 'react';
import { Button, Card, Table, Space, Tag, Progress } from 'antd';
import { FileTextOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './index.less';

const DataRequirements: React.FC = () => {
  const columns = [
    {
      title: '需求标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '数据类型',
      dataIndex: 'dataType',
      key: 'dataType',
      render: (type: string) => {
        const typeMap = {
          '图像数据': { color: 'blue', text: '图像数据' },
          '文本数据': { color: 'green', text: '文本数据' },
          '视频数据': { color: 'purple', text: '视频数据' },
        };
        const config = typeMap[type] || { color: 'default', text: type };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          '待审核': { color: 'processing', text: '待审核' },
          '已发布': { color: 'success', text: '已发布' },
          '已关闭': { color: 'default', text: '已关闭' },
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '匹配度',
      dataIndex: 'matchRate',
      key: 'matchRate',
      render: (rate: number) => (
        <Progress percent={rate} size="small" />
      ),
    },
    {
      title: '发布时间',
      dataIndex: 'publishTime',
      key: 'publishTime',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />}>查看</Button>
          <Button type="link" icon={<EditOutlined />}>编辑</Button>
          <Button type="link" danger icon={<DeleteOutlined />}>删除</Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      title: '农业无人机图像数据需求',
      dataType: '图像数据',
      status: '已发布',
      matchRate: 85,
      publishTime: '2024-01-15 10:30:00',
    },
    {
      key: '2',
      title: '作物生长监测文本数据',
      dataType: '文本数据',
      status: '待审核',
      matchRate: 60,
      publishTime: '2024-01-14 15:20:00',
    },
    {
      key: '3',
      title: '农田环境视频数据',
      dataType: '视频数据',
      status: '已关闭',
      matchRate: 100,
      publishTime: '2024-01-13 09:15:00',
    },
  ];

  return (
    <div className="data-requirements">
      <div className="page-header">
        <h2>我的数据需求</h2>
        <Button type="primary" icon={<FileTextOutlined />}>发布新需求</Button>
      </div>
      
      <Card>
        <Table 
          columns={columns} 
          dataSource={data} 
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default DataRequirements;
