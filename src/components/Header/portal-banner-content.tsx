import { Button } from 'antd';

export default () => {
    return  <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'baseline'
    }}>
    <div style={{ 
      color: 'white', 
      fontSize: '48px', 
      marginBottom: '24px',
      fontWeight: 'bold'
    }}>
      发展智慧农业 | 赋能乡村振兴
    </div>
    <div style={{ 
      color: 'white', 
      fontSize: '20px', 
      marginBottom: '40px',
      opacity: 0.9 
    }}>
      Advance Intelligent agriculture | Enable the revitalization of rural areas
    </div>
    <Button 
      type="primary" 
      size="large" 
      style={{ 
        background: '#fa8c16', 
        borderColor: '#fa8c16',
        height: '38px',
        padding: '0 32px',
        fontSize: '16px'
      }}
    >
      查看更多
    </Button>
  </div>
}