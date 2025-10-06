import { ConfigProvider } from 'antd';
import { Outlet } from 'umi';
import PageLayout from './layout';
export default function BasicLayout() {
  return (
    <ConfigProvider >
          <PageLayout>
            <Outlet />
          </PageLayout>
    </ConfigProvider>
  );
}

