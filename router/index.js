/**
 * 通过toType决定路由跳转函数
 * @param {String} url 路由跳转所需目标地址
 * @param {String} toType 路由跳转方式
 */
function jump({ url, toType = 'push' }) {
  const toTypeDict = {
    push: 'navigateTo',
    replace: 'redirectTo',
    reLaunch: 'reLaunch',
    switchTab: 'switchTab',
  };
  wx[toTypeDict[toType]]({ url });
};

/**
 * 路由封装函数
 * @param {String | Object} options 路由跳转所需参数 string: 路由对应key值 object: { target, query, toType }
 */
function to(options) {
  const opsType = Object.prototype.toString.call(options);
  if (opsType === '[object String]') {
    /** 调用默认跳转方式的路由方法 */
    const url = `/${options}`;
    jump({ url });
  } else if (opsType === '[object Object]') {
    const { target, query = {}, toType } = options;
    /** 拼接路由跳转地址和路由参数 */
    const path = `/${target}`;
    const formatQuery = encodeURIComponent(JSON.stringify(query));
    const url = `${path}?query=${formatQuery}`;
    jump({ url, toType });
  } else {
    console.log('调用路由方法失败，参数异常！');
  }
};

/**
 * navigateTo方式跳转的快捷调用函数
 * @param {String | Object} options
 */
function push(options) {
  to(options);
};

/**
 * redirectTo方式的快捷调用函数
 * @param {String | Object} options
 */
function replace(options) {
  const opsType = Object.prototype.toString.call(options);
  if (opsType === '[object String]') {
    to({ target: options, toType: 'replace' });
  } else if (opsType === '[object Object]') {
    const { target, query } = options;
    to({ target, query, toType: 'replace' });
  } else {
    console.log('调用路由方法失败，参数异常！');
  }
};

/**
 * 路由出栈函数
 * @param {Number} step 路由出栈层级
 */
function back(step = 1) {
  wx.navigateBack({ delta: step });
};

export default {
  to,
  push,
  replace,
  back,
};
