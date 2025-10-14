import { ConfigProvider } from 'antd';
import { Outlet, useLocation } from 'umi';
import PageLayout from './layout';
export default function BasicLayout() {
  const location = useLocation();
  const currentPath = location.pathname;
  if(currentPath === '/login') {
    return <Outlet />;
  }
  return (
    <ConfigProvider >
          <PageLayout>
            <Outlet />
          </PageLayout>
    </ConfigProvider>
  );
}

