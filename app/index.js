/**
  * @Author: O_c
  * @Date:   2019-11-05 17:27:26
  * @Last Modified by:   O_c
  * @Last Modified time: 2019-11-05 17:33:25
  */

function app(ops) {
  import Router from '../router'

  const configuration = {
    $router: new Router(routes)
  }

  const options = Object.assign(ops, configuration)

  App(options)
}

export default app