import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: false,
  scripts: [
    'https://webapi.amap.com/maps?v=2.0&key=464be0670989de4cf98176c597fbf4b1'
  ],
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '登录',
      path: '/login',
      component: './Login',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '平台介绍',
      path: '/platform-intro',
      component: './PlatformIntro',
    },
    {
      name: '数据汇交',
      path: '/data-exchange',
      component: './DataExchange',
    },
    {
      name: '数据征集',
      path: '/data-collection',
      component: './DataCollection',
    },
    {
      name: '使用说明',
      path: '/usage-guide',
      component: './UsageGuide',
    },
    {
      name: '登录控制台',
      path: '/login-console',
      component: './LoginConsole',
    },
  ],
  npmClient: 'npm',
});
