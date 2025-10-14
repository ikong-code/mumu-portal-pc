import React from 'react';
import { Layout, Typography, Row, Col, Card, Button, Space, Statistic, Carousel } from 'antd';
import { 
  ShareAltOutlined, 
  EditOutlined, 
  DatabaseOutlined,
  ArrowRightOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  RocketOutlined,
  FileTextOutlined,
  TeamOutlined,
  SafetyOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

const Home: React.FC = () => {
  const features = [
    {
      icon: <RocketOutlined style={{ fontSize: '48px', color: '#1890ff' }} />,
      title: '高性能',
      description: '采用最新的技术栈，提供极致的性能体验'
    },
    {
      icon: <SafetyOutlined style={{ fontSize: '48px', color: '#50935a' }} />,
      title: '安全可靠',
      description: '企业级安全保障，数据安全无忧'
    },
    {
      icon: <ThunderboltOutlined style={{ fontSize: '48px', color: '#faad14' }} />,
      title: '快速响应',
      description: '毫秒级响应速度，提升用户体验'
    },
    {
      icon: <TeamOutlined style={{ fontSize: '48px', color: '#722ed1' }} />,
      title: '团队协作',
      description: '强大的团队协作功能，提升工作效率'
    }
  ];

  return (
    <Content style={{ padding: '0 24px', minHeight: 'calc(100vh - 64px)' }}>
      {/* Hero Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '80px 0',
        textAlign: 'center',
        color: 'white',
        marginBottom: '60px'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <Title level={1} style={{ color: 'white', fontSize: '48px', marginBottom: '24px' }}>
            欢迎来到 Mumu Portal
          </Title>
          <Paragraph style={{ 
            color: 'white', 
            fontSize: '20px', 
            marginBottom: '40px',
            opacity: 0.9 
          }}>
            现代化的企业门户平台，为您提供全方位的数字化解决方案
          </Paragraph>
          <Space size="large">
            <Button type="primary" size="large" icon={<ArrowRightOutlined />}>
              立即开始
            </Button>
            <Button size="large" style={{ color: 'white', borderColor: 'white' }}>
              了解更多
            </Button>
          </Space>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '60px' }}>
          核心特性
        </Title>
        <Row gutter={[32, 32]}>
          {features.map((feature, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card 
                hoverable
                style={{ 
                  textAlign: 'center', 
                  height: '280px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
                bodyStyle={{ padding: '40px 24px' }}
              >
                <div style={{ marginBottom: '24px' }}>
                  {feature.icon}
                </div>
                <Title level={4} style={{ marginBottom: '16px' }}>
                  {feature.title}
                </Title>
                <Paragraph style={{ color: '#666', margin: 0 }}>
                  {feature.description}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* CTA Section */}
      <div style={{ 
        background: '#f8f9fa',
        padding: '80px 0',
        textAlign: 'center',
        marginTop: '80px'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
          <Title level={2} style={{ marginBottom: '24px' }}>
            准备开始您的数字化之旅？
          </Title>
          <Paragraph style={{ fontSize: '18px', color: '#666', marginBottom: '40px' }}>
            立即注册，体验我们的专业服务
          </Paragraph>
          <Button type="primary" size="large" icon={<ArrowRightOutlined />}>
            免费试用
          </Button>
        </div>
      </div>
    </Content>
  );
};

export default Home;
