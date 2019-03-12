import { post, postStream } from './common';

const EnterpriseListApis = {
  /**
   * 获取企业列表
   * @param data => pageNum, pageSize, keyWords, searchType
   */
  getList: data => post('/enterprise/getEnterpriseList.do', '', data),

  /**
   * 删除单条数据
   * @param data => enterpriseId
   */
  deleteSingleData: data => post('/enterprise/deleteEnterprise.do', '', data),

  /**
   * 删除多条数据
   * @param data => type: array or object
   * @param sameKey => when data is array => id
   */
  deleteMulData: (data, sameKey) => postStream('/enterprise/deleteEnterpriseBatch.do', '', data, sameKey),

  /**
   * 获取详情页数据
   * @param data => enterpriseId
   */
  getDetailData: data => post('/enterprise/getEnterpriseById.do', '', data),

  /**
   * 修改详情页的username
   * @param data => enterpriseId, ...rest
   */
  updateUsernameOfDetail: data => post('/enterprise/modifyEnterprise.do', '', data),
};

export default EnterpriseListApis;
