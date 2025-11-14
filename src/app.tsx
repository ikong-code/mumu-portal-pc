// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ userInfo: any }> {
  const userInfo = localStorage.getItem('userInfo');
  return {
    userInfo: userInfo ? JSON.parse(userInfo) : null
  };
}

// export const layout = () => {
//   return {
//     logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
//     menu: {
//           type: 'group',
//         },
//         fixSiderbar: true,
//     layout: 'top',
//     splitMenus: true,
//   };
// };


// https://umijs.org/docs/api/runtime-config

import { matchRoutes, defineApp } from '@umijs/max';

import { message } from 'antd';

// 导入request配置，确保axios拦截器在应用启动时生效
import '@/utils/request';

// antd message 提示限制 1 个
message.config({
  duration: 2,
  maxCount: 1,
});



export default defineApp({
  // 监听路由变化，修改页面标题
  onRouteChange({ location, clientRoutes }) {
    const { pathname } = location;
    console.log(pathname, 'pathname')
    const route: any = matchRoutes(clientRoutes, pathname)?.pop()?.route;
    console.log(route, pathname, 'pathname')
   
  },
  async render(oldRender) {
    // 可以在这里做一些前置操作
    oldRender();
  },
  // 配置请求拦截器，自动添加JWT token
  request: {
    // 请求拦截器
    requestInterceptors: [
      (config: any) => {
        // 从localStorage中获取access_token
        const accessToken = localStorage.getItem('access_token');
        
        // 如果存在token，添加到请求头
        if (accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        
        return config;
      },
    ],
    // 响应拦截器（可选）
    responseInterceptors: [
      (response: any) => {
        // 可以在这里统一处理响应
        return response;
      },
      (error: any) => {
        // 处理401等认证错误
        if (error.response?.status === 401) {
          // token过期或无效，可以跳转到登录页
          // window.location.href = '/login';
        }
        return Promise.reject(error);
      },
    ],
  },
});