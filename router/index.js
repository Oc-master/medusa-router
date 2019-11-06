/**
  * @Author: O_c
  * @Date:   2019-11-01 10:55:27
  * @Last Modified by:   O_c
  * @Last Modified time: 2019-11-06 11:05:14
  */

export default class Router {
  constructor({ routes }) {
    /** 创建实例属性: routes */
    this.routes = routes
  }

  /**
   * 通过toType决定路由跳转函数
   * @param {String} url 路由跳转所需目标地址
   * @param {String} toType 路由跳转方式
   */
  jump({ url, toType = 'push' }) {
    const toTypeDict = {
      push: 'navigateTo',
      replace: 'redirectTo',
      reLaunch: 'reLaunch',
      switchTab: 'switchTab'
    }
    wx[toTypeDict[toType]]({ url })
  }

  /**
   * 路由封装函数
   * @param {String | Object} options 路由跳转所需参数 string: 路由对应key值 object: { target, query, toType }
   */
  to(options) {
    const opsType = Object.prototype.toString.call(options)
    if (opsType === '[object String]') {
      /** 调用默认跳转方式的路由方法 */
      const url = `/${this.routes[options]}`
      this.jump({ url })
    } else if (opsType === '[object Object]') {
      const { target = 'index', query = {}, toType } = options
      /** 拼接路由跳转地址和路由参数 */
      const path = `/${this.routes[target]}`
      const formatQuery = encodeURIComponent(JSON.stringify(query))
      const url = `${path}?query=${formatQuery}`
      this.jump({ url, toType })
    } else {
      console.log('调用路由方法失败，参数异常！')
    }
  }

  /**
   * navigateTo方式跳转的快捷调用函数
   * @param {String | Object} options
   */
  push(options) {
    this.to(options)
  }

  /**
   * redirectTo方式的快捷调用函数
   * @param {String | Object} options
   */
  replace(options) {
    const opsType = Object.prototype.toString.call(options)
    if (opsType === '[object String]') {
      this.to({ target: options, toType: 'replace' })
    } else if (opsType === '[object Object]') {
      const { target, query } = options
      this.to({ target, query, toType: 'replace' })
    } else {
      console.log('调用路由方法失败，参数异常！')
    }
  }

  /**
   * 路由出栈函数
   * @param {Number} step 路由出栈层级
   */
  back(step = 1) {
    wx.navigateBack({ delta: step })
  }
}
