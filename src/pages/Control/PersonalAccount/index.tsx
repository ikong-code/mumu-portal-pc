import React, { useState } from 'react';
import { Button, Card, Form, Input, Select, Avatar, Row, Col, Statistic, Space, message, Modal, Upload } from 'antd';
import { UserOutlined, EditOutlined, LockOutlined, LogoutOutlined, UploadOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import './index.less';

const { Option } = Select;

const PersonalAccount: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
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
        form.resetFields();
      },
    });
  };

  const handleChangePassword = () => {
    message.info('修改密码功能待开发');
  };

  const handleLogout = () => {
    message.info('退出登录功能待开发');
  };

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
      <Card title="用户信息 (审核通过)" style={{ marginBottom: 20 }}>
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
              <div className="user-email">wgxing0330@mumutech.co</div>
            </div>
          </Col>
          <Col span={18}>
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                account: 'wgxing0330@mumutech.co',
                nickname: 'wgxing0330@mumutech.co',
                userType: 'user',
                email: 'wgxing0330@mumutech.co',
                phone: '18768119526',
                gender: 'male',
              }}
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
      {!isEditing && (
        <Card title="审核信息" style={{ marginBottom: 20 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="真实姓名">
                <Input value="王涛" disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="身份证号">
                <Input value="330105199203301618" disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="职位">
                <Input value="暂无" disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="所在单位">
                <Input value="牧目科技有限责任公司" disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="职称">
                <Input value="CEO" disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="个人网站">
                <Input value="暂无" disabled />
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
