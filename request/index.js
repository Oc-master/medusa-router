/**
  * @Author: O_c
  * @Date:   2019-11-01 16:54:36
  * @Last Modified by:   O_c
  * @Last Modified time: 2019-11-04 10:47:14
  */
export default class Request {
  constructor (header) {
    this._header = header || {}
  }

  /**
   * 统一的异常处理函数
   */
  setErrorHandler (handler) {
    this._errorHandler = handler
  }

  /**
   * GET请求快捷方式
   * @param {Object} { url: 请求地址, data: 请求数据, header: 请求头部 }
   */
  get ({ url, data, header }) {
    const params = {
      url,
      data,
      header,
      method: 'GET'
    }
    return this.request(params)
  }

  /**
   * POST请求快捷方式
   * @param {Object} { url: 请求地址, data: 请求数据, header: 请求头部 }
   */
  post ({ url, data, header }) {
    const params = {
      url,
      data,
      header,
      method: 'POST'
    }
    return this.request(params)
  }

  /**
   * 请求调用函数
   * @param {Object} { url: 请求地址, data: 请求数据, header: 请求头部, method: 请求方法 }
   */
  request ({ url, data = {}, header = this._header, method = 'GET' }) {
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        data,
        header,
        method,
        success: ({ statusCode, data }) => {
          if (statusCode === 200 || statusCode === 201) {
            resolve(data)
          } else {
            if (this._errorHandler !== null) this._errorHandler(res)
            reject()
          }
        },
        fail: (err) => {
          if (this._errorHandler !== null) this._errorHandler(err)
          reject()
        },
        complete: () => {}
      })
    })
  }
}
