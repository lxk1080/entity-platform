import { post } from './common';

const OperationLogApis = {
  /**
   * 获取log列表
   * @param data
   */
  getList: data => post('/platform/getLogList.do', '', data),

  /**
   * 删除单条数据
   * @param data => activityId
   */
  deleteSingleData: data => post('/platform/deleteLog.do', '', data),
};

export default OperationLogApis;
