/**
  * @Author: O_c
  * @Date:   2019-11-01 15:13:43
  * @Last Modified by:   O_c
  * @Last Modified time: 2019-11-04 17:39:41
  */
function page(ops = {}, ...args) {
  const app = getApp()

  ops.$router = app.$router
  ops.$service = app.$service

  const originOnLoad = ops.onLoad || function() {}

  ops.onLoad = function(options) {
    const { query } = options
    const formatQuery = query ? JSON.parse(decodeURIComponent(query)) : {}

    originOnLoad && originOnLoad.call(this, { ...options, query: formatQuery })
  }

  Page(ops)
}

export default page
