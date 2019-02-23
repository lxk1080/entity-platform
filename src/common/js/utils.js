/**
 * 解析URL参数
 * @example ?id=123456&a=b
 * @return Object {id:123456,a:b}
 */
export function urlParse() {
  const url = window.location.search;
  const reg = /[?&][^?&]+=[^?&]+/g;
  const arr = url.match(reg);
  const obj = {};
  let key, val;
  // ['?id=123456', '&a=b']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substr(1).split('=');
      key = decodeURIComponent(tempArr[0]);
      val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
}

/**
 * 格式化日期
 * @param date
 * @param fmt
 * @returns {*}
 */
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}
