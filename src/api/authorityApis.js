import { post, postStream } from './common';

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
   * 获取详情页数据
   * @param data => roleId
   */
  getDetailData: data => post('/admin/getRoleById.do', '', data),

  /**
   * 锁定和冻结
   * @param data
   */
  updateActiveds: (data, sameKey, others) => postStream('/admin/modifyBatch.do', '', data, sameKey, others),
};

export default AuthorityApis;
