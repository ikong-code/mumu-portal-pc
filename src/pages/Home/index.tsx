import React, { useEffect } from 'react';
import { Layout, Typography, Row, Col, Card, Button, Space, Statistic, Carousel } from 'antd';
import { 
  ShareAltOutlined, 
  EditOutlined, 
  DatabaseOutlined,
  ArrowRightOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  TeamOutlined
} from '@ant-design/icons';
import './index.less';
const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;
import portalImg1 from '@/assets/images/portal-img1.png';
import portalImg2 from '@/assets/images/portal-img2.png';
import portalImg3 from '@/assets/images/portal-img3.png';

const Home: React.FC = () => {
  const features = [
    {
      icon: portalImg1,
      title: '数据共享',
      description: '支持用户在线管理和共享各类型低空遥感相关数据集，并在平台审核后发布。开发者可以通过搜索用户共享的数据集，实现数据可查看、可追溯、可引用，助力科研合作与产业落地。',
      buttonText: '了解详情'
    },
    {
      icon: portalImg2,
      title: '数据标注',
      description: '支持包括可见光数据、多光谱数据、高光谱数据、热红外数据、点云数据等多种数据集的制作，平台提供标准化的数据标注工具，支撑产量预测、病害诊断等人工智能技术与应用的开发。',
      buttonText: '了解详情'
    },
    {
      icon: portalImg3,
      title: '数据征集',
      description: '围绕农用无人机相关科研空白，平台帮助征集者发布数据征集需求，欢迎科研人员、单位用户贡献实地采集数据，共同推动典型场景数据集的建立与共享。',
      buttonText: '了解详情'
    }
  ];

  const newsItems = [
    { title: '农业无人机低空遥感数据服务平台', date: '2025/05/30' },
    { title: '农业无人机低空遥感数据服务平台', date: '2025/06/30' },
    { title: '农业无人机低空遥感数据服务平台', date: '2025/07/15' },
    { title: '农业无人机低空遥感数据服务平台', date: '2025/08/20' },
    { title: '农业无人机低空遥感数据服务平台', date: '2025/09/10' },
    { title: '农业无人机低空遥感数据服务平台', date: '2025/10/05' }
  ];

  useEffect(() => {
    const map = new window.AMap.Map('map-container', {
      center: [120.1938, 30.2588],
      zoom: 15
    });
  }, []);

  const partners = [
    'AniEye 牧目科技',
    '整数智能 HOLAR INTELLIGENCE',
    '浙江大学 生物系统工程与食品科学学院'
  ];

  return (
    <Content style={{ padding: 0, background: 'white' }}>
      {/* Hero Section */}
     

      {/* Key Metrics Section */}
      <div style={{ 
        background: 'white',
        padding: '60px 0',
        textAlign: 'center'
      }}>
        <div className='home-key-metrics-container' style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <Row gutter={[48, 32]}>
            <Col xs={12} sm={6}>
              <div className='home-key-metrics-item'>
                <div className='home-key-metrics-item-data'>
                  <span className='home-key-metrics-item-data-number'>300</span>
                  <span className='home-key-metrics-item-data-unit'>个</span>
                  </div>
                <div className='home-key-metrics-item-title'>用户数</div>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className='home-key-metrics-item'>
                <div className='home-key-metrics-item-data'>
                  <span className='home-key-metrics-item-data-number'>1</span>
                  </div>
                <div className='home-key-metrics-item-title'>数据集数量</div>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className='home-key-metrics-item'>
                <div className='home-key-metrics-item-data'>
                  <span className='home-key-metrics-item-data-number'>33.76</span>
                  <span className='home-key-metrics-item-data-unit'>G</span>
                  </div>
                <div className='home-key-metrics-item-title'>数据集规模</div>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className='home-key-metrics-item'>
                <div className='home-key-metrics-item-data'>
                  <span className='home-key-metrics-item-data-number'>1172</span>
                  <span className='home-key-metrics-item-data-unit'>h</span>
                  </div>
                <div className='home-key-metrics-item-title'>使用时间</div>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* Features Section */}
      <div className='home-features-section'>
        <div className='home-features-section-content' style={{
          position: 'absolute',
          top: '20%',
          left: '5%',
          opacity: 0.1,
          transform: 'rotate(-15deg)'
        }}>
          <EnvironmentOutlined style={{ fontSize: '300px', color: '#50935a' }} />
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <Row gutter={[30, 30]}>
            {features.map((feature, index) => (
              <Col xs={24} lg={8} key={index}>
                <Card 
                  hoverable
                  className='home-features-section-card'
                >
                  <div style={{ width: "35%", margin: "0 auto 24px", minWidth: '190px' }}>
                    <img src={feature.icon} style={{ width: '100%', height: '100%' }} />
                  </div>
                  <Title level={3} style={{ marginBottom: '16px', color: '#262626' }}>
                    {feature.title}
                  </Title>
                  <Paragraph style={{ 
                    color: '#666', 
                    margin: '52px 0',
                    fontSize: '14px',
                  }}>
                    {feature.description}
                  </Paragraph>
                  <Button 
                    type="primary" 
                    style={{ 
                      background: '#fa8c16', 
                      borderColor: '#fa8c16',
                      borderRadius: '23px',
                      width: "134px",
                      height: "46px",
                      fontSize: '16px',
                    }}
                  >
                    {feature.buttonText}
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* News Center Section */}
      <div style={{ 
        background: 'white',
        padding: '80px 0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Title level={2} style={{ marginBottom: '24px', fontSize: '32px' }}>
              新闻动态
            </Title>
            <Text style={{ color: '#333', fontSize: '20px' }}>
              News Center
            </Text>
          </div>
          
          <Row gutter={[80, 0]}>
            <Col xs={12} lg={12}>
            <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
            <img src={portalImg1} />
            <img src={portalImg2} />
            <img src={portalImg3} />
            </Carousel>
            </Col>
            <Col xs={12} lg={12}>
              <div>
                {newsItems.map((item, index) => (
                  <div 
                    key={index}
                    style={{
                      padding: '16px 0',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'baseline'
                    }}>
                      <Text style={{ fontSize: '20px', color: '#333', fontWeight: '500' }}>
                        {item.title}
                      </Text>
                      <Text style={{ fontSize: '16px', color: '#9d9d9d' }}>
                        {item.date}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
          <div style={{ marginTop: '110px', textAlign: 'center' }}>
          <Button type="link" style={{ padding: 0, color: '#000', fontSize: '18px' }}>
            查看更多 &nbsp;&gt;
          </Button>
        </div>
        </div>
      </div>

      {/* Partners Section */}
      <div style={{ 
        background: '#f6ffed',
        padding: '80px 0',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          opacity: 0.1
        }}>
          <TeamOutlined style={{ fontSize: '200px', color: '#50935a' }} />
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Title level={2} style={{ marginBottom: '24px', fontSize: '32px' }}>
              合作伙伴
            </Title>
            <Text style={{ color: '#666', fontSize: '20px' }}>
              Our Partners
            </Text>
          </div>
          
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '40px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <Row gutter={[32, 32]}>
              {[1, 2, 3].map((row) => (
                <React.Fragment key={row}>
                  {partners.map((partner, index) => (
                    <Col xs={24} sm={8} key={`${row}-${index}`}>
                      <div style={{
                        textAlign: 'center',
                        padding: '20px',
                        background: '#fafafa',
                        borderRadius: '8px',
                        border: '1px solid #f0f0f0'
                      }}>
                        <Text style={{ fontSize: '16px', color: '#262626' }}>
                          {partner}
                        </Text>
                      </div>
                    </Col>
                  ))}
                </React.Fragment>
              ))}
            </Row>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div style={{ 
        background: 'white',
        padding: '80px 0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Title level={2} style={{ marginBottom: '24px', fontSize: '32px' }}>
              联系我们
            </Title>
            <Text style={{ color: '#666', fontSize: '20px' }}>
              Contact
            </Text>
          </div>
          
          <Row gutter={[100, 32]}>
            <Col xs={14}>
              <div id="map-container" style={{
                background: '#f5f5f5',
                borderRadius: '12px',
                height: '520px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Text style={{ color: '#8c8c8c', fontSize: '16px' }}>
                  地图区域
                </Text>
              </div>
            </Col>
            <Col xs={10}>
              <div>
                <Title level={4} style={{ marginBottom: '48px', fontSize: '22px', marginTop: '48px' }}>
                  合作交流
                </Title>
                <div style={{ fontSize: '18px', color: '#000', fontWeight: 'bold' , marginBottom: '24px'}}>官方邮箱</div>
                <div style={{fontSize: 16, color: '#000', marginBottom: '32px'}}>zjdxcenlab@163.com</div>
                <div style={{ fontSize: '18px', color: '#000', fontWeight: 'bold' , marginBottom: '24px'}}>联系地址</div>
                <div style={{fontSize: 16, color: '#000', marginBottom: '32px'}}>浙江省杭州市西湖区余杭塘路866号浙江大学生物系统工程与食品科学学院</div>
                <Title level={4} style={{ marginTop: '68px', marginBottom: '24px', fontSize: '22px' }}>
                友情链接
                </Title>
                <div style={{fontSize: 16, color: '#000', textDecoration: 'underline'}}>浙江大学生工食品学院</div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Content>
  );
};

export default Home;