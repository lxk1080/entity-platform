import { post } from './common';

const LoginApis = {
  /**
   * 登录接口
   * @param data => username, password
   * @returns {*}
   */
  login: data => post('/admin/adminLogin.do', '', data),
};

export default LoginApis;
