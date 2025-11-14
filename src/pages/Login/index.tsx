import React, { useState, useEffect } from 'react';
import { Layout, Typography, Row, Col, Card, Button, Form, Input, Checkbox, message } from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  EyeInvisibleOutlined,
  EyeTwoTone,
  MailOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import axios from 'axios';
import loginLogo from '@/assets/images/logo.png';
import loginBg from '@/assets/images/login-bg.png';
import './index.less';

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [registerForm] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [sendingCode, setSendingCode] = useState(false);
  const [registerPhone, setRegisterPhone] = useState('');

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // 调用登录接口
      const response = await axios.post('/auth/frontUser/login', {
        client_id: 'default',
        grant_type: 'password',
        username: values.username,
        password: values.password,
      }, {
        baseURL: 'http://47.99.151.88:10105',
      });

      const { code, msg, data } = response.data;
      console.log(response.data, 'response.data');
      if (code === 200 && data) {
        // 保存 token 信息
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('token_expire_in', String(data.expire_in));
        localStorage.setItem('refresh_expire_in', String(data.refresh_expire_in));
        
        // 保存用户信息（app.tsx 会读取这个）
        localStorage.setItem('userInfo', JSON.stringify(data.user_info));
        
        // 保存其他登录信息
        localStorage.setItem('openid', data.openid || '');
        localStorage.setItem('scope', data.scope || '');
        localStorage.setItem('aduitStatus', data.aduitStatus || '');

        message.success(msg || '登录成功！');
        navigate('/home');
      } else {
        // 处理接口返回的错误，检查是否有字段级别的验证错误
        const errorData = response.data?.data;
        if (errorData?.validation_errors && Array.isArray(errorData.validation_errors)) {
          // 设置字段级别的错误信息
          const fieldErrors = errorData.validation_errors.map((err: any) => ({
            name: err.field,
            errors: [err.message || err.original_message],
          }));
          form.setFields(fieldErrors);
        } else {
          // 没有字段级错误，显示通用错误消息
          message.error(msg || '登录失败，请检查账号密码');
        }
      }
    } catch (error: any) {
      console.error('登录失败:', error);
      
      // 检查是否有响应数据中的验证错误
      const errorResponse = error?.response?.data;
      if (errorResponse?.data?.validation_errors && Array.isArray(errorResponse.data.validation_errors)) {
        // 设置字段级别的错误信息
        const fieldErrors = errorResponse.data.validation_errors.map((err: any) => ({
          name: err.field,
          errors: [err.message || err.original_message],
        }));
        form.setFields(fieldErrors);
      } else {
        // 没有字段级错误，显示通用错误消息
        const errorMsg = errorResponse?.msg || error?.message || '登录失败，请检查账号密码';
        message.error(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  // 倒计时效果
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown]);

  // 发送验证码
  const handleSendCode = async () => {
    try {

      // 获取所有表单字段值
      const phone = registerPhone?.trim();
      
      if (!phone) {
        message.error('请先输入手机号');
        // 触发手机号字段的验证，显示错误提示
        registerForm.validateFields(['phone']).catch(() => {});
        return;
      }
      
      // 验证手机号格式
      const phoneRegex = /^1[3-9]\d{9}$/;
      if (!phoneRegex.test(phone)) {
        message.error('请输入正确的手机号');
        registerForm.setFields([{
          name: 'phone',
          errors: ['请输入正确的手机号']
        }]);
        return;
      }

      setSendingCode(true);
      await axios.get('/api/app/v2/code', {
        params: {
          phone,
          code_type: 'register'
        },
        baseURL: 'http://47.99.151.88:10105',
      });
      
      message.success('验证码已发送');
      setCountdown(60);
    } catch (error: any) {
      console.error('发送验证码失败:', error);
      const errorMsg = error?.response?.data?.msg || error?.message || '发送验证码失败，请稍后重试';
      message.error(errorMsg);
    } finally {
      setSendingCode(false);
    }
  };

  // 注册提交
  const onRegisterFinish = async (values: any) => {
    setRegisterLoading(true);
    console.log(values, 'values');
    try {
      const response = await axios.post('/auth/frontUser/register', {
        email: values.email,
        nick_name: values.nick_name,
        password: values.password,
        phone: values.phone,
        smsCode: values.smsCode,
        user_type: 'front_user',
        username: values.username,
      }, {
        baseURL: 'http://47.99.151.88:10105',
      });

      const { code, msg } = response.data;
      if (code === 200) {
        message.success(msg || '注册成功！');
        // 注册成功后切换回登录表单
        setIsRegister(false);
        registerForm.resetFields();
        // 将注册的用户名填充到登录表单
        form.setFieldsValue({ username: values.username });
      } else {
        message.error(msg || '注册失败');
      }
    } catch (error: any) {
      console.error('注册失败:', error);
      
      // 处理注册接口的错误返回格式（detail数组）
      const errorResponse = error?.response?.data;
      if (errorResponse?.detail && Array.isArray(errorResponse.detail)) {
        // 将detail格式转换为字段错误
        const fieldErrors: any[] = [];
        errorResponse.detail.forEach((err: any) => {
          // detail格式: { loc: ["string", 0], msg: "string", type: "string" }
          // loc数组的第一个元素通常是字段名
          if (err.loc && Array.isArray(err.loc) && err.loc.length > 0) {
            const fieldName = err.loc[0];
            // 跳过非字符串字段名（如数组索引）
            if (typeof fieldName === 'string') {
              fieldErrors.push({
                name: fieldName,
                errors: [err.msg || '验证失败'],
              });
            }
          }
        });
        
        if (fieldErrors.length > 0) {
          registerForm.setFields(fieldErrors);
        } else {
          message.error(errorResponse.msg || '注册失败，请检查输入信息');
        }
      } else {
        const errorMsg = errorResponse?.msg || error?.message || '注册失败，请检查输入信息';
        message.error(errorMsg);
      }
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleRegister = () => {
    setIsRegister(true);
    registerForm.resetFields();
  };

  const handleBackToLogin = () => {
    setIsRegister(false);
    registerForm.resetFields();
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

                {/* 登录/注册表单 */}
                <Card className="login-card" bordered={false}>
                  {!isRegister ? (
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
                  ) : (
                    <Form
                      form={registerForm}
                      name="register"
                      onFinish={onRegisterFinish}
                      size="large"
                      layout="vertical"
                      className="login-form-register"
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
                        label="昵称"
                        name="nick_name"
                        rules={[{ required: true, message: '请输入昵称' }]}
                        className="form-item"
                      >
                        <Input
                          prefix={<UserOutlined className="input-icon" />}
                          placeholder="请输入昵称"
                          className="login-input"
                        />
                      </Form.Item>

                      <Form.Item
                        label="邮箱"
                        name="email"
                        rules={[
                          { required: true, message: '请输入邮箱' },
                          { type: 'email', message: '请输入正确的邮箱格式' }
                        ]}
                        className="form-item"
                      >
                        <Input
                          prefix={<MailOutlined className="input-icon" />}
                          placeholder="请输入邮箱"
                          className="login-input"
                        />
                      </Form.Item>

                      <Form.Item
                        label="手机号"
                        name="phone"
                        rules={[
                          { required: true, message: '请输入手机号' },
                          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
                        ]}
                        className="form-item"
                      >
                        <Input
                          prefix={<PhoneOutlined className="input-icon" />}
                          placeholder="请输入手机号"
                          className="login-input"
                          onChange={(e) => {
                            setRegisterPhone(e.target.value);
                          }}
                        />
                      </Form.Item>

                      <Form.Item
                        label="验证码"
                        name="smsCode"
                        rules={[{ required: true, message: '请输入验证码' }]}
                        className="form-item"
                      >
                          <Input
                            placeholder="请输入验证码"
                            style={{ flex: 1 }}
                            className='login-input-with-code'
                            addonAfter={
                              <Button
                                onClick={() => {
                                  handleSendCode();
                                }}
                                disabled={countdown > 0 || sendingCode}
                                loading={sendingCode}
                              >
                                {countdown > 0 ? `${countdown}秒后重发` : '发送验证码'}
                              </Button>
                            }
                          />
                         
                      </Form.Item>

                      <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                          { required: true, message: '请输入密码' },
                          { min: 6, message: '密码至少6位' }
                        ]}
                        className="form-item"
                      >
                        <Input.Password
                          prefix={<LockOutlined className="input-icon" />}
                          placeholder="请输入密码（至少6位）"
                          className="login-input"
                          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                      </Form.Item>

                      <Form.Item className="form-submit">
                        <Button
                          style={{ marginTop: 24 }}
                          type="primary"
                          htmlType="submit"
                          loading={registerLoading}
                          className="login-button"
                          block
                        >
                          注册
                        </Button>
                      </Form.Item>

                      <div className="register-link">
                        <Text className="register-text">
                          已有账号？
                        </Text>
                        <Button 
                          type="link" 
                          className="register-button"
                          onClick={handleBackToLogin}
                        >
                          立即登录
                        </Button>
                      </div>
                    </Form>
                  )}
                </Card>
              </div>
           </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Login;
