import axios from 'axios';
import Qs from 'qs';
import { uri } from '../common/js/config';

const callback = res => {
  if (res.status === 200) {
    console.log(res);
    return Promise.resolve(res.data);
  }
};

// 获取企业列表
export const getEnterPriseList = ({pageNum, pageSize, keyWords, searchType}) => {
  const url = `${uri}/enterprise/getEnterpriseList.do`;

  const data = Qs.stringify({
    pageNum,
    pageSize,
    keyWords,
    searchType,
  });

  return axios.post(url, data).then(callback);
};

// 删除单条数据
export const deleteSingleData = (enterpriseId) => {
  const url = `${uri}/enterprise/deleteEnterprise.do`;
  return axios.post(url, Qs.stringify({ enterpriseId })).then(callback);
};

// 删除多条数据
export const deleteMulData = (ids) => {
  const url = `${uri}/enterprise/deleteEnterpriseBatch.do`;
  const params = new URLSearchParams();
  ids.map(id => params.append('ids', id));

  return axios.post(url, params).then(callback);
};

// 获取详情页数据
export const getDetailData = (enterpriseId) => {
  const url = `${uri}/enterprise/getEnterpriseById.do`;
  return axios.post(url, Qs.stringify({ enterpriseId })).then(callback);
};

// 修改详情页的username
export const updateUsernameOfDetail = ({enterpriseId, ...rest}) => {
  const url = `${uri}/enterprise/modifyEnterprise.do`;
  return axios.post(url, Qs.stringify({ enterpriseId, ...rest })).then(callback);
};
