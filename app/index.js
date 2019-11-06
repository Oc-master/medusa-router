/**
  * @Author: O_c
  * @Date:   2019-11-05 17:27:26
  * @Last Modified by:   O_c
  * @Last Modified time: 2019-11-06 11:08:43
  */

import Router from './router'

function app(ops) {
  const configuration = {
    $router: new Router({})
  }

  const options = Object.assign(ops, configuration)

  App(options)
}

export default app
