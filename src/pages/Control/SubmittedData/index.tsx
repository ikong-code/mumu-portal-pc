import React from 'react';
import { Button, Card, Table, Space, Tag, Statistic, Row, Col } from 'antd';
import { UploadOutlined, EyeOutlined, DownloadOutlined, ShareAltOutlined } from '@ant-design/icons';
import './index.less';

const SubmittedData: React.FC = () => {
  const columns = [
    {
      title: '提交名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '数据类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const typeMap = {
          '图像': { color: 'blue', text: '图像' },
          '文本': { color: 'green', text: '文本' },
          '视频': { color: 'purple', text: '视频' },
        };
        const config = typeMap[type] || { color: 'default', text: type };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '数据量',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          '审核通过': { color: 'success', text: '审核通过' },
          '审核中': { color: 'processing', text: '审核中' },
          '审核拒绝': { color: 'error', text: '审核拒绝' },
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '提交时间',
      dataIndex: 'submitTime',
      key: 'submitTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: any) => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />}>查看</Button>
          {record.status === '审核通过' && (
            <>
              <Button type="link" icon={<DownloadOutlined />}>下载</Button>
              <Button type="link" icon={<ShareAltOutlined />}>分享</Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: '农田图像数据集',
      type: '图像',
      count: '5,000张',
      status: '审核通过',
      submitTime: '2024-01-15 10:30:00',
    },
    {
      key: '2',
      name: '作物识别数据',
      type: '文本',
      count: '2,000条',
      status: '审核中',
      submitTime: '2024-01-14 15:20:00',
    },
    {
      key: '3',
      name: '无人机航拍视频',
      type: '视频',
      count: '100个',
      status: '审核拒绝',
      submitTime: '2024-01-13 09:15:00',
    },
  ];

  return (
    <div className="submitted-data">
      <div className="page-header">
        <h2>我的提交数据</h2>
        <Button type="primary" icon={<UploadOutlined />}>提交新数据</Button>
      </div>
      
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={6}>
          <Card>
            <Statistic title="总提交数" value={15} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="审核通过" value={8} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="审核中" value={5} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="审核拒绝" value={2} />
          </Card>
        </Col>
      </Row>
      
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

export default SubmittedData;
