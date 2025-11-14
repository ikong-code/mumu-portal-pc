import axios, { InternalAxiosRequestConfig } from 'axios';

// 配置axios默认请求拦截器：自动添加Authorization header
axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 从localStorage中获取access_token
    const accessToken = localStorage.getItem('access_token');
    
    // 如果存在token，添加到请求头
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 配置axios默认响应拦截器（可选，用于统一处理错误）
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 可以在这里处理401等认证错误
    if (error.response?.status === 401) {
      // token过期或无效，可以跳转到登录页
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 导出axios实例（保持向后兼容）
export default axios;

