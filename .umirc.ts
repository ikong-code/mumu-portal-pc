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
      routes: [
        {
          path: '/home',
          component: './Home/index',
        },
        {
          path: '/home/news',
          component: './Home/News/List',
        },
        {
          path: '/home/news/:id',
          component: './Home/News/Detail',
        }
      ],
    },
    {
      name: '平台介绍',
      path: '/platform-intro',
      component: './PlatformIntro',
    },
    {
      name: '数据汇交',
      path: '/data-exchange',
      routes: [
        {
          path: '/data-exchange',
          component: './DataExchange/index',
        },
        {
          path: '/data-exchange/detail',
          component: './DataExchange/Detail',
        },
      ],
    },
    {
      name: '数据征集',
      path: '/data-collection',
      routes: [
        {
          path: '/data-collection',
          component: './DataCollection/index',
        },
        {
          path: '/data-collection/detail',
          component: './DataCollection/Detail',
        },
      ],
    },
    {
      name: '使用说明',
      path: '/usage-guide',
      routes: [
        {
          path: '/usage-guide',
          component: './UsageGuide',
        },
        {
          path: '/usage-guide/detail',
          component: './UsageGuide/Detail',
        },
      ],
    },
    {
      name: '登录控制台',
      path: '/login-console',
      component: './LoginConsole',
    },
    {
      name: '个人中心',
      path: '/control',
      component: './Control',
      routes: [
        {
          path: '/control',
          redirect: '/control/personal-account',
        },
        {
          name: '我的云盘',
          path: '/control/cloud-drive',
          component: './Control/CloudDrive',
        },
        {
          name: '我的标注任务',
          path: '/control/annotation-tasks',
          component: './Control/AnnotationTasks',
        },
        {
          name: '我的数据集',
          path: '/control/datasets',
          component: './Control/Datasets',
        },
        {
          name: '我的数据需求',
          path: '/control/data-requirements',
          component: './Control/DataRequirements',
        },
        {
          name: '我的提交数据',
          path: '/control/submitted-data',
          component: './Control/SubmittedData',
        },
        {
          name: '个人账户',
          path: '/control/personal-account',
          component: './Control/PersonalAccount',
        },
      ],
    },
  ],
  npmClient: 'npm',
});
