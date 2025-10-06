import React from 'react';
import { Layout, Typography, Row, Col, Card, Button, Space, Table, Tag, Input, Select, DatePicker } from 'antd';
import { 
  UploadOutlined, 
  DownloadOutlined, 
  SearchOutlined,
  FileTextOutlined,
  EyeOutlined,
  ShareAltOutlined,
  FilterOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;
const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const DataExchange: React.FC = () => {
  const columns = [
    {
      title: '数据集名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <FileTextOutlined style={{ color: '#50935a' }} />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: '数据类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const colorMap: { [key: string]: string } = {
          '可见光': 'green',
          '多光谱': 'blue',
          '高光谱': 'purple',
          '热红外': 'orange',
          '点云': 'red'
        };
        return <Tag color={colorMap[type]}>{type}</Tag>;
      },
    },
    {
      title: '数据规模',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: '上传时间',
      dataIndex: 'uploadTime',
      key: 'uploadTime',
    },
    {
      title: '上传者',
      dataIndex: 'uploader',
      key: 'uploader',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colorMap: { [key: string]: string } = {
          '已审核': 'green',
          '审核中': 'orange',
          '待审核': 'blue'
        };
        return <Tag color={colorMap[status]}>{status}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space>
          <Button type="link" icon={<EyeOutlined />} size="small">
            查看
          </Button>
          <Button type="link" icon={<DownloadOutlined />} size="small">
            下载
          </Button>
          <Button type="link" icon={<ShareAltOutlined />} size="small">
            分享
          </Button>
        </Space>
      ),
    },
  ];

  const dataSource = [
    {
      key: '1',
      name: '小麦田可见光影像数据集',
      type: '可见光',
      size: '2.5GB',
      uploadTime: '2024-12-15',
      uploader: '张研究员',
      status: '已审核',
    },
    {
      key: '2',
      name: '玉米田多光谱数据',
      type: '多光谱',
      size: '5.8GB',
      uploadTime: '2024-12-14',
      uploader: '李博士',
      status: '审核中',
    },
    {
      key: '3',
      name: '水稻田高光谱影像',
      type: '高光谱',
      size: '12.3GB',
      uploadTime: '2024-12-13',
      uploader: '王教授',
      status: '已审核',
    },
    {
      key: '4',
      name: '果树热红外监测数据',
      type: '热红外',
      size: '3.2GB',
      uploadTime: '2024-12-12',
      uploader: '陈研究员',
      status: '待审核',
    },
    {
      key: '5',
      name: '农田点云数据',
      type: '点云',
      size: '8.7GB',
      uploadTime: '2024-12-11',
      uploader: '刘博士',
      status: '已审核',
    },
  ];

  const dataTypes = [
    { label: '可见光', value: 'visible' },
    { label: '多光谱', value: 'multispectral' },
    { label: '高光谱', value: 'hyperspectral' },
    { label: '热红外', value: 'thermal' },
    { label: '点云', value: 'pointcloud' }
  ];

  return (
    <Content style={{ padding: '0 24px', background: 'white' }}>
      {/* Hero Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #50935a 0%, #73d13d 100%)',
        padding: '80px 0',
        textAlign: 'center',
        color: 'white',
        marginBottom: '60px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <Title level={1} style={{ color: 'white', fontSize: '48px', marginBottom: '24px' }}>
            数据汇交
          </Title>
          <Paragraph style={{ 
            color: 'white', 
            fontSize: '20px', 
            marginBottom: '40px',
            opacity: 0.9 
          }}>
            在线管理和共享低空遥感数据集，支持查看、追溯和引用
          </Paragraph>
          <Button 
            type="primary" 
            size="large" 
            icon={<UploadOutlined />}
            style={{ 
              background: '#fa8c16', 
              borderColor: '#fa8c16',
              height: '48px',
              padding: '0 32px'
            }}
          >
            上传数据
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '60px' }}>
        <Row gutter={[32, 32]}>
          <Col xs={12} sm={6}>
            <Card style={{ textAlign: 'center' }}>
              <Title level={2} style={{ color: '#50935a', margin: 0 }}>156</Title>
              <Text style={{ color: '#666' }}>数据集总数</Text>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card style={{ textAlign: 'center' }}>
              <Title level={2} style={{ color: '#1890ff', margin: 0 }}>2.3TB</Title>
              <Text style={{ color: '#666' }}>数据总量</Text>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card style={{ textAlign: 'center' }}>
              <Title level={2} style={{ color: '#faad14', margin: 0 }}>89</Title>
              <Text style={{ color: '#666' }}>活跃用户</Text>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card style={{ textAlign: 'center' }}>
              <Title level={2} style={{ color: '#722ed1', margin: 0 }}>1,245</Title>
              <Text style={{ color: '#666' }}>下载次数</Text>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Search and Filter */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '40px' }}>
        <Card>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={8}>
              <Search
                placeholder="搜索数据集名称、关键词"
                allowClear
                enterButton={<SearchOutlined />}
                size="large"
              />
            </Col>
            <Col xs={24} sm={4}>
              <Select
                placeholder="数据类型"
                style={{ width: '100%' }}
                size="large"
                allowClear
              >
                {dataTypes.map(type => (
                  <Option key={type.value} value={type.value}>
                    {type.label}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} sm={4}>
              <Select
                placeholder="数据状态"
                style={{ width: '100%' }}
                size="large"
                allowClear
              >
                <Option value="approved">已审核</Option>
                <Option value="reviewing">审核中</Option>
                <Option value="pending">待审核</Option>
              </Select>
            </Col>
            <Col xs={24} sm={6}>
              <RangePicker
                style={{ width: '100%' }}
                size="large"
                placeholder={['开始日期', '结束日期']}
              />
            </Col>
            <Col xs={24} sm={2}>
              <Button 
                type="primary" 
                icon={<FilterOutlined />}
                size="large"
                style={{ width: '100%' }}
              >
                筛选
              </Button>
            </Col>
          </Row>
        </Card>
      </div>

      {/* Data Table */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '80px' }}>
        <Card>
          <div style={{ marginBottom: '24px' }}>
            <Title level={3} style={{ margin: 0, display: 'inline-block' }}>
              数据集列表
            </Title>
            <Text style={{ marginLeft: '16px', color: '#666' }}>
              共 {dataSource.length} 个数据集
            </Text>
          </div>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={{
              total: dataSource.length,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
            }}
            scroll={{ x: 800 }}
          />
        </Card>
      </div>

      {/* Upload Guidelines */}
      <div style={{ 
        background: '#f6ffed',
        padding: '80px 0',
        marginBottom: '80px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Title level={2} style={{ marginBottom: '16px' }}>
              数据上传指南
            </Title>
            <Paragraph style={{ fontSize: '16px', color: '#666' }}>
              了解如何正确上传和提交您的数据
            </Paragraph>
          </div>
          
          <Row gutter={[32, 32]}>
            <Col xs={24} lg={8}>
              <Card style={{ textAlign: 'center', height: '300px' }}>
                <div style={{ 
                  background: '#50935a', 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px'
                }}>
                  <Text style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>1</Text>
                </div>
                <Title level={4} style={{ marginBottom: '16px' }}>
                  准备数据
                </Title>
                <Paragraph style={{ color: '#666', margin: 0 }}>
                  确保数据格式正确，包含必要的元数据信息
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card style={{ textAlign: 'center', height: '300px' }}>
                <div style={{ 
                  background: '#1890ff', 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px'
                }}>
                  <Text style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>2</Text>
                </div>
                <Title level={4} style={{ marginBottom: '16px' }}>
                  填写信息
                </Title>
                <Paragraph style={{ color: '#666', margin: 0 }}>
                  详细填写数据集的基本信息和描述
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card style={{ textAlign: 'center', height: '300px' }}>
                <div style={{ 
                  background: '#faad14', 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px'
                }}>
                  <Text style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>3</Text>
                </div>
                <Title level={4} style={{ marginBottom: '16px' }}>
                  提交审核
                </Title>
                <Paragraph style={{ color: '#666', margin: 0 }}>
                  提交数据等待审核，审核通过后即可共享
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* Data Standards */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', marginBottom: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <Title level={2} style={{ marginBottom: '16px' }}>
            数据标准
          </Title>
          <Paragraph style={{ fontSize: '16px', color: '#666' }}>
            遵循统一的数据格式和标准，确保数据质量
          </Paragraph>
        </div>
        
        <Row gutter={[32, 32]}>
          <Col xs={24} lg={12}>
            <Card title="支持的数据格式" style={{ height: '300px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['TIFF', 'JPEG', 'PNG', 'LAS', 'LAZ', 'HDF5', 'NetCDF', 'GeoTIFF'].map(format => (
                  <Tag key={format} color="blue">{format}</Tag>
                ))}
              </div>
              <div style={{ marginTop: '24px' }}>
                <Title level={5}>元数据要求</Title>
                <ul style={{ paddingLeft: '20px', color: '#666' }}>
                  <li>数据采集时间、地点</li>
                  <li>传感器类型和参数</li>
                  <li>数据质量信息</li>
                  <li>坐标系和投影信息</li>
                </ul>
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="数据质量控制" style={{ height: '300px' }}>
              <div style={{ marginBottom: '24px' }}>
                <Title level={5}>质量检查项目</Title>
                <ul style={{ paddingLeft: '20px', color: '#666' }}>
                  <li>数据完整性检查</li>
                  <li>格式规范性验证</li>
                  <li>元数据完整性</li>
                  <li>数据可用性测试</li>
                </ul>
              </div>
              <div>
                <Title level={5}>审核流程</Title>
                <ul style={{ paddingLeft: '20px', color: '#666' }}>
                  <li>自动格式检查</li>
                  <li>专家人工审核</li>
                  <li>质量评估报告</li>
                  <li>发布或退回修改</li>
                </ul>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      {/* CTA Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #50935a 0%, #73d13d 100%)',
        padding: '80px 0',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
          <Title level={2} style={{ color: 'white', marginBottom: '24px' }}>
            开始分享您的数据
          </Title>
          <Paragraph style={{ 
            color: 'white', 
            fontSize: '18px', 
            marginBottom: '40px',
            opacity: 0.9 
          }}>
            加入我们的数据共享社区，为农业科研贡献力量
          </Paragraph>
          <Space size="large">
            <Button 
              type="primary" 
              size="large" 
              icon={<UploadOutlined />}
              style={{ 
                background: '#fa8c16', 
                borderColor: '#fa8c16',
                height: '48px',
                padding: '0 32px'
              }}
            >
              立即上传
            </Button>
            <Button 
              size="large" 
              style={{ 
                color: 'white', 
                borderColor: 'white',
                height: '48px',
                padding: '0 32px'
              }}
            >
              查看指南
            </Button>
          </Space>
        </div>
      </div>
    </Content>
  );
};

export default DataExchange;