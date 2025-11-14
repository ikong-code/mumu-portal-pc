import React from 'react';
import { Typography, Row, Col, Button } from 'antd';
import { 
  UserOutlined,
  SettingOutlined,
  CloudUploadOutlined,
  ShareAltOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import { history } from 'umi';
import './index.less';
const IMG1 = require('@/assets/images/usage-guide/usage-img1.png');
const IMG2 = require('@/assets/images/usage-guide/usage-img7.png');

const { Title, Paragraph } = Typography;

const UsageGuide: React.FC = () => {
  const handleDetailClick = (type: string) => {
    history.push(`/usage-guide/detail?type=${type}`);
  };

  return (
    <div className="usage-guide">
      {/* 数据共享页面 */}
      <div className="data-sharing-section">
        <div className="data-sharing-container">
          {/* 标题区域 */}
          <div className="data-sharing-header">
            <Title level={1} className="data-sharing-title">数据共享</Title>
            <Paragraph className="data-sharing-subtitle">
              提供数据管理、共享与权益保障,推动农业科研合作与发展
            </Paragraph>
          </div>

          {/* 三栏内容区域 */}
          <div className="data-sharing-content">
            {/* 左侧 - 数据共享使用说明 */}
            <div className="data-sharing-left">
              <Title level={2} className="content-title">数据共享使用说明</Title>
              <Paragraph className="content-text">
                支持在线管理、共享各类农作物图像数据集,经平台审核后,研究人员和开发者可查看、追溯和引用共享数据集,用于农作物生长监测和病虫害识别等研究。
              </Paragraph>
              <Button 
                type="primary" 
                className="content-button"
                onClick={() => handleDetailClick('data_service')}
              >
                了解详情
              </Button>
            </div>

            {/* 中央 - 圆形图片框架 */}
            <div className="data-sharing-center">
              <div className="circular-image-frame">
                <div className="circular-image">
                  <img 
                    src={IMG1} 
                    alt="无人机喷洒农作物" 
                    className="frame-image"
                  />
                </div>
              </div>
            </div>

            {/* 右侧 - 数据共享权益 */}
            <div className="data-sharing-right">
              <Title level={2} className="content-title">数据共享权益</Title>
              <Paragraph className="content-text">
                为促进数据资源的高效利用,提升数据价值,保障合法权益,特制定本数据共享权益说明,以明确数据提供方与使用方在平台中的权利与义务。
              </Paragraph>
              <Button 
                type="primary" 
                className="content-button"
                onClick={() => handleDetailClick('data_standards')}
              >
                了解详情
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* 云盘与数据标注区域 */}
      <div className="cloud-disk-section">
        <div className="cloud-disk-container">
          <Title level={1} className="cloud-disk-title">云盘与数据标注</Title>
          <Paragraph className="cloud-disk-description">
            "我的云盘"是ADDS平台为每位注册用户提供的数据存储与管理空间,用于上传、下载和管理您在平台上共享的数据集,是对数据进行操作的唯一入口。
          </Paragraph>
          <Button 
            type="primary" 
            className="cloud-disk-button"
            onClick={() => handleDetailClick('data_standards')}
          >
            了解详情
          </Button>
        </div>
      </div>
      {/* 标注平台使用区域 */}
      <div className="annotation-platform-section">
        <div className="annotation-platform-container">
        <Title level={1} className="annotation-platform-title" style={{textAlign: 'center', marginBottom: '30px'}}>标注平台使用</Title>
        <Title level={5} className="annotation-platform-subtitle" style={{textAlign: 'center', marginBottom: '60px', fontSize: '18px'}}>
          ADDS 数据标注工具—智能数据工程平台
        </Title>
          <div className="annotation-platform-content">
            {/* 左侧文字内容 */}
            <div className="annotation-platform-left">
              <div className="annotation-platform-description">
                <Paragraph className="description-text">
                  本平台为智能数据标注系统，支持多数据类型、多流程节点、多人协作的标注工作流。面向科研项目、模型训练等应用场景，如农业无人机等，提供数据标注服务。
                </Paragraph>
                <Paragraph className="description-text">
                  工作流程：数据导入 → 数据标注 → 质量审核 → 数据集验收，形成闭环。
                </Paragraph>
                <Paragraph className="description-text">
                  支持图像、点云、文本、音频、多模态等数据类型，满足复杂任务的高质量标注需求。
                </Paragraph>
                <Paragraph className="description-text">
                  目前ADDS平台支持图像标注（包括指定格式的预标注文件）直接导入（版本2025.08）。其他数据格式可通过"整数智能数据工程平台"的"数据导入"功能上传本地数据。
                </Paragraph>
                <Paragraph className="description-text">
                  标注完成后，点击"获取导出结果"将数据保存到"下载"文件夹。
                </Paragraph>
              </div>
              <Button 
                type="primary" 
                className="annotation-platform-button"
                onClick={() => handleDetailClick('sharing_protocol')}
              >
                了解详情
              </Button>
            </div>

            {/* 右侧笔记本图片 */}
            <div className="annotation-platform-right">
              <div className="laptop-image-container">
                <img 
                  src={IMG2}
                  alt="数据标注平台界面" 
                  className="laptop-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="banner-section">
        <div className="banner-content">
          <Title level={1} className="banner-title">数据征集</Title>
          <Paragraph className="banner-subtitle">
            平台方发起征集、用户方参与贡献、最终实现数据共建共享
          </Paragraph>
        </div>

        {/* 中间内容面板 */}
        <div className="content-panels">
          <div className="panel-left">
            <Title level={2} className="panel-title">数据征集说明</Title>
            <Paragraph className="panel-text">
              平台提供数据征集发布功能,支持科研人员、机构用户、企业等提出特定数据需求,通过设置征集金额,吸引其他用户响应上传符合要求的数据集。请根据以下说明正确填写征集信息,确保数据供需匹配高效完成。
            </Paragraph>
            <Button 
              type="primary" 
              className="panel-button"
              onClick={() => handleDetailClick('annotation_guide')}
            >
              了解详情
            </Button>
          </div>
          <div className="panel-right">
            <Title level={2} className="panel-title">数据征集权益说明</Title>
            <Paragraph className="panel-text">
              为促进数据资源的高效利用,创建数据所有者与数据使用者之间的桥梁,保障双方的合法权益,特制定本数据征集权益说明,以明确数据提供方与使用方在平台中的权利与义务。
            </Paragraph>
            <Button 
              className="panel-button-white"
              onClick={() => handleDetailClick('data_collection')}
            >
              了解详情
            </Button>
          </div>
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
            <Button 
              type="primary" 
              size="large" 
              className="cta-button"
              onClick={() => handleDetailClick('sharing_protocol')}
            >
              了解详情
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageGuide;