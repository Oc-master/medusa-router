/**
  * @Author: O_c
  * @Date:   2019-11-01 15:13:43
  * @Last Modified by:   O_c
  * @Last Modified time: 2019-11-01 15:24:50
  */
function page(ops = {}, ...args) {
  const originOnLoad = ops.onLoad

  ops.onLoad = function(options) {
    const { query } = options
    const formatQuery = JSON.parse(decodeURIComponent(query))

    originOnLoad && originOnLoad.call(this, { ...options, query: formatQuery })
  }

  Page(ops)
}
