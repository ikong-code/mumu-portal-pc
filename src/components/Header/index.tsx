import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'umi';
import { SoundOutlined } from '@ant-design/icons';
import logo from '@/assets/images/login-logo.jpg';
import bgImg from '@/assets/images/loginBg.jpg';
import PortalBannerContent from './portal-banner-content';
import './index.less';

interface HeaderProps {
  backgroundImage?: string;
  pageTitle?: string;
  pageSubtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  backgroundImage = bgImg,
  pageTitle = '平台介绍',
  pageSubtitle = 'About Us'
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuSticky, setIsMenuSticky] = useState(false);

  const menuItems = [
    {
      key: '/home',
      label: '首页',
      path: '/home'
    },
    {
      key: '/platform-intro',
      label: '平台介绍',
      path: '/platform-intro'
    },
    {
      key: '/data-exchange',
      label: '数据汇交',
      path: '/data-exchange'
    },
    {
      key: '/data-collection',
      label: '数据征集',
      path: '/data-collection'
    },
    {
      key: '/usage-guide',
      label: '使用说明',
      path: '/usage-guide'
    },
    {
      key: '/login-console',
      label: '登录控制台',
      path: '/login-console'
    },
  ];

  // 监听滚动事件，实现菜单sticky效果
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsMenuSticky(scrollTop > 200); // 当滚动超过200px时，菜单变为sticky
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  const getCurrentPageInfo = () => {
    const currentPath = location.pathname;
    const currentItem = menuItems.find(item => item.path === currentPath);
    return {
      title: currentItem?.label || pageTitle,
      subtitle: currentItem?.key === '/platform-intro' ? 'About Us' : pageSubtitle
    };
  };

  const currentPageInfo = getCurrentPageInfo();
  console.log(location.pathname, 'location.pathname')
  const renderBannerContent = () => {
    if (location.pathname === '/home') {
      return <PortalBannerContent />;
    }
    return null;
  };

  return (
    <div className="header-container"
    
    style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* 顶部内容区域 */}
      <div className="header-top">
        <div className="header-top-content">
          {/* 左侧Logo区域 */}
          <div className="logo-section">
            <img src={logo} alt="logo" height={80} />
            
          </div>

          {/* 右侧公告区域 */}
          <div className="announcement-section">
            <div className="announcement-content">
              <SoundOutlined className="announcement-icon" />
              <span className="announcement-text">
                本平台聚焦农业无人机数据共享,支持精准农业科技创新与推广
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 菜单列表区域 */}
      <div className={`menu-section ${isMenuSticky ? 'sticky' : ''}`}>
        <div className="menu-content">
          {menuItems.map((item) => (
            <div
              key={item.key}
              className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => handleMenuClick(item.path)}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* 背景内容区域 */}
      <div 
        className="header-background"
      >
        <div className="background-overlay">
          {/* 装饰性元素 */}
            {
              renderBannerContent()
            }
        </div>
      </div>
    </div>
  );
};

export default Header;
