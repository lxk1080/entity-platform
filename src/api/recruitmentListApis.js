import { post } from './common';

export const RecruitmentListApis = {
  /**
   * 获取招聘列表
   * @param data =>
   * @param recruitType       招聘类型：1实习，2兼职
   * @param searchType        摘选类型：1发布人，2岗位标题，3招聘周期，4发布时间，5状态
   * @param keyWords          筛选关键字
   * @param registerStartTime 注册开始时间
   * @param registerEndTime   注册结束时间
   * @param recruitStartTime  发布开始时间
   * @param recruitEndTime    发布结束时间
   */
  getList: data => post('/position/getPositionList.do', '', data),

  /**
   * 删除单条数据
   * @param data => positionId
   */
  deleteSingleData: data => post('/position/deletePosition.do', '', data),

  /**
   * 删除多条数据
   * @param data => type: array or object
   * @param sameKey => when data is array
   */
  deleteMulData: (data, sameKey) => postStream('/position/deletePositionBatch.do', '', data, sameKey),

  /**
   * 开始暂停
   * @param data =>
   * @param recruitStatus 招聘状态：1开始，2已暂停，3已结束
   * @param positionId    职位Id
   */
  pause: data => post('/position/positionOperate.do', '', data),

  /**
   * 获取详情
   * @param data =>
   * @param positionId
   */
  getDetailData: data => post('/position/getPositionById.do', '', data),

  /**
   * 修改招聘信息
   * @param data => 除了第一个，其他的参数都可以为空
   * @param positionId          （int 非空） 招聘ID
   * @param recruitType         （int 非空） 招聘类型：1实习，2兼职
   * @param positionName        （String 非空） 岗位标题
   * @param recruitNum          （int 非空） 招聘人数
   * @param work                （String 非空） 工作内容
   * @param remuneration        （double 非空） 薪资
   * @param remunerationUnit    （String 非空） 薪资单位（周，天，小时，个，月，其他）
   * @param clearingType        （int 非空） 结算方式 实习/兼职:1月薪/月结，2日薪/日结
   * @param royaltyRate         （String 可选）提成说明
   * @param accommodation       （String 可选）福利说明
   * @param workDate            （String 非空）无指定日期/日期区间（'2019/03/02-2019/05/01'）
   * @param workTime            （String 非空）无指定时段/时间区间（'08:00-13:30'）
   * @param recruitCity         （String 非空）工作城市
   * @param isHealthCertificate （int 可选）是否需要健康证明：1需要，2不需要
   * @param genderRequire       （int 可选）性别要求：1男，2女，3不限
   * @param heightRequire       （String 可选）身高要求
   * @param educationRequire    （int 可选）学历要求:1高中，2大专，3本科，4硕士，5博士，6不限
   * @param contactType         （int 可选）其他联系方式：1微信 2QQ 3QQ群 4公众号 5无
   * @param contactNum          （String 可选）其他联系号码：1微信 2QQ 3QQ群 4公众号 5无
   * @param contactUser         （String 非空）联系人姓名
   * @param contactsMobile      （String 非空）联系人电话
   */
  modifyPosition: data => ('/position/modifyPosition.do', '', data),
};

export default RecruitmentListApis;
