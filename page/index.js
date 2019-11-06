/**
  * @Author: O_c
  * @Date:   2019-11-01 15:13:43
  * @Last Modified by:   O_c
  * @Last Modified time: 2019-11-06 11:12:18
  */

function page(ops = {}) {
  const originOnLoad = ops.onLoad || function() {}

  const onLoad = (options) => {
    const { query } = options
    const formatQuery = query ? JSON.parse(decodeURIComponent(query)) : {}

    originOnLoad && originOnLoad.call(this, { ...options, query: formatQuery })
  }

  const configuration = {
    onLoad
  }

  const options = Object.assign(ops, configuration)

  // ops.onLoad = function(options) {
  //   const { query } = options
  //   const formatQuery = query ? JSON.parse(decodeURIComponent(query)) : {}

  //   originOnLoad && originOnLoad.call(this, { ...options, query: formatQuery })
  // }

  Page(options)
}

export default page
