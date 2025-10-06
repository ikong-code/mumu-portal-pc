import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Card, Button, Space, Statistic, Carousel } from 'antd';
import './index.less';
const { Title, Paragraph, Text } = Typography;

const { Content } = Layout;

const PlatformIntro: React.FC = () => {
  const [activeTab, setActiveTab] = useState('about');

  const tabs = [
    { key: 'about', label: '关于我们' },
    { key: 'partners', label: '共建单位' },
    { key: 'cooperation', label: '合作与交流' }
  ];

  const teamMembers = [
    { name: '宛思会', title: '创意总监', avatar: 'https://via.placeholder.com/80x80?text=宛思会' },
    { name: '尉振飘', title: '董事长', avatar: 'https://via.placeholder.com/80x80?text=尉振飘' },
    { name: '骆影', title: '总经理', avatar: 'https://via.placeholder.com/80x80?text=骆影' },
    { name: '商雪兰', title: '设计总监', avatar: 'https://via.placeholder.com/80x80?text=商雪兰' },
    { name: '尤德枫', title: '市场总监', avatar: 'https://via.placeholder.com/80x80?text=尤德枫' }
  ];

  const renderAboutUsContent = () => (
    <div className="about-us-content">
      <div className="video-section">
        <div className="video-player">
          <div className="play-button">▶</div>
          <div className="video-controls">
            <span>⏸</span>
            <div className="progress-bar">
              <div className="progress"></div>
            </div>
            <span className="time-display">0:00/0:00</span>
            <span>🔊</span>
            <span>⛶</span>
          </div>
        </div>
      </div>
      <div className="text-section">
        <div className="description">
          岑海燕教授团队致力于植物光学成像与智能感知技术研究，研究方向包括高通量植物表型分析（涵盖3D形态结构、营养生理、光合生理）、多尺度农业遥感、作物组织光学、深度学习、辐射传输模型及其在精准农业管理与智慧育种中的应用。
        </div>
      </div>
    </div>
  );

  const renderPartnersContent = () => (
    <div className="partners-content">
      <div className="carousel-section">
        <div className="carousel-container">
          <div className="carousel-arrow">‹</div>
          <div className="carousel-images">
            <div className="carousel-item">
              <img 
                className="image" 
                src="https://via.placeholder.com/300x200?text=牧目科技" 
                alt="牧目科技" 
              />
              <div className="company-name">牧目科技</div>
            </div>
            <div className="carousel-item">
              <img 
                className="image" 
                src="https://via.placeholder.com/300x200?text=合作单位" 
                alt="合作单位" 
              />
            </div>
            <div className="carousel-item">
              <img 
                className="image" 
                src="https://via.placeholder.com/300x200?text=整数智能" 
                alt="整数智能" 
              />
              <div className="company-name">整数智能</div>
            </div>
          </div>
          <div className="carousel-arrow">›</div>
        </div>
        <div className="university-name">
          浙江大学生物系统工程与食品科学学院
        </div>
      </div>
      
      <div className="team-section">
        <div className="team-sidebar">
          <div className="team-title">我们的团队</div>
        </div>
        <div className="team-grid">
          <div className="team-row">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member">
                <img 
                  className="member-avatar" 
                  src={member.avatar} 
                  alt={member.name} 
                />
                <div className="member-name">{member.name}</div>
                <div className="member-title">{member.title}</div>
              </div>
            ))}
          </div>
          <div className="team-row">
            {teamMembers.map((member, index) => (
              <div key={`second-${index}`} className="team-member">
                <img 
                  className="member-avatar" 
                  src={member.avatar} 
                  alt={member.name} 
                />
                <div className="member-name">{member.name}</div>
                <div className="member-title">{member.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCooperationContent = () => (
        <div style={{ 
        background: 'white',
        padding: '80px 0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
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
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return renderAboutUsContent();
      case 'partners':
        return renderPartnersContent();
      case 'cooperation':
        return renderCooperationContent();
      default:
        return renderAboutUsContent();
    }
  };

  return (
    <div className="platform-intro">
      <div className="tab-container">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={`tab-item ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      
      <div className="content-area">
        {renderContent()}
      </div>
    </div>
  );
};

export default PlatformIntro;