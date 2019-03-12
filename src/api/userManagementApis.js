import { post, postStream } from './common';

const UserListApis = {
  /**
   * 获取用户列表
   * @param data =>
   * @param pageNum
   * @param pageSize
   * @param searchType 筛选类型：1微信昵称，2真实姓名，3学校，4手机号
   * @param keyWords   筛选关键字
   */
  getList: data => post('/user/getUserList.do', '', data),

  /**
   * 删除单条数据
   * @param data => userId
   */
  deleteSingleData: data => post('/user/deleteUser.do', '', data),

  /**
   * 删除多条数据
   * @param data => type: array or object
   * @param sameKey => when data is array
   */
  deleteMulData: (data, sameKey) => postStream('/user/deleteUserBatch.do', '', data, sameKey),

  /**
   * 获取详情页数据
   * @param data => userId
   */
  getDetailData: data => post('/user/getUserDetail.do', '', data),
};

export default UserListApis;
