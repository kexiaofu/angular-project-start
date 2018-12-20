// 判断是否为空
export const isEmpty = val => {
  switch (typeof val) {
    case 'number':
      if (isNaN(val) || val === Number.POSITIVE_INFINITY || val === Number.NEGATIVE_INFINITY) {
        return true;
      }
      break;
    case 'string':
      if (val.replace(/(\s)/g, '') === '') {
        return true;
      }
      break;
    case 'function':
      console.log(val + '- is function');
      return true;
      break;
    case 'undefined':
      return true;
      break;
    case 'object':
      if ( val === null || JSON.stringify(val) === '{}' || (Array.isArray(val) && val.length === 0)) {
        return true;
      }
      break;
  }
  return false;
};

// 请求返回数据
export const getApiData = async ( set, key, data: any = null) => {
  if (window.sessionStorage.getItem(key)) {
    console.log(`get ${key} data from storage`);
    return JSON.parse(window.sessionStorage.getItem(key));
  } else {
    console.log(`require ${key}`);
    if (!set.hasOwnProperty(key)) {
      throw Error('No this api key');
    }
    if ( data ) {
      return await set[key](data);
    } else {
      return await set[key]();
    }
  }
};

export const setApiData = async ( set, key, data: any = null, params: any = null) => {
  if (!set.hasOwnProperty(key)) {
    throw Error('No this api key');
  }
  return await set[key](data, params);
};
