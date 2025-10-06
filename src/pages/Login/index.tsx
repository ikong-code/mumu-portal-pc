import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Card, Button, Form, Input, Checkbox, message } from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  EyeInvisibleOutlined,
  EyeTwoTone
} from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import loginLogo from '@/assets/images/login-logo.jpg';
import loginBg from '@/assets/images/loginBg.jpg';
import './index.less';

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    // setLoading(true);
      navigate('/home');
    //   try {
    //   console.log('Login values:', values);
    //   // 模拟登录请求
    //   await new Promise(resolve => setTimeout(resolve, 1000));
    //   message.success('登录成功！');
    //   navigate('/home');
    // } catch (error) {
    //   message.error('登录失败，请检查账号密码');
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleRegister = () => {
    navigate('/login-console');
  };

  const handleForgotPassword = () => {
    message.info('请联系管理员重置密码');
  };

  return (
    <Layout className="login-layout">
      <Content className="login-content">
        <div className="login-row">
          {/* 左侧背景区域 */}
            <div className="login-bg">
              <img src={loginBg} width={'100%'} height={'100%'} alt="login-logo" />
            </div>

          {/* 右侧登录表单区域 */}
           <div className="login-form-col">
            <div className="login-form-container">
                {/* Logo和标题 */}
                <div className="login-header">
                  <div className="logo-section">
                    <img 
                      src={loginLogo}
                      alt="DAAI Logo" 
                      className="logo-image"
                    />
                  </div>
                </div>

                {/* 登录表单 */}
                <Card className="login-card" bordered={false}>
                  <Form
                    form={form}
                    name="login"
                    onFinish={onFinish}
                    size="large"
                    layout="vertical"
                    className="login-form"
                  >
                    <Form.Item
                      label="账号"
                      name="username"
                      rules={[{ required: true, message: '请输入账号' }]}
                      className="form-item"
                    >
                      <Input
                        prefix={<UserOutlined className="input-icon" />}
                        placeholder="请输入账号"
                        className="login-input"
                      />
                    </Form.Item>

                    <Form.Item
                      label="密码"
                      name="password"
                      rules={[{ required: true, message: '请输入密码' }]}
                      className="form-item"
                    >
                      <Input.Password
                        prefix={<LockOutlined className="input-icon" />}
                        placeholder="请输入密码"
                        className="login-input"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                      />
                    </Form.Item>

                    <Form.Item className="form-options">
                      <div className="options-row">
                        <Checkbox className="auto-login">自动登录</Checkbox>
                        <Button 
                          type="link" 
                          className="forgot-password"
                          onClick={handleForgotPassword}
                        >
                          忘记密码
                        </Button>
                      </div>
                    </Form.Item>

                    <Form.Item className="form-submit">
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="login-button"
                        block
                      >
                        登录
                      </Button>
                    </Form.Item>

                    <div className="register-link">
                      <Text className="register-text">
                        还没有账号？
                      </Text>
                      <Button 
                        type="link" 
                        className="register-button"
                        onClick={handleRegister}
                      >
                        立即注册
                      </Button>
                    </div>
                  </Form>
                </Card>
              </div>
           </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Login;
