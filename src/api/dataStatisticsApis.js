import { post } from './common';

const DataStatisticsApis = {
  /**
   * @description 获取所有的统计数据
   * @param data
   */
  getStatisticData: data => post('/platform/platformCount.do', '', data),

  /**
   * 获取岗位发布统计
   * @param data
   */
  updateDataForPosition: data => post('/platform/countPositionList.do', '', data),

  /**
   * 获取套餐列表
   * @param data
   */
  getMealList: data => post('/combinedMeal/getCombinedMealList.do', '', data),

  /**
   * 获取订单统计
   * @param data
   */
  updateDataForOrder: data => post('/platform/countOrderList.do', '', data),
};

export default DataStatisticsApis;

/***
 统计岗位发布柱状图
 接口：platform/countPositionList
 参数：
 dateType：时间类型1本周，2本月，3本年
 recruitType：岗位类型：1实习 3兼职
 */
