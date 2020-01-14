const _EType = {
  push: 'navigateTo',
  replace: 'redirectTo',
  reLaunch: 'reLaunch',
  switchTab: 'switchTab',
};

/**
 * 检查路由目标页面的key是否真实存在
 * @param {String} key 路由映射关系中的key
 */
const _checkPathExists = (key) => {
  if (!key) {
    throw new Error('"target" is the required parameter.');
  }
  const isExists = Object.keys($mcRoutes).includes(key);
  if (!isExists) {
    throw new Error('The page for this keyword was not found.');
  }
};

/**
 * 路由跳转方法
 * @param {String} target 目标页面路由路径对应的key
 * @param {Object} query 路由参数
 * @param {String} toType 路由跳转方式
 */
const _jump = (options) => {
  const opsType = Object.prototype.toString(options);
  if (opsType === '[object String]') {
    _checkPathExists(options);
    wx[_EType.push]({ url: `/${$mcRoutes[options]}` });
  } else if (opsType === '[object Object]') {
    const { target, query = {}, toType = 'push' } = options;
    _checkPathExists(target);
    if (toType === 'switchTab') {
      wx[_EType.switchTab]({ url: `/${$mcRoutes[target]}` });
      return;
    }
    const formatQuery = encodeURIComponent(JSON.stringify(query));
    const url = `/${$mcRoutes[target]}?query=${formatQuery}`;
    wx[_EType[toType]]({ url });
  } else {
    throw new Error('Parameter is wrong.');
  }
};

const to = (options) => {
  _jump(options);
};

const push = (options) => {
  _jump(options);
};

const replace = (options) => {
  if (typeof options === 'string') {
    _jump({ target: options, toType: 'replace' });
  } else {
    _jump(options);
  }
};

/**
 * 页面回退方法
 * @param {Number} step 回退步值
 */
const back = (step = 1) => {
  wx.navigateBack({ delta: step });
};

/**
 * 回到首页方法
 */
const goHome = () => {
  wx.navigateBack({ delta: 100 });
};

/**
 * 获取页面路由参数方法
 */
const getQuery = () => {
  const page = getCurrentPages().pop();
  if ('query' in page.options) {
    const { query } = page.options;
    return JSON.parse(decodeURIComponent(query));
  }
  return {};
};

module.exports = {
  to,
  push,
  replace,
  back,
  goHome,
  getQuery,
};
