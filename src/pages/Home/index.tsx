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
import { useNavigate } from '@umijs/max';
import axios from 'axios';
import {useRequest} from 'ahooks';
import './index.less';
const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;
import portalImg1 from '@/assets/images/portal/img1.png';
import portalImg2 from '@/assets/images/portal/img2.png';
import portalImg3 from '@/assets/images/portal/img3.png';
import PortalBanner from '@/assets/images/portal/banner.png';
import PortalBg3 from '@/assets/images/portal/portal-bg3.png';
import dayjs from 'dayjs';


const Home: React.FC = () => {

  const navigate = useNavigate();
  const features = [
    {
      link: '/usage-guide/detail?type=data_service',
      icon: portalImg1,
      title: '数据共享',
      description: '支持用户在线管理和共享各类型低空遥感相关数据集，并在平台审核后发布。开发者可以通过搜索用户共享的数据集，实现数据可查看、可追溯、可引用，助力科研合作与产业落地。',
      buttonText: '了解详情'
    },
    {
      link: '/data-collection',
      icon: portalImg2,
      title: '数据标注',
      description: '支持包括可见光数据、多光谱数据、高光谱数据、热红外数据、点云数据等多种数据集的制作，平台提供标准化的数据标注工具，支撑产量预测、病害诊断等人工智能技术与应用的开发。',
      buttonText: '了解详情'
    },
    {
      link: '/data-collection',
      icon: portalImg3,
      title: '数据征集',
      description: '围绕农用无人机相关科研空白，平台帮助征集者发布数据征集需求，欢迎科研人员、单位用户贡献实地采集数据，共同推动典型场景数据集的建立与共享。',
      buttonText: '了解详情'
    }
  ];

  // 获取使用数据
  const { data: userData, loading: userDataLoading } = useRequest(async () => {
    const res = await axios.get('/system/front/user/getHomeData', {
      baseURL: "http://47.99.151.88:10105"
    });
    return res.data?.data;
  }, {
    manual: false
  });

  // 获取新闻动态
  const { data: newsPolicyList, loading: newsPolicyListLoading } = useRequest(async () => {
    const res = await axios.get('/system/newsPolicy/list', {
      params: {
        isShow: 1,
        pageSize: 6,
        pageNum: 1
      },
      baseURL: "http://47.99.151.88:10105"
    });
    console.log(res.data, 'res.data')
    return res.data?.data?.rows || [];
  }, {
    manual: false
  });

  // 获取合作伙伴数据
  const { data: customerList, loading: customerListLoading } = useRequest(async () => {
    const res = await axios.get('/system/customer/get', {
      baseURL: "http://47.99.151.88:10105"
    });
    console.log(res.data.data, 'res.data');
    return res?.data?.data || [];
  }, {
    manual: false
  });


  
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).AMap) {
      const map = new (window as any).AMap.Map('map-container', {
        center: [120.1938, 30.2588],
        zoom: 15
      });
    }
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
        <div className='home-key-metrics-container' style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <Row gutter={[48, 32]}>
            <Col xs={12} sm={6}>
              <div className='home-key-metrics-item'>
                <div className='home-key-metrics-item-data'>
                  <span className='home-key-metrics-item-data-number'>{userData?.userCount || 0}</span>
                  <span className='home-key-metrics-item-data-unit'>个</span>
                  </div>
                <div className='home-key-metrics-item-title'>用户数</div>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className='home-key-metrics-item'>
                <div className='home-key-metrics-item-data'>
                  <span className='home-key-metrics-item-data-number'>{userData?.datasetCount || 0}</span>
                  </div>
                <div className='home-key-metrics-item-title'>数据集数量</div>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className='home-key-metrics-item'>
                <div className='home-key-metrics-item-data'>
                  <span className='home-key-metrics-item-data-number'>{userData?.ossSize || 0}</span>
                  <span className='home-key-metrics-item-data-unit'>G</span>
                  </div>
                <div className='home-key-metrics-item-title'>数据集规模</div>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div className='home-key-metrics-item'>
                <div className='home-key-metrics-item-data'>
                  <span className='home-key-metrics-item-data-number'>{userData?.runningHours || 0}</span>
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
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1,
        

         }}>
          <Row gutter={[30, 30]}>
            {features?.map((feature, index) => (
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
                    onClick={() => {
                      navigate(feature.link);
                    }}
                    style={{ 
                      background: '#fa8c16', 
                      borderColor: '#fa8c16',
                      borderRadius: '23px',
                      width: "134px",
                      height: "46px",
                      fontSize: '16px',
                      position: 'absolute',
                      bottom: '48px',
                      left: '50%',
                      transform: 'translateX(-50%)'
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
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Title level={2} style={{ marginBottom: '24px', fontSize: '32px' }}>
              新闻动态
            </Title>
            <Text style={{ color: '#333', fontSize: '20px' }}>
              News Center
            </Text>
          </div>
          
          <Row gutter={[80, 0]}>
            <Col xs={14}>
            <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
            <img src={PortalBanner} />
            {/* <img src={portalImg2} /> */}
            {/* <img src={portalImg3} /> */}
            </Carousel>
            </Col>
            <Col xs={10}>
              <div className="home-news-list">
                {newsPolicyList?.map((item: {id: string, title: string, publishTime: string}) => (
                  <div 
                    key={item.id}
                    className="home-news-item"
                    onClick={() => navigate(`/home/news/${item.id}`)}
                  >
                    <div className="home-news-item-content">
                      <Text 
                        ellipsis={{ tooltip: item.title }} 
                        className="home-news-item-title"
                      >
                        {item.title}
                      </Text>
                      <Text className="home-news-item-date">
                        {dayjs(item.publishTime).format('YYYY-MM-DD')}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
          <div style={{ marginTop: '80px', textAlign: 'center' }}>
          <Button 
            type="link" 
            style={{ padding: 0, color: '#000', fontSize: '18px' }}
            onClick={() => navigate('/home/news')}
          >
            查看更多 &nbsp;&gt;
          </Button>
        </div>
        </div>
      </div>

      {/* Partners Section */}
      <div style={{ 
        background: '#f6ffed',
        padding: '80px 0',
        position: 'relative',
        backgroundImage: `url(${PortalBg3})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100%'
      }}>
        <div 
        style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1,
         
         }}
        >
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Title level={2} style={{ marginBottom: '24px', fontSize: '32px' }}>
              合作伙伴
            </Title>
            <Text style={{ color: '#fff', fontSize: '20px' }}>
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
              {customerList?.map((customer: any, index: number) => (
                  <Col xs={24} sm={8} key={customer.id}>
                    <div style={{
                      textAlign: 'center',
                      padding: '10px',
                      background: '#fafafa',
                      borderRadius: '8px',
                      border: '1px solid #f0f0f0'
                    }}>
                      <img height={'76px'} src={customer.imgPath} />
                    </div>
                  </Col>
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
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
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