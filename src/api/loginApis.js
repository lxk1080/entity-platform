import { post } from './common';

const LoginApis = {
  /**
   * 登录接口
   * @param data => username, password
   * @returns {*}
   */
  login: data => post('/admin/adminLogin.do', '', data),

  /**
   * 检查是否登录
   * @param data
   * @returns {*}
   */
  check: data => post('/admin/adminCheck.do', '', data),

  /**
   * 退出登录
   * @param data
   * @returns {*}
   */
  logout: data => post('/admin/adminLogout.do', '', data),
};

export default LoginApis;
