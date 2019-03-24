import { post, postStream } from './common';

const AccountListApis = {
  /**
   * 获取管理员列表
   * @param data =>
   * @param pageNum
   * @param pageSize
   */
  getList: data => post('/admin/getAdminList.do', '', data),

  /**
   * 获取角色列表
   * @param data
   */
  getRoleList: data => post('/admin/getRoleList.do', '', data),

  /**
   * 删除单条数据
   * @param data => userId
   */
  deleteSingleData: data => post('/admin/deleteAdmin.do', '', data),

  /**
   * 删除多条数据
   * @param data => type: array or object
   * @param sameKey => when data is array
   */
  deleteMulData: (data, sameKey) => postStream('/admin/deleteAdminBatch.do', '', data, sameKey),

  /**
   * 添加管理员
   */
  addData: data => post('/admin/addAdmin.do', '', data),

  /**
   * 编辑管理员
   */
  updateData: data => post('/admin/modifyAdmin.do', '', data),

  /**
   * 获取详情页数据
   * @param data => userId
   */
  getDetailData: data => post('/admin/getAdminById.do', '', data),

  /**
   * 锁定和冻结
   * @param data
   */
  updateActiveds: (data, sameKey, others) => postStream('/admin/modifyBatch.do', '', data, sameKey, others),
};

export default AccountListApis;
