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
import axios from 'axios';
import './index.less';

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;
const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const DataExchange: React.FC = () => {
  const [searchInfo, setSearchInfo] = useState({
    datasetName: '',
    pageNum: 1,
    pageSize: 10
  });
 
   // 获取列表数据
   const { data: dataInfo, run: runDataList, loading: customerListLoading } = useRequest(async () => {
    const res = await axios.get('/system/datasetDemand/user/show/list', {
      params: searchInfo,
      baseURL: "https://api.ai4as.cn"
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
                <img src={item?.demandImageUrl || ''} style={{
                  objectFit: 'contain'
                }} width={'100%'} height={'100%'} />
              </div>
            </div>
            
            {/* 右侧文字介绍区域 - 50%宽度，36px内边距 */}
            <div className="item-content-section">
              <Title level={4} className="item-title">{item.demandName || '-'}</Title>
              
              <div className="item-info">
              
                <div className="info-row">
                  <Text className="info-label">需求单位：</Text>
                  <Text className="info-value">{item.demandName || '-'}</Text>
                </div>
                <div className="info-row">
                  <Text className="info-label">金额：</Text>
                  <Text className="info-value">{(item.demandMoney || '0') + ' 元'}</Text>
                </div>
                <div className="info-row">
                  <Text className="info-label">备注：</Text>
                  <Text className="info-value">{item.demandDescription || '-'}</Text>
                </div>
              </div>
              
              <Button type="primary" className="detail-button">
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