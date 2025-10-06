
import React from 'react';
import { Layout } from 'antd';
import { useLocation } from 'umi';
import Header from '../components/Header';

const { Content } = Layout;

// 不同页面的背景图片配置
const pageBackgrounds = {
  '/home': '/src/assets/images/loginBg.jpg',
  '/platform-intro': '/src/assets/images/loginBg.jpg',
  '/data-exchange': '/src/assets/images/loginBg.jpg',
  '/data-collection': '/src/assets/images/loginBg.jpg',
  '/usage-guide': '/src/assets/images/loginBg.jpg',
  '/login-console': '/src/assets/images/loginBg.jpg',
};

// 不同页面的标题配置
const pageTitles = {
  '/home': { title: '首页', subtitle: 'Home' },
  '/platform-intro': { title: '平台介绍', subtitle: 'About Us' },
  '/data-exchange': { title: '数据汇交', subtitle: 'Data Exchange' },
  '/data-collection': { title: '数据征集', subtitle: 'Data Collection' },
  '/usage-guide': { title: '使用说明', subtitle: 'Usage Guide' },
  '/login-console': { title: '登录控制台', subtitle: 'Login Console' },
};

const BasicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const backgroundImage = pageBackgrounds[currentPath as keyof typeof pageBackgrounds] || '/src/assets/images/loginBg.jpg';
  const pageInfo = pageTitles[currentPath as keyof typeof pageTitles] || { title: '平台介绍', subtitle: 'About Us' };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header 
        backgroundImage={backgroundImage}
        pageTitle={pageInfo.title}
        pageSubtitle={pageInfo.subtitle}
      />
      <Content style={{ background: '#f5f5f5' }}>
        {children}
      </Content>
      {/* <Footer /> */}
    </Layout>
  );
};

export default BasicLayout;
