import axios from 'axios';
import Qs from 'qs';
import Cookie from 'js-cookie';

export const url = 'https://ningbo.hanchengvip.com/essence-server';
// export const url = 'http://192.168.1.102:8080/essence-server';
// export const url = 'http://192.168.1.107:8080/essence-server';
// export const url = 'http://itbub9.natappfree.cc/essence-server';

export const ERR_OK = '0';

const callback = res => {
  if (res.status === 200) {
    console.log(res);
    return Promise.resolve(res.data);
  }
};

const composeUrl = function(url, qs) {
  let result = '';

  if (url[0] !== '/') {
    result += '/';
  }

  result += url;

  if (qs && typeof qs === 'object' && Object.keys(qs).length !== 0) {
    result += `?${Qs.stringify(qs)}`;
  }

  return result;
};

const getHeaders = function(contentType = 'application/json', cacheControl = 'no-cache') {
  const headers = {
    'Response-Language': 'zh',
    'Cache-Control': cacheControl,
  };

  if (contentType) {
    headers['Content-Type'] = contentType;
  }

  const token = Cookie.get('token');

  if (token) {
    headers['Authorization'] = token;
  }

  return headers;
};

export const axiosInstance = axios.create({
  baseURL: url,
  timeout: 10000,
  withCredentials: true,
  headers: getHeaders('application/x-www-form-urlencoded'),
});

export const read = function(url, qs = {}) {
  return axiosInstance.get(url, { params: qs }).then(callback);
};

export const post = function(url, qs, data = {}) {
  return axiosInstance.post(url, Qs.stringify(data), { params: qs }).then(callback);
};

export const postStream = function(url, qs, data = [], sameKey, others = {}) {
  const stream = new URLSearchParams();
  const isArr = Array.isArray(data);

  for (let [key, value] of Object.entries(data)) {
    stream.append(isArr ? sameKey : key, value);
  }

  if (others) {
    for (let [key, value] of Object.entries(others)) {
      stream.append(key, value);
    }
  }

  return axiosInstance.post(composeUrl(url, qs), stream).then(callback);
};

export const postFile = function(url, qs, data = {}) {
  const formData = new FormData();

  for (let [key, value] of Object.entries(data)) {
    formData.append(key, value);
  }

  return axiosInstance.post(composeUrl(url, qs), formData).then(callback);
};
