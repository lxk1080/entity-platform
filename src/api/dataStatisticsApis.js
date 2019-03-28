import { post } from './common';

const DataStatisticsApis = {
  /**
   * @description 获取所有的统计数据
   * @param data
   */
  getStatisticData: data => post('/platform/platformCount.do', '', data),

  updateData: data => post('/platform/countPositionList.do', '', data),
};

export default DataStatisticsApis;

/***
 统计岗位发布柱状图
 接口：platform/countPositionList
 参数：
 dateType：时间类型1本周，2本月，3本年
 recruitType：岗位类型：1实习 3兼职
 */
