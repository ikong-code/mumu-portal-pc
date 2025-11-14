import React, {useState} from 'react';
import { Layout, Typography, Row, Col, Card, Button, Pagination, Table, Tag, Input, Select, DatePicker } from 'antd';
import { 
  UploadOutlined, 
  DownloadOutlined, 
  SearchOutlined,
  FileTextOutlined,
  EyeOutlined,
  ShareAltOutlined,
  FilterOutlined
} from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { useNavigate } from '@umijs/max';
import axios from 'axios';
import './index.less';

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;
const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const DataExchange: React.FC = () => {
  const navigate = useNavigate();
  const [searchInfo, setSearchInfo] = useState({
    datasetName: '',
    pageNum: 1,
    pageSize: 10
  });
 
   // 获取列表数据
   const { data: dataInfo, run: runDataList, loading: customerListLoading } = useRequest(async () => {
    const res = await axios.get('/system/dataset/show/list', {
      params: searchInfo,
      baseURL: "http://47.99.151.88:10105"
    });
    return {
      list: res.data?.rows || [],
      total: res.data?.total || 0
    };
  }, {
    manual: false,
    refreshDeps: [searchInfo]
  });


  return (
    <Content style={{ padding: '0 24px', background: 'white' }}>
      {/* Hero Section */}
      <div className="data-collection-list">
        {dataInfo?.list?.map((item: any, idx: number) => (
          <div key={item.id} className={`data-collection-item ${idx % 2 === 1 ? 'data-collection-item-reverse' : ''}`}>
            {/* 左侧图片区域 - 50%宽度 */}
            <div className="item-image-section">
              <div className="image-background" style={{
                background: "rgba(0,0,0,.1)"
              }}>
                <img src={item?.coverImageUrl || ''} style={{
                  objectFit: 'contain'
                }} width={'100%'} height={'100%'} />
              </div>
            </div>
            
            {/* 右侧文字介绍区域 - 50%宽度，36px内边距 */}
            <div className="item-content-section">
              <Title level={4} className="item-title">{item.datasetName || '-'}</Title>
              
              <div className="item-info">
              <div className="info-row">
                  <Text className="info-label">作者：</Text>
                  <Text className="info-value">{item.uploadUserName || '-'}</Text>
                </div>
                <div className="info-row">
                  <Text className="info-label">单位：</Text>
                  <Text className="info-value">{item.uploadUnit || '-'}</Text>
                </div>
                
                <div className="info-row">
                  <Text className="info-label">发布时间：</Text>
                  <Text className="info-value">{item.shareStartTime || '-'}</Text>
                </div>
              </div>
              
              <Button 
                type="primary" 
                className="detail-button"
                onClick={() => navigate(`/data-exchange/detail?id=${item.id}`)}
              >
                了解详情
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        style={{
          paddingBottom: "24px",
          margin: "0 auto",
          textAlign: "center",
          display: "block"
        }}
        total={dataInfo?.total}
        pageSize={searchInfo.pageSize}
        current={searchInfo.pageNum}
        onChange={(page, pageSize) => {
          setSearchInfo({
            ...searchInfo,
            pageNum: page,
            pageSize: pageSize
          });
        }}
      />
    </Content>
  );
};

export default DataExchange;