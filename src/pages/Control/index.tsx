import React, { useState } from 'react';
import { useLocation, useNavigate, Outlet } from 'umi';
import { 
  CloudOutlined, 
  CheckSquareOutlined, 
  DatabaseOutlined, 
  FileTextOutlined, 
  UploadOutlined, 
  UserOutlined 
} from '@ant-design/icons';
import './index.less';

interface MenuItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const Control: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState('personal-account');

  const menuItems: MenuItem[] = [
    {
      key: 'cloud-drive',
      label: '我的云盘',
      icon: <CloudOutlined />,
      path: '/control/cloud-drive'
    },
    {
      key: 'annotation-tasks',
      label: '我的标注任务',
      icon: <CheckSquareOutlined />,
      path: '/control/annotation-tasks'
    },
    {
      key: 'datasets',
      label: '我的数据集',
      icon: <DatabaseOutlined />,
      path: '/control/datasets'
    },
    {
      key: 'data-requirements',
      label: '我的数据需求',
      icon: <FileTextOutlined />,
      path: '/control/data-requirements'
    },
    {
      key: 'submitted-data',
      label: '我的提交数据',
      icon: <UploadOutlined />,
      path: '/control/submitted-data'
    },
    {
      key: 'personal-account',
      label: '个人账户',
      icon: <UserOutlined />,
      path: '/control/personal-account'
    }
  ];

  const handleMenuClick = (item: MenuItem) => {
    setActiveMenu(item.key);
    navigate(item.path);
  };

  // 根据当前路径设置活动菜单
  React.useEffect(() => {
    const currentPath = location.pathname;
    const currentMenuItem = menuItems.find(item => item.path === currentPath);
    if (currentMenuItem) {
      setActiveMenu(currentMenuItem.key);
    }
  }, [location.pathname]);

  return (
    <div className="control-container">
      <div className="control-layout">
        {/* 左侧菜单栏 */}
        <div className="control-sidebar">
          <div className="sidebar-header">
            <div className="sidebar-title">
              <DatabaseOutlined className="title-icon" />
              <span>个人中心</span>
            </div>
          </div>
          <div className="sidebar-menu">
            {menuItems.map((item) => (
              <div
                key={item.key}
                className={`menu-item ${activeMenu === item.key ? 'active' : ''}`}
                onClick={() => handleMenuClick(item)}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 右侧内容区域 */}
        <div className="control-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Control;
