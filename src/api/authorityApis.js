import { post } from './common';

const AuthorityApis = {
  /**
   * 获取角色列表
   * @param data
   */
  getList: data => post('/admin/getRoleList.do', '', data),

  /**
   * 获取权限列表
   * @param data
   */
  getAuthorityList: data => post('/admin/getAuthorityList.do', '', data),

  /**
   * 修改权限
   */
  updateAuthority: data => post('/platform/modifyRole.do', '', data),
};

export default AuthorityApis;
