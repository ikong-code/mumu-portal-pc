import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Input, Select, Avatar, Row, Col, Statistic, Space, message, Modal, Upload, Spin } from 'antd';
import { UserOutlined, EditOutlined, LockOutlined, LogoutOutlined, UploadOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import axios from '@/utils/request';
import './index.less';

const { Option } = Select;

interface UserInfo {
  userId: string;
  userName: string;
  nickName: string;
  userType: string;
  email: string;
  phonenumber: string;
  sex: string;
  status: string;
  loginIp: string;
  loginDate: string;
  aduitStatus: string;
  aduitTime: string;
  aduitName: string;
  aduitIdcard: string;
  aduitPositions: string;
  aduitUnit: string;
  aduitTitle: string;
  aduitWebsite: string;
}

const PersonalAccount: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [form] = Form.useForm();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    form.validateFields().then(() => {
      message.success('保存成功');
      setIsEditing(false);
    });
  };

  const handleCancel = () => {
    Modal.confirm({
      title: '确认取消',
      content: '确定要取消编辑吗？未保存的修改将丢失。',
      onOk() {
        setIsEditing(false);
        // 恢复原始数据
        if (userInfo) {
          let gender = 'male';
          if (userInfo.sex === '1') {
            gender = 'male';
          } else if (userInfo.sex === '2') {
            gender = 'female';
          }
          form.setFieldsValue({
            account: userInfo.userName || '',
            nickname: userInfo.nickName || '',
            userType: userInfo.userType || '',
            email: userInfo.email || '',
            phone: userInfo.phonenumber || '',
            gender: gender,
          });
        }
      },
    });
  };

  const handleChangePassword = () => {
    message.info('修改密码功能待开发');
  };

  const handleLogout = () => {
    message.info('退出登录功能待开发');
  };

  // 获取用户信息
  const fetchUserInfo = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/system/front/user/getUserInfo', {
        baseURL: 'http://47.99.151.88:10105'
      });
      
      if (response.data.code === 200 && response.data.data) {
        const data = response.data.data;
        setUserInfo(data);
        
        // 将性别转换为表单需要的格式
        // 根据常见编码：sex: "0" 表示未知/未设置, "1" 表示男, "2" 表示女
        // 如果 sex 为 "0" 或其他值，默认显示为"男"
        let gender = 'male';
        if (data.sex === '1') {
          gender = 'male';
        } else if (data.sex === '2') {
          gender = 'female';
        } else {
          // sex 为 "0" 或其他值时，默认显示为"男"
          gender = 'male';
        }
        
        // 设置表单初始值
        form.setFieldsValue({
          account: data.userName || '',
          nickname: data.nickName || '',
          userType: data.userType || '',
          email: data.email || '',
          phone: data.phonenumber || '',
          gender: gender,
        });
      } else {
        message.error(response.data.msg || '获取用户信息失败');
      }
    } catch (error: any) {
      console.error('获取用户信息失败:', error);
      message.error('获取用户信息失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // 根据审核状态显示标题
  const getAuditStatusText = () => {
    if (!userInfo) return '用户信息';
    if (userInfo.aduitStatus === '1') {
      return '用户信息 (审核通过)';
    } else if (userInfo.aduitStatus === '0') {
      return '用户信息 (待审核)';
    } else {
      return '用户信息 (审核未通过)';
    }
  };

  // 性别转换函数
  const getGenderText = (sex: string) => {
    if (sex === '1') return '男';
    if (sex === '2') return '女';
    return '未知';
  };

  if (loading && !userInfo) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="personal-account">
      <div className="page-header">
        <h2>个人账户</h2>
        {!isEditing ? (
          <Space>
            <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>
              编辑信息
            </Button>
            <Button icon={<LockOutlined />} onClick={handleChangePassword}>
              修改密码
            </Button>
            <Button danger icon={<LogoutOutlined />} onClick={handleLogout}>
              退出登录
            </Button>
          </Space>
        ) : (
          <Space>
            <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
              保存
            </Button>
            <Button icon={<CloseOutlined />} onClick={handleCancel}>
              取消
            </Button>
          </Space>
        )}
      </div>

      {/* 用户信息 */}
      <Card title={getAuditStatusText()} style={{ marginBottom: 20 }}>
        <Row gutter={24}>
          <Col span={6}>
            <div className="user-avatar">
              {isEditing ? (
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={() => false}
                >
                  <Avatar size={80} icon={<UserOutlined />} />
                  <div className="upload-overlay">
                    <UploadOutlined />
                    <div>点击上传</div>
                  </div>
                </Upload>
              ) : (
                <Avatar size={80} icon={<UserOutlined />} />
              )}
              <div className="user-email">{userInfo?.email || userInfo?.userName || ''}</div>
            </div>
          </Col>
          <Col span={18}>
            <Form
              form={form}
              layout="vertical"
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="用户账号" name="account">
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="用户昵称" name="nickname">
                    <Input disabled={!isEditing} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="用户类型" name="userType">
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="用户邮箱" name="email">
                    <Input disabled={!isEditing} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="手机号码" name="phone">
                    <Input disabled={!isEditing} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="用户性别" name="gender">
                    <Select disabled={!isEditing}>
                      <Option value="male">男</Option>
                      <Option value="female">女</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>

      {/* 审核信息 - 仅在非编辑模式下显示 */}
      {!isEditing && userInfo && (
        <Card title="审核信息" style={{ marginBottom: 20 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="真实姓名">
                <Input value={userInfo.aduitName || '暂无'} disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="身份证号">
                <Input value={userInfo.aduitIdcard || '暂无'} disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="职位">
                <Input value={userInfo.aduitPositions || '暂无'} disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="所在单位">
                <Input value={userInfo.aduitUnit || '暂无'} disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="职称">
                <Input value={userInfo.aduitTitle || '暂无'} disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="个人网站">
                <Input value={userInfo.aduitWebsite || '暂无'} disabled />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      )}

      {/* 发票信息 */}
      <Card title="发票信息" style={{ marginBottom: 20 }}>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            companyName: '暂无',
            taxNumber: '暂无',
            contactPhone: '暂无',
            companyAddress: '暂无',
            bankAccount: '暂无',
            bankName: '暂无',
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="公司名称" name="companyName">
                <Input disabled={!isEditing} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="公司税号" name="taxNumber">
                <Input disabled={!isEditing} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="联系方式" name="contactPhone">
                <Input disabled={!isEditing} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="公司地址" name="companyAddress">
                <Input disabled={!isEditing} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="银行账号" name="bankAccount">
                <Input disabled={!isEditing} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="开户银行" name="bankName">
                <Input disabled={!isEditing} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* 资源用量 - 仅在非编辑模式下显示 */}
      {!isEditing && (
        <Card title="资源用量">
          <Row gutter={16}>
            <Col span={8}>
              <Statistic title="总积分" value={500} />
            </Col>
            <Col span={8}>
              <Statistic title="可用积分" value={500} />
            </Col>
            <Col span={8}>
              <Statistic title="已用积分" value={0} />
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
};

export default PersonalAccount;
