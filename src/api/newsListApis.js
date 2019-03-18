import { post, postStream } from './common';

const NewsListApis = {
  /**
   * 获取新闻列表
   * @param pageNum       当前页码
   * @param pageSize      当前页码显示条数
   * @param newsTitle     新闻标题
   * @param releaseStatus 新闻发布状态
   * @param createdStartDate   新闻发布时间起始区间
   * @param createdEndDate   新闻发布时间结束区间
   */
  getList: data => post('/news/getNewsList.do', '', data),

  /**
   * 删除单条数据
   * @param data => newsId
   */
  deleteSingleData: data => post('/news/deleteNews.do', '', data),

  /**
   * 删除多条数据
   * @param data => type: array or object
   * @param sameKey => when data is array => id
   */
  deleteMulData: (data, sameKey) => postStream('/news/deleteNewsBatch.do', '', data, sameKey),

  /**
   * 添加新闻
   * @param data
   * @param newsTitle     新闻标题
   * @param releaseStatus 新闻发布状态
   * @param newsContent   新闻内容
   * @param adminId       管理员Id
   */
  addData: data => post('/news/addNews.do', '', data),

  /**
   * 编辑新闻
   * @param data
   * @param newsId        新闻ID
   * @param newsTitle     新闻标题
   * @param releaseStatus 新闻发布状态
   * @param newsContent   新闻内容
   * @param adminId       管理员Id
   */
  updateData: data => post('/news/modifyNews.do', '', data),

  /**
   * 获取详情页数据
   * @param data => newsId
   */
  getDetailData: data => post('/news/getNewsById.do', '', data),
};

export default NewsListApis;
