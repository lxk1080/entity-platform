import Vue from 'vue';
import { Modal } from 'iview';
import { axiosInstance, ERR_OK } from 'api/common';
import LoginApis from 'api/loginApis';
import $store from 'store';
import { SET_USER } from 'store/mutation-types';

const loginCode = '1009';

axiosInstance.interceptors.request.use((req) => {
  if (req.url.includes('/adminCheck') || req.url.includes('/adminLogin')) {
    return req;
  }

  return LoginApis.check().then(res => {
    if (res.code === ERR_OK) {
      let count = 5;
      const timer = setInterval(function() {
        Modal.info({
          title: '登录已过期',
          content: `您的登录已过期，${count}s后将自动跳转到登录页面`,
        });

        count--;

        if (count === 0) {
          clearInterval(timer);

          if (sessionStorage.user) {
            sessionStorage.removeItem('user');
          }
          $store.commit(SET_USER, {});
          Vue.prototype.$router.push('/login');
        }
      }, 1000);

      return;
    }
    sessionStorage.user = JSON.stringify(res.result);
    $store.commit(SET_USER, res.result);
    return req;
  });
});

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
