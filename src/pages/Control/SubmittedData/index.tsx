import React, { useState, useRef } from 'react';
import { Button, Card, Tag, message, Modal, Space } from 'antd';
import { ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import axios from 'axios';
import './index.less';

// 数据类型定义
export interface SubmitRecordItem {
  id: string;
  demandName?: string;
  submitTime?: string;
  datasetUrl?: string;
  auditStatus?: string;
  [key: string]: any;
}

export interface SubmitRecordListParams {
  pageNum?: number;
  pageSize?: number;
  auditStatus?: string;
}

// 审核状态枚举
const AUDIT_STATUS_OPTIONS = [
  { label: '待审核', value: '0' },
  { label: '已审核', value: '1' },
  { label: '审核失败', value: '2' },
];

// 审核状态标签映射
const getAuditStatusTag = (auditStatus: string) => {
  const statusMap: Record<string, { color: string; text: string }> = {
    '0': { color: 'processing', text: '待审核' },
    '1': { color: 'success', text: '已审核' },
    '2': { color: 'error', text: '审核失败' },
  };
  const config = statusMap[auditStatus] || { color: 'default', text: '未知' };
  return <Tag color={config.color}>{config.text}</Tag>;
};

const SubmittedData: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const actionRef = useRef<ActionType>();

  // 批量删除
  const handleBatchDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请至少选择一条记录');
      return;
    }

    Modal.confirm({
      title: '确认删除',
      content: `确定要删除选中的 ${selectedRowKeys.length} 条记录吗？`,
      onOk: async () => {
        try {
          // 这里需要根据实际接口调整删除接口
          // 假设是批量删除接口，需要传递id数组
          const response = await axios.delete('/system/submitRecord/batch', {
            baseURL: 'http://47.99.151.88:10105',
            data: {
              ids: selectedRowKeys,
            },
          });

          if (response.data.code === 200) {
            message.success('删除成功');
            setSelectedRowKeys([]);
            actionRef.current?.reload();
          } else {
            message.error(response.data.msg || '删除失败');
          }
        } catch (error: any) {
          console.error('批量删除失败:', error);
          const errorMsg = error.response?.data?.msg || error.message || '删除失败';
          message.error(errorMsg);
        }
      },
    });
  };

  const columns: ProColumns<SubmitRecordItem>[] = [
    {
      title: '需求名称',
      hideInSearch: true,
      dataIndex: 'demandName',
      key: 'demandName',
      width: 200,
      ellipsis: true,
    },
    {
      title: '提交时间',
      dataIndex: 'submitTime',
      key: 'submitTime',
      hideInSearch: true,
      width: 180,
      valueType: 'dateTime',
    },
    {
      title: '数据集URL',
      dataIndex: 'datasetUrl',
      key: 'datasetUrl',
      width: 300,
      ellipsis: true,
      hideInSearch: true,
      render: (_, record) => {
        const url = record.datasetUrl;
        return url ? (
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        ) : (
          '-'
        );
      },
    },
    {
      title: '审核状态',
      dataIndex: 'auditStatus',
      key: 'auditStatus',
      width: 120,
      valueType: 'select',
      valueEnum: {
        '0': { text: '待审核' },
        '1': { text: '已审核' },
        '2': { text: '审核失败' },
      },
      render: (_, record) => getAuditStatusTag(record.auditStatus || ''),
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      fixed: 'right',
      search: false,
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="link" 
            icon={<EyeOutlined />}
            onClick={() => {
              // 查看详情逻辑
              message.info('查看详情功能待实现');
            }}
          >
            查看
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="submitted-data">
      <div className="page-header">
        <h2>我的提交数据</h2>
      </div>
      
      <Card>
        <ProTable<SubmitRecordItem, SubmitRecordListParams>
          actionRef={actionRef}
          columns={columns}
          request={async (params) => {
            try {
              const response = await axios.get('/system/submitRecord/sumbit/user/list', {
                baseURL: 'http://47.99.151.88:10105',
                params: {
                  pageNum: params.current || 1,
                  pageSize: params.pageSize || 10,
                  auditStatus: params.auditStatus,
                },
              });

              const result = response.data;
              if (result.code === 200 && result.data) {
                const listData = result.data;
                return {
                  data: listData.rows || [],
                  success: true,
                  total: listData.total || 0,
                };
              } else {
                message.error(result.msg || '获取列表失败');
                return {
                  data: [],
                  success: false,
                  total: 0,
                };
              }
            } catch (error: any) {
              console.error('获取列表失败:', error);
              const errorMsg = error.response?.data?.msg || error.message || '获取列表失败';
              message.error(errorMsg);
              return {
                data: [],
                success: false,
                total: 0,
              };
            }
          }}
          rowKey="id"
          search={{
            labelWidth: 'auto',
            defaultCollapsed: false,
          }}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
          }}
          rowSelection={{
            selectedRowKeys,
            onChange: (keys) => {
              setSelectedRowKeys(keys);
            },
          }}
          toolBarRender={() => [
            <Button
              key="batchDelete"
              danger
              icon={<DeleteOutlined />}
              onClick={handleBatchDelete}
              disabled={selectedRowKeys.length === 0}
            >
              批量删除
            </Button>,
          ]}
        />
      </Card>
    </div>
  );
};

export default SubmittedData;
