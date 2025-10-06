import React from 'react';
import { Layout, Typography, Row, Col, Card, Tag, Button, Space } from 'antd';
import { CheckOutlined, StarOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const Products: React.FC = () => {
  const products = [
    {
      title: '基础版',
      price: '¥99',
      period: '/月',
      description: '适合个人用户和小团队',
      features: [
        '基础功能访问',
        '5GB 存储空间',
        '邮件支持',
        '基础数据分析'
      ],
      popular: false
    },
    {
      title: '专业版',
      price: '¥299',
      period: '/月',
      description: '适合中小型企业',
      features: [
        '所有基础功能',
        '50GB 存储空间',
        '优先技术支持',
        '高级数据分析',
        'API 访问',
        '自定义集成'
      ],
      popular: true
    },
    {
      title: '企业版',
      price: '¥599',
      period: '/月',
      description: '适合大型企业',
      features: [
        '所有专业功能',
        '无限存储空间',
        '24/7 专属支持',
        '企业级安全',
        '高级定制',
        'SLA 保障',
        '专属客户经理'
      ],
      popular: false
    }
  ];

  return (
    <Content style={{ padding: '0 24px', minHeight: 'calc(100vh - 64px)' }}>
      {/* Header Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '60px 0',
        textAlign: 'center',
        color: 'white',
        marginBottom: '60px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <Title level={1} style={{ color: 'white', fontSize: '42px', marginBottom: '16px' }}>
            产品方案
          </Title>
          <Paragraph style={{ 
            color: 'white', 
            fontSize: '18px',
            opacity: 0.9 
          }}>
            选择最适合您业务需求的产品方案
          </Paragraph>
        </div>
      </div>

      {/* Products Section */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Row gutter={[32, 32]} justify="center">
          {products.map((product, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card 
                hoverable
                style={{ 
                  height: '100%',
                  borderRadius: '12px',
                  boxShadow: product.popular ? '0 8px 24px rgba(24, 144, 255, 0.2)' : '0 4px 12px rgba(0,0,0,0.1)',
                  border: product.popular ? '2px solid #1890ff' : '1px solid #f0f0f0',
                  position: 'relative'
                }}
                bodyStyle={{ padding: '40px 24px' }}
              >
                {product.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#1890ff',
                    color: 'white',
                    padding: '6px 20px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    <StarOutlined style={{ marginRight: '4px' }} />
                    推荐
                  </div>
                )}
                
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                  <Title level={3} style={{ marginBottom: '8px' }}>
                    {product.title}
                  </Title>
                  <div style={{ marginBottom: '16px' }}>
                    <span style={{ fontSize: '48px', fontWeight: 'bold', color: '#1890ff' }}>
                      {product.price}
                    </span>
                    <span style={{ color: '#666', fontSize: '16px' }}>
                      {product.period}
                    </span>
                  </div>
                  <Paragraph style={{ color: '#666', margin: 0 }}>
                    {product.description}
                  </Paragraph>
                </div>

                <div style={{ marginBottom: '32px' }}>
                  {product.features.map((feature, featureIndex) => (
                    <div key={featureIndex} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      marginBottom: '12px' 
                    }}>
                      <CheckOutlined style={{ 
                        color: '#50935a', 
                        marginRight: '12px',
                        fontSize: '16px'
                      }} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  type={product.popular ? 'primary' : 'default'}
                  size="large"
                  block
                  style={{
                    borderRadius: '8px',
                    height: '48px',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  {product.popular ? '立即购买' : '选择方案'}
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* FAQ Section */}
      <div style={{ 
        background: '#f8f9fa',
        padding: '80px 0',
        marginTop: '80px'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
            常见问题
          </Title>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Card title="如何选择合适的方案？" style={{ marginBottom: '16px' }}>
                <Paragraph>
                  我们建议根据团队规模和业务需求来选择。个人用户可以选择基础版，
                  中小型企业推荐专业版，大型企业可以选择企业版获得更多定制化服务。
                </Paragraph>
              </Card>
            </Col>
            <Col span={24}>
              <Card title="是否支持免费试用？" style={{ marginBottom: '16px' }}>
                <Paragraph>
                  是的，我们提供14天免费试用，无需信用卡即可体验所有功能。
                  试用期间您可以随时升级或取消服务。
                </Paragraph>
              </Card>
            </Col>
            <Col span={24}>
              <Card title="如何获得技术支持？">
                <Paragraph>
                  基础版用户可以通过邮件获得支持，专业版和企业版用户享有优先技术支持。
                  企业版用户还享有24/7专属支持和专属客户经理服务。
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </Content>
  );
};

export default Products;
