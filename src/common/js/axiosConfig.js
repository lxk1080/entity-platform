import $store from 'store';
import LoginApis from 'api/loginApis';
import { axiosInstance, ERR_OK } from 'api/common';
import { SET_USER } from 'store/mutation-types';
import { fireEvent } from 'common/js/tools';

const loginCode = '1009';

axiosInstance.interceptors.request.use((req) => {
  const ignoreUrls = ['/admin/adminCheck.do', '/admin/adminLogin.do', '/admin/adminLogout.do'];

  if (ignoreUrls.includes(req.url)) return req;

  // 每次请求之前检查session是否过期，如果过期则重新登录
  return LoginApis.check().then(res => {
    if (res.code !== ERR_OK) {
      fireEvent('toLogin', null);
      return;
    }

    sessionStorage.user = JSON.stringify(res.result);
    $store.commit(SET_USER, res.result);
    return req;
  });
});

axiosInstance.interceptors.response.use((res) => {
  if (res.data.code === loginCode) {
    fireEvent('toLogin', null);
    return;
  }

  return res;
});
