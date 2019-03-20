import { post } from './common';

const DataStatisticsApis = {
  /**
   * @description 获取所有的统计数据
   * @param data
   */
  getStatisticData: data => post('/platform/platformCount.do', '', data),
};

export default DataStatisticsApis;
