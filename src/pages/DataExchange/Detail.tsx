import React, { useEffect, useState } from 'react';
import { Layout, Typography, Button, Card, Tag, Row, Col, Spin, message } from 'antd';
import { ArrowLeftOutlined, CloudDownloadOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useSearchParams, useNavigate } from '@umijs/max';
import axios from 'axios';
import './detail.less';
import { MOCK_DETAIL } from './mock';

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

interface DatasetDetail {
  id: string;
  datasetSn: string;
  datasetName: string;
  datasetDesc: string;
  datasetType: string;
  shareMode: string;
  dataFormat: string;
  dataSource: string;
  shareStartTime: string;
  coverImageUrl: string;
  enName: string;
  dataAuthor: string;
  uploadUnit: string;
  uploadUserName: string;
  auditStatus: string;
  isShare: string;
  datasetCategoryNameList: string[];
  dataIntro: string;
  animalEthics: string;
  datasetEthics: string;
  hasManual: string;
  protocolConfirmed: string;
  protocolConfirmTime: string;
  citationInstructions: string;
}

const DataExchangeDetail: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [loading, setLoading] = useState(true);
  const [datasetDetail, setDatasetDetail] = useState<DatasetDetail | null>(null);

  useEffect(() => {
    fetchDatasetDetail();
  }, [id]);

  const fetchDatasetDetail = async () => {
    try {
      setLoading(true);
    //   const data = await axios.get(`/system/dataset/${id}`, {
    //     baseURL: 'https://api.ai4as.cn'
    //   });
      const data = MOCK_DETAIL;
      if (data.code === 200) {
        setDatasetDetail(data.data);
      } else {
        message.error(data.msg || '获取数据失败');
      }
    } catch (error) {
      console.error('获取数据集详情失败:', error);
      message.error('获取数据集详情失败');
    } finally {
      setLoading(false);
    }
  };

  const getStatusTag = (status: string, type: 'audit' | 'share' | 'ethics' | 'manual' | 'protocol') => {
    const statusMap = {
      audit: {
        '1': { text: '审核成功', color: 'success' },
        '0': { text: '审核中', color: 'processing' },
        '-1': { text: '审核失败', color: 'error' }
      },
      share: {
        '1': { text: '是', color: 'success' },
        '0': { text: '否', color: 'default' }
      },
      ethics: {
        '1': { text: '是', color: 'error' },
        '0': { text: '否', color: 'success' }
      },
      manual: {
        '1': { text: '是', color: 'success' },
        '0': { text: '否', color: 'default' }
      },
      protocol: {
        '1': { text: '已确认', color: 'success' },
        '0': { text: '未确认', color: 'warning' }
      }
    };

    const config = statusMap[type][status];
    return config ? <Tag color={config.color}>{config.text}</Tag> : <Tag>{status}</Tag>;
  };

  if (loading) {
    return (
      <Content style={{ padding: '0 24px', background: 'white', minHeight: '100vh' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <Spin size="large" />
        </div>
      </Content>
    );
  }

  if (!datasetDetail) {
    return (
      <Content style={{ padding: '0 24px', background: 'white', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <Text>数据不存在或已被删除</Text>
        </div>
      </Content>
    );
  }

  return (
    <Content style={{ padding: '0 24px', background: 'white' }}>
      <div className="dataset-detail-container">
        {/* 返回按钮 */}
        <div className="back-button">
          <Button 
            type="text" 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/data-exchange')}
            style={{ padding: '4px 0' }}
          >
            返回列表
          </Button>
        </div>

        {/* 标题和转储按钮 */}
        <div className="detail-header">
          <Title level={2} className="detail-title">
            {datasetDetail.datasetName}
          </Title>
          <Button type="primary" className="transfer-button" icon={<CloudDownloadOutlined />}>
            转储到云盘
          </Button>
        </div>

        {/* 主要内容区域 */}
        <Row gutter={24} className="detail-content">
          {/* 左侧内容 */}
          <Col span={16}>
            {/* 数据基本信息 */}
            <Card title="数据基本信息" className="info-card">
              <div className="info-grid">
                <div className="info-item">
                  <Text className="info-label">数据集编号：</Text>
                  <Text className="info-value">{datasetDetail.datasetSn}</Text>
                </div>
                <div className="info-item">
                  <Text className="info-label">英文名称：</Text>
                  <Text className="info-value">{datasetDetail.enName}</Text>
                </div>
                <div className="info-item">
                  <Text className="info-label">数据集类型：</Text>
                  <Text className="info-value">{datasetDetail.datasetType}</Text>
                </div>
                <div className="info-item">
                  <Text className="info-label">场景类型：</Text>
                  <Text className="info-value">{datasetDetail.shareMode}</Text>
                </div>
                <div className="info-item">
                  <Text className="info-label">数据用途：</Text>
                  <Text className="info-value">{datasetDetail.dataFormat}</Text>
                </div>
                <div className="info-item">
                  <Text className="info-label">数据来源：</Text>
                  <Text className="info-value">{datasetDetail.dataSource}</Text>
                </div>
                <div className="info-item">
                  <Text className="info-label">发布时间：</Text>
                  <Text className="info-value">{datasetDetail.shareStartTime}</Text>
                </div>
                <div className="info-item">
                  <Text className="info-label">学科分类：</Text>
                  <Text className="info-value">{datasetDetail.datasetCategoryNameList.join(', ')}</Text>
                </div>
                <div className="info-item">
                  <Text className="info-label">数据作者：</Text>
                  <Text className="info-value">{datasetDetail.dataAuthor}</Text>
                </div>
                <div className="info-item">
                  <Text className="info-label">数据上传单位：</Text>
                  <Text className="info-value">{datasetDetail.uploadUnit}</Text>
                </div>
                <div className="info-item">
                  <Text className="info-label">上传用户：</Text>
                  <Text className="info-value">{datasetDetail.uploadUserName}</Text>
                </div>
                <div className="info-item">
                  <Text className="info-label">审核状态：</Text>
                  {getStatusTag(datasetDetail.auditStatus, 'audit')}
                </div>
                <div className="info-item">
                  <Text className="info-label">是否共享：</Text>
                  {getStatusTag(datasetDetail.isShare, 'share')}
                </div>
              </div>
            </Card>
          </Col>

          {/* 右侧内容 */}
          <Col span={8}>
            {/* 元数据 */}
            <Card title="元数据" className="metadata-card">
              <div className="metadata-item">
                <div className="metadata-label">
                  <Text>是否涉及动物伦理</Text>
                  <QuestionCircleOutlined className="question-icon" />
                </div>
                {getStatusTag(datasetDetail.animalEthics, 'ethics')}
              </div>
              
              <div className="metadata-item">
                <div className="metadata-label">
                  <Text>数据集是否涉及伦理</Text>
                  <QuestionCircleOutlined className="question-icon" />
                </div>
                {getStatusTag(datasetDetail.datasetEthics, 'ethics')}
              </div>
              
              <div className="metadata-item">
                <div className="metadata-label">
                  <Text>是否有数据手册</Text>
                </div>
                {getStatusTag(datasetDetail.hasManual, 'manual')}
              </div>
              
              <div className="metadata-item">
                <div className="metadata-label">
                  <Text>协议确认状态</Text>
                </div>
                {getStatusTag(datasetDetail.protocolConfirmed, 'protocol')}
              </div>
              
              <div className="metadata-item">
                <div className="metadata-label">
                  <Text>协议确认时间</Text>
                </div>
                <Text className="metadata-value">{datasetDetail.protocolConfirmTime}</Text>
              </div>
            </Card>
          </Col>
        </Row>
         {/* 数据集描述 */}
        <Card title="数据集描述" className="info-card">
              <Paragraph className="description-text">
                {datasetDetail?.datasetDesc || '-'}
              </Paragraph>
            </Card>

            {/* 数据简介 */}
            <Card title="数据简介" className="info-card">
              <Paragraph className="description-text">
                {datasetDetail?.dataIntro || '-'}
              </Paragraph>
            </Card>
            {/* 数据引用说明 */}
            <Card title="数据引用说明" className="info-card">
              <Paragraph className="description-text">
                {datasetDetail?.citationInstructions || '-'}
              </Paragraph>
            </Card>

            
      </div>
    </Content>
  );
};

export default DataExchangeDetail;
