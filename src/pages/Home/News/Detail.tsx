import React from 'react';
import { Layout, Typography, Card, Spin, Breadcrumb, Row, Col, List } from 'antd';
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

interface NewsItem {
  id: string;
  title: string;
  description: string;
  publishTime: string;
}

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 获取新闻详情数据
  const { data: newsDetail, loading } = useRequest<NewsDetail, [string]>(
    async () => {
      const res = await axios.get(`/system/newsPolicy/${id}`, {
        baseURL: 'http://47.99.151.88:10105'
      });
      return res.data?.data;
    },
    {
      refreshDeps: [id],
      manual: false
    }
  );

  console.log(newsDetail, 'newsDetail');

  // 获取右侧相关内容
  const { data: relatedData } = useRequest(
    async () => {
      const res = await axios.get('/system/newsPolicy/list', {
        params: {
          pageNum: 1,
          pageSize: 5,
          isShow: 1
        },
        baseURL: 'http://47.99.151.88:10105'
      });
      console.log(res.data, 'res.data');  
      return res.data?.data?.rows || [];
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

  const handleNavigateDetail = (newsId: string) => {
    navigate(`/home/news/${newsId}`);
  };

  return (
    <Content className="news-detail-container">
      <div className="news-detail-header">
        <div className="news-detail-breadcrumb">
          <Breadcrumb separator=">">
            <Breadcrumb.Item onClick={handleBack} >
                <span style={{ cursor: 'pointer', }}>新闻动态</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>新闻详情</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      <div className="news-detail-content-wrapper">
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
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
                <div dangerouslySetInnerHTML={{ __html: newsDetail.context }}>

                </div>
              </Card>
            ) : (
              <Card className="news-detail-card">
                <div className="news-detail-empty">
                  <Text>新闻不存在或已被删除</Text>
                </div>
              </Card>
            )}
          </Col>

          <Col xs={24} lg={8}>
            <Card className="news-related-card" title="相关内容" bordered>
              <List
                itemLayout="vertical"
                dataSource={relatedData || []}
                renderItem={(item: NewsItem) => (
                  <List.Item className="news-related-item" onClick={() => handleNavigateDetail(item.id)}>
                    <div className="news-related-title" title={item.title}>{item.title}</div>
                    {item.description ? (
                      <div className="news-related-desc" title={item.description}>{item.description}</div>
                    ) : null}
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default NewsDetail;
