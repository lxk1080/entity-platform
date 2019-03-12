import { post, postStream } from './common';

const ActivityListApis = {
  /**
   * 获取活动列表
   * pageNum，pageSize
   * activityTitle：活动标题
   */
  getList: data => post('/activity/getActivityList.do', '', data),

  /**
   * 删除单条数据
   * @param data => activityId
   */
  deleteSingleData: data => post('/activity/deleteActivity.do', '', data),

  /**
   * 删除多条数据
   * @param data => type: array or object
   * @param sameKey => when data is array => id
   */
  deleteMulData: (data, sameKey) => postStream('/activity/deleteActivityBatch.do', '', data, sameKey),

  /**
   * 添加活动
   * @param activityTitle 活动标题
   * @param activityUrl   活动连接
   * @param activated     是否显示：1显示，2不显示
   */
  addData: data => post('/activity/addActivity.do', '', data),

  /**
   * 修改活动
   * @param activityId 活动Id
   * @param activityTitle 活动标题
   * @param activityUrl   活动连接
   * @param activated     是否显示：1显示，2不显示
   */
  update: data => post('/activity/modifyActivity.do', '', data),

  /**
   * 获取详情页数据
   * @param data => activityId
   */
  getDetailData: data => post('/activity/getActivityById.do', '', data),
};

export default ActivityListApis;
