import React from 'react';
import { Layout, Typography, Card, Spin, Button, Breadcrumb } from 'antd';
import { ArrowLeftOutlined, CalendarOutlined, EyeOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import axios from 'axios';
import { useParams, useNavigate } from '@umijs/max';
import './detail.less';

const { Title, Text, Paragraph } = Typography;
const { Content } = Layout;

interface NewsDetail {
  id: string;
  title: string;
  description: string;
  context: string;
  ossKey: string;
  isShow: number;
  imgPath: string;
  publishTime: string;
}

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 获取新闻详情数据
  const { data: newsDetail, loading } = useRequest<NewsDetail, [string]>(
    async () => {
      const res = await axios.get(`/system/newsPolicy/${id}`, {
        baseURL: 'https://api.ai4as.cn'
      });
      return res.data?.data;
    },
    {
      refreshDeps: [id],
      manual: false
    }
  );

  // 格式化日期
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 处理HTML内容
  const renderContent = (htmlContent: string) => {
    return (
      <div 
        className="news-detail-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    );
  };

  // 返回列表
  const handleBack = () => {
    navigate('/home/news');
  };

  return (
    <Content className="news-detail-container">
      <div className="news-detail-header">
        <div className="news-detail-breadcrumb">
          <Breadcrumb separator=">">
            <Breadcrumb.Item onClick={handleBack} >
                <span style={{ cursor: 'pointer', color: '#fa8c16' }}>新闻动态</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>新闻详情</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      <div className="news-detail-content-wrapper">
        {loading ? (
          <div className="news-detail-loading">
            <Spin size="large" />
          </div>
        ) : newsDetail ? (
          <Card className="news-detail-card">
            <div className="news-detail-meta">
              <div className="news-detail-date">
                <CalendarOutlined />
                <Text>{formatDate(newsDetail.publishTime)}</Text>
              </div>
            </div>

            <Title level={1} className="news-detail-title">
              {newsDetail.title}
            </Title>

            {newsDetail.imgPath && (
              <div className="news-detail-image">
                <img 
                  src={newsDetail.imgPath} 
                  alt={newsDetail.title}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            )}

            <div className="news-detail-description">
              <Text>{newsDetail.description}</Text>
            </div>

            {newsDetail.context && (
              <div className="news-detail-body">
                {renderContent(newsDetail.context)}
              </div>
            )}
          </Card>
        ) : (
          <Card className="news-detail-card">
            <div className="news-detail-empty">
              <Text>新闻不存在或已被删除</Text>
            </div>
          </Card>
        )}
      </div>
    </Content>
  );
};

export default NewsDetail;
