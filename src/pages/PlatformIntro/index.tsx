import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Typography, Row, Col, Card, Button, Space, Statistic, Carousel, Spin, message } from 'antd';
import axios from 'axios';
import './index.less';
const { Title, Paragraph, Text } = Typography;

const { Content } = Layout;

interface DescriptionData {
  id: number;
  title: string;
  content: string;
  type: string;
  create_by?: string;
  create_time?: string;
  update_by?: string;
  update_time?: string;
  del_flag?: string;
  status?: string;
  remark?: string;
  ossId?: number;
}

interface ApiResponse {
  code: number;
  msg: string;
  data: DescriptionData;
}

const PlatformIntro: React.FC = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [aboutUsContent, setAboutUsContent] = useState<string>('');
  const [partnersContent, setPartnersContent] = useState<string>('');
  const [cooperationContent, setCooperationContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [partnersLoading, setPartnersLoading] = useState(false);
  const [cooperationLoading, setCooperationLoading] = useState(false);

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

  // 获取关于我们内容
  const fetchAboutUsContent = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/system/description/getDescription/platform_introduction', {
        baseURL: 'http://47.99.151.88:10105'
      });

      if (data.code === 200 && data.data) {
        setAboutUsContent(data.data.content || '');
      } else {
        message.error(data.msg || '获取内容失败');
      }
    } catch (error) {
      console.error('获取关于我们内容失败:', error);
      message.error('获取内容失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  }, []);

  // 获取共建单位内容
  const fetchPartnersContent = useCallback(async () => {
    setPartnersLoading(true);
    try {
      const { data } = await axios.get('/system/description/getDescription/intelligent_breeding', {
        baseURL: 'http://47.99.151.88:10105'
      });

      if (data.code === 200 && data.data) {
        setPartnersContent(data.data.content || '');
      } else {
        message.error(data.msg || '获取内容失败');
      }
    } catch (error) {
      console.error('获取共建单位内容失败:', error);
      message.error('获取内容失败，请稍后重试');
    } finally {
      setPartnersLoading(false);
    }
  }, []);

  // 获取合作与交流内容
  const fetchCooperationContent = useCallback(async () => {
    setCooperationLoading(true);
    try {
      const { data } = await axios.get('/system/description/getDescription/connect', {
        baseURL: 'http://47.99.151.88:10105'
      });

      if (data.code === 200 && data.data) {
        setCooperationContent(data.data.content || '');
      } else {
        message.error(data.msg || '获取内容失败');
      }
    } catch (error) {
      console.error('获取合作与交流内容失败:', error);
      message.error('获取内容失败，请稍后重试');
    } finally {
      setCooperationLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'about') {
      fetchAboutUsContent();
    } else if (activeTab === 'partners') {
      fetchPartnersContent();
    } else if (activeTab === 'cooperation') {
      fetchCooperationContent();
    }
  }, [activeTab, fetchAboutUsContent, fetchPartnersContent, fetchCooperationContent]);

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
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
            <Spin size="large" />
          </div>
        ) : (
          <div 
            className="description"
            dangerouslySetInnerHTML={{ __html: aboutUsContent || '暂无内容' }}
          />
        )}
      </div>
    </div>
  );

  const renderPartnersContent = () => (
    <div className="partners-content">
      {partnersLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <div 
          className="partners-text-content"
          dangerouslySetInnerHTML={{ __html: partnersContent || '暂无内容' }}
        />
      )}
    </div>
  );

  const renderCooperationContent = () => (
    <div className="cooperation-content">
      {cooperationLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <div 
          className="cooperation-text-content"
          dangerouslySetInnerHTML={{ __html: cooperationContent || '暂无内容' }}
        />
      )}
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