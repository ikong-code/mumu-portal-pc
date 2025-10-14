import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Card, Button, Form, Input, Checkbox, message, Divider } from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  SafetyOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

const LoginConsole: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  const onLoginFinish = (values: any) => {
    console.log('Login values:', values);
    message.success('登录成功！');
  };

  const onRegisterFinish = (values: any) => {
    console.log('Register values:', values);
    message.success('注册成功！请查收邮箱验证邮件。');
  };

  const features = [
    {
      icon: <EnvironmentOutlined style={{ fontSize: '32px', color: '#50935a' }} />,
      title: '数据管理',
      description: '管理您的数据集，查看下载记录'
    },
    {
      icon: <SafetyOutlined style={{ fontSize: '32px', color: '#1890ff' }} />,
      title: '权限控制',
      description: '灵活的数据访问权限管理'
    },
    {
      icon: <MailOutlined style={{ fontSize: '32px', color: '#faad14' }} />,
      title: '消息通知',
      description: '及时获取平台重要通知'
    }
  ];

  return (
    <Content style={{ padding: '0 24px', background: 'white', minHeight: '100vh' }}>
      {/* Hero Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #50935a 0%, #73d13d 100%)',
        padding: '60px 0',
        textAlign: 'center',
        color: 'white',
        marginBottom: '60px'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <Title level={1} style={{ color: 'white', fontSize: '36px', marginBottom: '16px' }}>
            登录控制台
          </Title>
          <Paragraph style={{ 
            color: 'white', 
            fontSize: '18px', 
            opacity: 0.9 
          }}>
            登录您的账号，管理数据和享受更多服务
          </Paragraph>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <Row gutter={[48, 48]} align="middle">
          {/* Login/Register Form */}
          <Col xs={24} lg={12}>
            <Card style={{ borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <Title level={2} style={{ marginBottom: '8px' }}>
                  {isLogin ? '用户登录' : '用户注册'}
                </Title>
                <Text style={{ color: '#666' }}>
                  {isLogin ? '登录您的账号' : '创建新账号'}
                </Text>
              </div>

              {isLogin ? (
                <Form
                  form={loginForm}
                  name="login"
                  onFinish={onLoginFinish}
                  size="large"
                  layout="vertical"
                >
                  <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入用户名或邮箱' }]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="用户名或邮箱"
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="密码"
                    />
                  </Form.Item>

                  <Form.Item>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Checkbox>记住我</Checkbox>
                      <Button type="link" style={{ padding: 0 }}>
                        忘记密码？
                      </Button>
                    </div>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        width: '100%',
                        height: '48px',
                        background: '#50935a',
                        borderColor: '#50935a',
                        fontSize: '16px'
                      }}
                    >
                      登录
                    </Button>
                  </Form.Item>

                  <Divider>或</Divider>

                  <div style={{ textAlign: 'center' }}>
                    <Text style={{ color: '#666' }}>
                      还没有账号？
                    </Text>
                    <Button
                      type="link"
                      onClick={() => setIsLogin(false)}
                      style={{ padding: '0 8px' }}
                    >
                      立即注册
                    </Button>
                  </div>
                </Form>
              ) : (
                <Form
                  form={registerForm}
                  name="register"
                  onFinish={onRegisterFinish}
                  size="large"
                  layout="vertical"
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="firstName"
                        rules={[{ required: true, message: '请输入姓名' }]}
                      >
                        <Input placeholder="姓名" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="lastName"
                        rules={[{ required: true, message: '请输入姓氏' }]}
                      >
                        <Input placeholder="姓氏" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: '请输入邮箱' },
                      { type: 'email', message: '请输入有效的邮箱地址' }
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined />}
                      placeholder="邮箱地址"
                    />
                  </Form.Item>

                  <Form.Item
                    name="phone"
                    rules={[{ required: true, message: '请输入手机号' }]}
                  >
                    <Input
                      prefix={<PhoneOutlined />}
                      placeholder="手机号码"
                    />
                  </Form.Item>

                  <Form.Item
                    name="organization"
                    rules={[{ required: true, message: '请输入单位名称' }]}
                  >
                    <Input placeholder="单位名称" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: '请输入密码' },
                      { min: 6, message: '密码至少6位' }
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="密码"
                    />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                      { required: true, message: '请确认密码' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('两次输入的密码不一致'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="确认密码"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Checkbox>
                      我已阅读并同意
                      <Button type="link" style={{ padding: 0 }}>
                        《用户协议》
                      </Button>
                      和
                      <Button type="link" style={{ padding: 0 }}>
                        《隐私政策》
                      </Button>
                    </Checkbox>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        width: '100%',
                        height: '48px',
                        background: '#50935a',
                        borderColor: '#50935a',
                        fontSize: '16px'
                      }}
                    >
                      注册
                    </Button>
                  </Form.Item>

                  <Divider>或</Divider>

                  <div style={{ textAlign: 'center' }}>
                    <Text style={{ color: '#666' }}>
                      已有账号？
                    </Text>
                    <Button
                      type="link"
                      onClick={() => setIsLogin(true)}
                      style={{ padding: '0 8px' }}
                    >
                      立即登录
                    </Button>
                  </div>
                </Form>
              )}
            </Card>
          </Col>

          {/* Features */}
          <Col xs={24} lg={12}>
            <div>
              <Title level={2} style={{ marginBottom: '24px', textAlign: 'center' }}>
                平台功能
              </Title>
              <Paragraph style={{ 
                fontSize: '16px', 
                color: '#666', 
                textAlign: 'center',
                marginBottom: '40px'
              }}>
                登录后享受更多专业功能和服务
              </Paragraph>
              
              <Row gutter={[24, 24]}>
                {features.map((feature, index) => (
                  <Col xs={24} key={index}>
                    <Card 
                      hoverable
                      style={{ 
                        borderRadius: '12px',
                        border: '1px solid #f0f0f0'
                      }}
                      bodyStyle={{ padding: '24px' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ marginRight: '16px' }}>
                          {feature.icon}
                        </div>
                        <div>
                          <Title level={4} style={{ margin: '0 0 8px 0' }}>
                            {feature.title}
                          </Title>
                          <Text style={{ color: '#666' }}>
                            {feature.description}
                          </Text>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      </div>

      {/* Additional Info */}
      <div style={{ 
        background: '#f6ffed',
        padding: '60px 0',
        marginTop: '80px'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <Row gutter={[48, 32]}>
            <Col xs={24} lg={8}>
              <div style={{ textAlign: 'center' }}>
                <EnvironmentOutlined style={{ fontSize: '48px', color: '#50935a', marginBottom: '16px' }} />
                <Title level={4} style={{ marginBottom: '12px' }}>
                  数据安全
                </Title>
                <Paragraph style={{ color: '#666', margin: 0 }}>
                  采用企业级安全标准，保护您的数据安全
                </Paragraph>
              </div>
            </Col>
            <Col xs={24} lg={8}>
              <div style={{ textAlign: 'center' }}>
                <SafetyOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
                <Title level={4} style={{ marginBottom: '12px' }}>
                  专业服务
                </Title>
                <Paragraph style={{ color: '#666', margin: 0 }}>
                  专业的技术团队为您提供优质服务
                </Paragraph>
              </div>
            </Col>
            <Col xs={24} lg={8}>
              <div style={{ textAlign: 'center' }}>
                <MailOutlined style={{ fontSize: '48px', color: '#faad14', marginBottom: '16px' }} />
                <Title level={4} style={{ marginBottom: '12px' }}>
                  技术支持
                </Title>
                <Paragraph style={{ color: '#666', margin: 0 }}>
                  7×24小时技术支持，随时为您解决问题
                </Paragraph>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Content>
  );
};

export default LoginConsole;