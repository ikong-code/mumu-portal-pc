import React from 'react';
import { Typography, Row, Col, Button } from 'antd';
import { 
  UserOutlined,
  SettingOutlined,
  CloudUploadOutlined,
  ShareAltOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import './index.less';

const { Title, Paragraph } = Typography;

const UsageGuide: React.FC = () => {
  return (
    <div className="usage-guide">
      {/* 顶部横幅区域 */}
      <div className="banner-section">
        <div className="banner-content">
          <Title level={1} className="banner-title">数据征集</Title>
          <Paragraph className="banner-subtitle">
            平台方发起征集、用户方参与贡献、最终实现数据共建共享
          </Paragraph>
        </div>
      </div>

      {/* 中间内容面板 */}
      <div className="content-panels">
        <div className="panel-left">
          <Title level={2} className="panel-title">数据征集说明</Title>
          <Paragraph className="panel-text">
            平台提供数据征集发布功能,支持科研人员、机构用户、企业等提出特定数据需求,通过设置征集金额,吸引其他用户响应上传符合要求的数据集。请根据以下说明正确填写征集信息,确保数据供需匹配高效完成。
          </Paragraph>
          <Button type="primary" className="panel-button">了解详情</Button>
        </div>
        <div className="panel-right">
          <Title level={2} className="panel-title">数据征集权益说明</Title>
          <Paragraph className="panel-text">
            为促进数据资源的高效利用,创建数据所有者与数据使用者之间的桥梁,保障双方的合法权益,特制定本数据征集权益说明,以明确数据提供方与使用方在平台中的权利与义务。
          </Paragraph>
          <Button className="panel-button-white">了解详情</Button>
        </div>
      </div>

      {/* 底部教程区域 */}
      <div className="tutorial-section">
        <div className="tutorial-header">
          <Title level={2} className="tutorial-title">使用教程</Title>
          <Paragraph className="tutorial-subtitle">ADDS平台 使用教程</Paragraph>
        </div>
        
        <div className="tutorial-grid">
          <div className="tutorial-card">
            <div className="tutorial-icon">
              <UserOutlined />
            </div>
            <Title level={4} className="tutorial-card-title">一、注册登录</Title>
            <Paragraph className="tutorial-card-text">
              请点击"登录控制台"注册账户,点击"立即注册"填写使用邮箱(推荐官方邮箱)。
            </Paragraph>
          </div>

          <div className="tutorial-card">
            <div className="tutorial-icon">
              <SettingOutlined />
            </div>
            <Title level={4} className="tutorial-card-title">二、数据管理与标注</Title>
            <Paragraph className="tutorial-card-text">
              点击"我的控制台"&gt;"我的云盘"上传数据文件,对于云盘中的数据可以进行增加、删除、修改和查找等操作。
            </Paragraph>
          </div>

          <div className="tutorial-card">
            <div className="tutorial-icon">
              <CloudUploadOutlined />
            </div>
            <Title level={4} className="tutorial-card-title">三、数据集发布</Title>
            <Paragraph className="tutorial-card-text">
              上传完成后,点击"我的数据集",点击"新增"创建数据集发布任务。
            </Paragraph>
          </div>

          <div className="tutorial-card">
            <div className="tutorial-icon">
              <ShareAltOutlined />
            </div>
            <Title level={4} className="tutorial-card-title">四、数据征集</Title>
            <Paragraph className="tutorial-card-text">
              【我要发布征集】在"我的需求管理"中点击"新增",填写需求描述、联系方式等信息,平台将协助寻找匹配数据集。
            </Paragraph>
          </div>

          <div className="tutorial-card">
            <div className="tutorial-icon">
              <DownloadOutlined />
            </div>
            <Title level={4} className="tutorial-card-title">五、共享数据下载</Title>
            <Paragraph className="tutorial-card-text">
              进入"数据汇交"栏目,选择感兴趣的数据卡片,点击"了解详情",在弹出界面中点击"转存至云盘"即可在云盘中下载数据集文件。
            </Paragraph>
          </div>

          <div className="tutorial-cta">
            <Button type="primary" size="large" className="cta-button">了解详情</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageGuide;