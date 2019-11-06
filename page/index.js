/**
  * @Author: O_c
  * @Date:   2019-11-01 15:13:43
  * @Last Modified by:   O_c
  * @Last Modified time: 2019-11-06 13:47:41
  */

import Router from '../router'

function page(ops = {}) {
  const originOnLoad = ops.onLoad || function() {}

  const onLoad = function(options) {
    const { query } = options
    const formatQuery = query ? JSON.parse(decodeURIComponent(query)) : {}

    originOnLoad && originOnLoad.call(this, { ...options, query: formatQuery })
  }

  const configuration = {
    $app: getApp(),
    $router: new Router({ routes: routes }),
    onLoad
  }

  const options = Object.assign(ops, configuration)

  Page(options)
}

export default page
