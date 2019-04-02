import { axiosInstance } from 'api/common';
import $store from '../../store';
import { SET_USER } from '../../store/mutation-types';

const loginCode = '99999';

// 拦截请求
axiosInstance.interceptors.request.use((req) => {
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
