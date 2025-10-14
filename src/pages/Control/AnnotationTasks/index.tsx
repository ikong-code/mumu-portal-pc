import React from 'react';
import { Button, Card, Table, Space, Tag, Progress } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import './index.less';

const AnnotationTasks: React.FC = () => {
  const columns = [
    {
      title: '任务名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          '进行中': { color: 'processing', text: '进行中' },
          '已完成': { color: 'success', text: '已完成' },
          '暂停': { color: 'warning', text: '暂停' },
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '进度',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => (
        <Progress percent={progress} size="small" />
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record: any) => (
        <Space size="middle">
          {record.status === '进行中' ? (
            <Button type="link" icon={<PauseCircleOutlined />}>暂停</Button>
          ) : (
            <Button type="link" icon={<PlayCircleOutlined />}>继续</Button>
          )}
          <Button type="link" icon={<CheckCircleOutlined />}>查看详情</Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: '图像标注任务1',
      status: '进行中',
      progress: 65,
      createTime: '2024-01-15 10:30:00',
    },
    {
      key: '2',
      name: '文本标注任务2',
      status: '已完成',
      progress: 100,
      createTime: '2024-01-14 15:20:00',
    },
    {
      key: '3',
      name: '视频标注任务3',
      status: '暂停',
      progress: 30,
      createTime: '2024-01-13 09:15:00',
    },
  ];

  return (
    <div className="annotation-tasks">
      <div className="page-header">
        <h2>我的标注任务</h2>
        <Button type="primary">创建新任务</Button>
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

export default AnnotationTasks;
