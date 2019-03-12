import { post } from './common';

export const RecruitmentTypeApis = {
  /**
   * 获取列表
   * @param data => pageNum，pageSize
   */
  getList: data => post('/profession/getProfessionList.do', '', data),

  /**
   * 删除单条数据
   * @param data
   */
  deleteSingleData: data => post('/profession/deleteProfession.do', '', data),

  /**
   * 删除多条数据
   * @param data
   * @param sameKey
   */
  deleteMulData: (data, sameKey) => postStream('/profession/deleteProfessionBatch.do', '', data, sameKey),

  /**
   * 添加招聘类型
   * @param data =>
   * @param professionName 职业名称
   * @param recruitType    招聘类型：1实习,2兼职
   * @param sortIndex      排序
   * @param professionIcon 图标
   */
  addData: data => ('/profession/addProfession.do', '', data),

  /**
   * 编辑
   * @param data
   * @param professionId   招聘类型id
   * @param professionName 职业名称
   * @param recruitType    招聘类型：1实习,2兼职
   * @param sortIndex      排序
   * @param professionIcon 图标
   */
  update: data => post('/profession/modifyProfession.do', '', data),
};

export default RecruitmentTypeApis;
