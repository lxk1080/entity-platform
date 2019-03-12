import { post, postStream } from './common';

const PackageManagementApis = {
  /**
   * 获取套餐列表
   */
  getList: data => post('/combinedMeal/getCombinedMealList.do', '', data),

  /**
   * 删除单条数据
   * @param data => combinedMealId
   */
  deleteSingleData: data => post('/combinedMeal/deleteCombinedMeal.do', '', data),

  /**
   * 删除多条数据
   * @param data => type: array or object
   * @param sameKey => when data is array => id
   */
  deleteMulData: (data, sameKey) => postStream('/combinedMeal/deleteCombinedMealBatch.do', '', data, sameKey),

  /**
   * 添加套餐
   */
  addData: data => post('/combinedMeal/addCombinedMeal.do', '', data),

  /**
   * 修改套餐
   */
  update: data => post('/combinedMeal/modifyCombinedMeal.do', '', data),

  /**
   * 获取详情页数据
   * @param data => combinedMealId
   */
  getDetailData: data => post('/combinedMeal/getCombinedMealById.do', '', data),
};

export default PackageManagementApis;
