import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'umi';
import { SoundOutlined } from '@ant-design/icons';
import { Affix } from 'antd';
import logo from '@/assets/images/logo.png';
import bgImg from '@/assets/images/login-bg.png';
import PortalBannerBg from '@/assets/images/portal/portal-bg1.png';
import PlatformIntroBannerBg from '@/assets/images/platform-intro-bg.png'
import DataExchangeBannerBg from '@/assets/images/data-exchange-bg.png'
import DataCollectionBannerBg from '@/assets/images/data-collection-bg.png'
import UsageGuideBannerBg from '@/assets/images/usage-guide/usage-bg1.png'
import AnnouncementImg from '@/assets/images/portal/icon1.png'
import PortalBannerContent from './portal-banner-content';
import axios from 'axios';
import {useRequest} from 'ahooks';
import './index.less';

interface HeaderProps {
  backgroundImage?: string;
  pageTitle?: string;
  pageSubtitle?: string;
}


const PAGE_TITLE_ENUM: Record<string, { title: string; subTitle: string; color: string }> = {
  '/data-collection': {
    title: '发布需求',
    subTitle: 'Access & Share',
    color: "#fff"
  },
  '/data-exchange': {
    title: '数据汇交',
    subTitle: 'Access & Share',
    color: "#fff"
  },
  '/usage-guide': {
    title: '使用说明',
    subTitle: 'Use Directions',
    color: "#fff"
  },
  '/platform-intro': {
    title: '平台介绍',
    subTitle: 'About Us',
    color: "#50935a"
  }
}

const renderPageText = () => {
  const { title, subTitle, color } = PAGE_TITLE_ENUM[location.pathname] || {};
  return <div style={{
    top: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    left: '50%',
    textAlign: 'center',
  }}>
    <div style={{fontSize: '48px', fontWeight: 'bold', color}}>{title}</div>
    <div style={{fontSize: '22px', marginTop: '20px', color}}>{subTitle}</div>
  </div>
}

const Header: React.FC<HeaderProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuSticky, setIsMenuSticky] = useState(false);
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);

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
      key: '/control/personal-account',
      label: '登录控制台',
      path: '/control/personal-account'
    },
  ];

  const { data: announcementData } = useRequest(async () => {
     const res = await axios.get('//system/dict/data/list', {
      params: {
        dictType: "broadcast",
        pageNum: 1,
        pageSize: 10
      },
      baseURL: "https://api.ai4as.cn"
     });
     console.log(res, 'res')
     return res.data?.rows || [];
  }, {
    manual: false
  });

  // 监听滚动事件，实现菜单sticky效果
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsMenuSticky(scrollTop > 200); // 当滚动超过200px时，菜单变为sticky
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 公告滚动效果
  useEffect(() => {
    if (!announcementData || announcementData.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentAnnouncementIndex((prevIndex) => 
        (prevIndex + 1) % announcementData.length
      );
    }, 5000); // 每5秒切换一次

    return () => clearInterval(interval);
  }, [announcementData]);

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  console.log(location.pathname, 'location.pathname')
  const renderBannerContent = useMemo(() => {
      if (location.pathname === '/home/index') {
        return {
          content: <PortalBannerContent />,
          bannerBg: PortalBannerBg
        };
      }
      if (location.pathname === '/platform-intro') {
        return {
          content: null,
          bannerBg: PlatformIntroBannerBg
        };
      }
      if (location.pathname === '/data-exchange') {
        return {
          content: null,
          bannerBg: DataExchangeBannerBg
        };
      }
      if (location.pathname === '/data-collection') {
        return {
          content: null,
          bannerBg: DataCollectionBannerBg
        };
      }
      if (location.pathname === '/usage-guide') {
        return {
          content: null,
          bannerBg: UsageGuideBannerBg
        };
      }
      return null;
  }, [location.pathname]);
  console.log(location.pathname, 'location.pathname')

  if(!renderBannerContent) {
    
    return <Affix offsetTop={0}>
    <div className={`menu-section`}>
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
  </Affix>
  }
  return (
    <div className="header-container"
    
    style={{ backgroundImage: `url(${renderBannerContent?.bannerBg})` }}
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
              <img width={"18px"} src={AnnouncementImg} />
              <span className="announcement-text">
                {announcementData && announcementData.length > 0 
                  ? announcementData[currentAnnouncementIndex]?.dictLabel || '本平台聚焦农业无人机数据共享,支持精准农业科技创新与推广'
                  : '本平台聚焦农业无人机数据共享,支持精准农业科技创新与推广'
                }
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
              renderBannerContent?.content
            }
            {
              renderPageText()
            }
        </div>
      </div>
    </div>
  );
};

export default Header;
