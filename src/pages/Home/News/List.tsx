import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Card, Pagination, Spin, Empty } from 'antd';
import { CalendarOutlined, EyeOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import axios from 'axios';
import { useNavigate } from '@umijs/max';
import './index.less';

const { Title, Text } = Typography;
const { Content } = Layout;

interface NewsItem {
  id: string;
  title: string;
  description: string;
  context: string;
  ossKey: string;
  isShow: number;
  imgPath: string;
  publishTime: string;
}

const NewsList: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // 获取新闻列表数据
  const { data: newsData, loading } = useRequest(
    async () => {
      const res = await axios.get('/system/newsPolicy/list', {
        params: {
          pageNum: currentPage,
          pageSize: pageSize,
          isShow: 1
        },
        baseURL: 'http://47.99.151.88:10105'
      });
      return res.data?.data?.rows || [];
    },
    {
      refreshDeps: [currentPage],
      manual: false
    }
  );

  // 格式化日期
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}-${day}`;
  };

  // 处理新闻项点击
  const handleNewsClick = (newsId: string) => {
    navigate(`/home/news/${newsId}`);
  };

  // 处理分页变化
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Content className="news-list-container">
      <div className="news-list-header">
        <Title level={2} className="news-list-title">
          新闻动态
        </Title>
        <Text className="news-list-subtitle">
          News Center
        </Text>
      </div>

      <div className="news-list-content">
        {loading ? (
          <div className="news-list-loading">
            <Spin size="large" />
          </div>
        ) : newsData?.length ? (
          <>
            <Row gutter={[24, 24]} className="news-grid">
              {newsData?.map((item: NewsItem) => (
                <Col xs={24} sm={12} lg={8} key={item.id}>
                  <Card
                    hoverable
                    className="news-item-card"
                    cover={
                      <div className="news-item-image">
                        <img
                          alt={item.title}
                          src={item.imgPath}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/300x200?text=暂无图片';
                          }}
                        />
                      </div>
                    }
                    onClick={() => handleNewsClick(item.id)}
                  >
                    <div className="news-item-content">
                      <div className="news-item-date">
                        <CalendarOutlined />
                        <Text>{formatDate(item.publishTime)}</Text>
                      </div>
                      <Title level={4} className="news-item-title" ellipsis={{ tooltip: item.title }}>
                        {item.title}
                      </Title>
                      <Text className="news-item-description" ellipsis={{ tooltip: item.description || item.title }}>
                        {item.description || item.title}
                      </Text>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>

            {newsData.total > pageSize && (
              <div className="news-list-pagination">
                <Pagination
                  current={currentPage}
                  total={newsData.total}
                  pageSize={pageSize}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                  showQuickJumper
                  showTotal={(total, range) =>
                    `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
                  }
                />
              </div>
            )}
          </>
        ) : (
          <div className="news-list-empty">
            <Empty description="暂无新闻数据" />
          </div>
        )}
      </div>
    </Content>
  );
};

export default NewsList;
