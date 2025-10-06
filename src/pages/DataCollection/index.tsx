import React from 'react';
import { Layout, Typography, Button } from 'antd';
import './index.less';

import DEMO_IMG from '@/assets/images/demo-img1.jpg';

const { Title, Text } = Typography;
const { Content } = Layout;

// 数据收集项目接口
interface DataCollectionItem {
  id: number;
  title: string;
  demandUnit: string;
  amount: string;
  remarks: string;
}

// 模拟数据
const dataCollectionItems: DataCollectionItem[] = [
  {
    id: 1,
    title: "浙江大学—生物工程与食品科学学院",
    demandUnit: "牧目智能科技(杭州)有限责任公司",
    amount: "2000元",
    remarks: "征集不同生长期水稻田块的无人机俯视RGB影像3000张及其产量数据,覆盖分蘖期、抽穗期、成熟期的100个水稻田块的俯视角度影像。每张影像需标注对应田块的小区编号及种植管理方式信息,并附带其实际产量数据(精度:0.1kg/m2),地面分辨率需达4.3 mm/pixel."
  },
  {
    id: 2,
    title: "浙江大学—生物工程与食品科学学院",
    demandUnit: "牧目智能科技(杭州)有限责任公司",
    amount: "2000元",
    remarks: "征集不同生长期水稻田块的无人机俯视RGB影像3000张及其产量数据,覆盖分蘖期、抽穗期、成熟期的100个水稻田块的俯视角度影像。每张影像需标注对应田块的小区编号及种植管理方式信息,并附带其实际产量数据(精度:0.1kg/m2),地面分辨率需达4.3 mm/pixel."
  }
];

const DataCollection: React.FC = () => {
  return (
    <Content className="data-collection-container">
      <div className="data-collection-list">
        {dataCollectionItems.map((item) => (
          <div key={item.id} className="data-collection-item">
            {/* 左侧图片区域 - 50%宽度 */}
            <div className="item-image-section">
              <div className="image-background">
                <img src={DEMO_IMG} width={'100%'} height={'100%'} />
              </div>
            </div>
            
            {/* 右侧文字介绍区域 - 50%宽度，36px内边距 */}
            <div className="item-content-section">
              <Title level={4} className="item-title">{item.title}</Title>
              
              <div className="item-info">
                <div className="info-row">
                  <Text className="info-label">需求单位：</Text>
                  <Text className="info-value">{item.demandUnit}</Text>
                </div>
                
                <div className="info-row">
                  <Text className="info-label">金额：</Text>
                  <Text className="info-value">{item.amount}</Text>
                </div>
                
                <div className="info-row">
                  <Text className="info-label">备注：</Text>
                  <Text className="info-value">{item.remarks}</Text>
                </div>
              </div>
              
              <Button type="primary" className="detail-button">
                了解详情
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Content>
  );
};

export default DataCollection;