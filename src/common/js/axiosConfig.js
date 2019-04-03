import { axiosInstance } from 'api/common';
import LoginApis from 'api/loginApis';
import $store from '../../store';
import { SET_USER } from '../../store/mutation-types';

const loginCode = '1009';

// 拦截请求
axiosInstance.interceptors.request.use((req) => {
  if (!req.url.includes('/adminCheck')) {
    LoginApis.check().then(res => {
      console.log(111, res);
    });
  }

  return req;
});

// 拦截响应
axiosInstance.interceptors.response.use((res) => {
  if (res.data.code === loginCode) {
    if (sessionStorage.user) {
      sessionStorage.removeItem('user');
    }
    $store.commit(SET_USER, {});
    this.$router.push('/login');
    return;
  }
  return res;
});
