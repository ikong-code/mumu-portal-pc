import React, { useState, useEffect } from 'react';
import { Typography, Breadcrumb, Spin, message } from 'antd';
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { history, useLocation } from 'umi';
import axios from 'axios';
import './Detail.less';

const { Title, Paragraph } = Typography;

interface DetailData {
  id: number;
  title: string;
  content: string;
  type: string;
  remark?: string;
  ossId?: string;
  url?: string;
}

interface ApiResponse {
  code: number;
  msg: string;
  data: DetailData;
}

const UsageGuideDetail: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [detailData, setDetailData] = useState<DetailData | null>(null);

  // 从URL参数获取type
  const urlParams = new URLSearchParams(location.search);
  const type = urlParams.get('type');

  // 根据type映射接口地址和页面标题
  const getApiConfig = (type: string) => {
    const configMap: Record<string, { api: string; title: string }> = {
      'data_service': {
        api: '/system/description/getDescription/data_service',
        title: '数据共享使用说明'
      },
      'data_standards': {
        api: '/system/description/getDescription/data_standards',
        title: '数据云盘服务'
      },
      'sharing_protocol': {
        api: '/system/description/getDescription/sharing_protocol',
        title: '标注平台使用'
      },
      'annotation_guide': {
        api: '/system/description/getDescription/annotation_guide',
        title: '数据征集说明'
      },
      'data_collection': {
        api: '/system/description/getDescription/data_collection',
        title: '数据征集权益说明'
      }
    };
    return configMap[type] || { api: '', title: '详情页面' };
  };

  // 获取详情数据
  const fetchDetailData = async () => {
    if (!type) {
      message.error('缺少必要参数');
      return;
    }

    const config = getApiConfig(type);
    if (!config.api) {
      message.error('无效的页面类型');
      return;
    }

    setLoading(true);
    try {
      // 这里应该调用实际的API
      // const response = await request(config.api);
      
      // 模拟API响应数据（基于接口文档中的示例数据）
      // const mockResponse: ApiResponse = {
      //   code: 200,
      //   msg: "操作成功",
      //   data: {
      //     id: 5,
      //     title: config.title,
      //     content: getMockContent(type),
      //     type: type,
      //   }
      // };
      const { data } = await axios.get(config.api, {
        baseURL: 'http://47.99.151.88:10105'
      });

      if (data.code === 200) {
        setDetailData(data.data);
      } else {
        message.error(data.msg || '获取数据失败');
      }
    } catch (error) {
      console.error('获取详情数据失败:', error);
      message.error('获取数据失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 获取模拟内容数据
  const getMockContent = (type: string): string => {
    const contentMap: Record<string, string> = {
      'data_service': `<p class="ql-align-center" style="line-height: 1.5;"><strong class="ql-size-large">数据共享使用说明</strong></p><p style="line-height: normal;"><br></p><p><span class="ql-size-large">为了保障保障数据安全与合规，提升数据使用的透明度与可追溯性，HERD平台要求用户填写必要的数据信息。目前，HERD平台</span><span class="ql-size-large" style="color: rgb(0, 138, 0);">（2025.08版）</span><span class="ql-size-large">目前已支持以下数据类型的共享。随着平台的不断完善，将陆续开放更多数据类型的操作功能，敬请期待。</span></p>`,
      'data_standards': `<p class="ql-align-center" style="line-height: 1.5;"><strong class="ql-size-large">数据云盘服务</strong></p><p class="ql-align-center" style="line-height: 1.5;"><br></p><p style="line-height: 1.5;"><span class="ql-size-large">"我的云盘"是HERD平台为每位注册用户提供的数据存储与管理空间，用于上传、下载和管理您在平台上共享的数据集，是对数据进行操作的唯一入口。</span></p>`,
      'sharing_protocol': `<p class="ql-align-center" style="line-height: 1.5;"><strong class="ql-size-large">HERD 数据标注工具</strong></p><p class="ql-align-center" style="line-height: 1.5;"><strong class="ql-size-large">- 智能数据工程平台</strong></p><p style="line-height: 1.5;"><br></p><p style="line-height: 1.5;"><span class="ql-size-large">本平台内置了一款支持多数据类型、多流程节点、多人协作的智能数据标注系统，服务于科研项目、模型训练及智能化畜牧等多种应用场景。</span></p>`,
      'annotation_guide': `<p style="line-height: 1.5;" class="ql-align-center"><strong class="ql-size-large">数据征集说明</strong></p><p style="line-height: 1.5;" class="ql-align-center"><br></p><p style="line-height: 1.5;"><span class="ql-size-large">平台提供数据征集发布功能，支持科研人员、机构用户、企业等提出特定数据需求，通过设置征集金额，吸引其他用户响应上传符合要求的数据集。</span></p>`,
      'data_collection': `<p class="ql-align-center" style="line-height: 1.5;"><strong class="ql-size-large">数据征集权益说明</strong></p><p class="ql-align-center" style="line-height: 1.5;"><strong class="ql-size-large">（2025.8 ～ 2026.8）</strong></p><p style="line-height: 1.5;"><span class="ql-size-large">为促进数据资源的高效利用，创建数据所有者与数据使用者之间的桥梁，保障双方的合法权益，特制定本数据征集权益说明。</span></p>`
    };
    return contentMap[type] || '<p>暂无内容</p>';
  };

  useEffect(() => {
    fetchDetailData();
  }, [type]);

  // 面包屑配置
  const breadcrumbItems = [
    {
      title: (
        <span onClick={() => history.push('/usage-guide')} style={{ cursor: 'pointer' }}>
          使用说明
        </span>
      ),
    },
    {
      title: detailData?.title || '详情页面',
    },
  ];

  const handleBack = () => {
    history.push('/usage-guide');
  };

  return (
    <div className="usage-guide-detail">
      {/* 面包屑导航 */}
      <div className="breadcrumb-container">
        <div className="breadcrumb-content">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* 内容区域 */}
      <div className="detail-content">
        <div className="detail-container">
          {loading ? (
            <div className="loading-container">
              <Spin size="large" />
              <p>加载中...</p>
            </div>
          ) : detailData ? (
            <>
              <Title level={1} className="detail-title">
                {detailData.title}
              </Title>
              <div 
                className="detail-text"
                dangerouslySetInnerHTML={{ __html: detailData.content }}
              />
            </>
          ) : (
            <div className="error-container">
              <p>暂无数据</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsageGuideDetail;
