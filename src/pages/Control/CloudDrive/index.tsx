import React from 'react';
import { Button, Card, Table, Space, Upload, message } from 'antd';
import { CloudUploadOutlined, DownloadOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import './index.less';

const CloudDrive: React.FC = () => {
  const columns = [
    {
      title: '文件名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '大小',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: '上传时间',
      dataIndex: 'uploadTime',
      key: 'uploadTime',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />}>查看</Button>
          <Button type="link" icon={<DownloadOutlined />}>下载</Button>
          <Button type="link" danger icon={<DeleteOutlined />}>删除</Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: '数据文件1.xlsx',
      size: '2.5MB',
      uploadTime: '2024-01-15 10:30:00',
    },
    {
      key: '2',
      name: '数据文件2.csv',
      size: '1.8MB',
      uploadTime: '2024-01-14 15:20:00',
    },
  ];

  return (
    <div className="cloud-drive">
      <div className="page-header">
        <h2>我的云盘</h2>
        <Space>
          <Upload>
            <Button type="primary" icon={<CloudUploadOutlined />}>
              上传文件
            </Button>
          </Upload>
        </Space>
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

export default CloudDrive;
