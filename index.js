/**
 * 路由功能
 * @author O_c <https://github.com/Oc-master>
 * @lastEditor O_c
 * @lastEditTime 2021-06-21
 */
class Router {
  constructor(platform) {
    if (new.target !== Router) {
      throw new Error('Must use new command to generate instance');
    }
    if (!platform) {
      throw new Error('The instantiation parameter is invalid');
    }
    Router.__platform__ = platform;
    if (!Router.__instance__) {
      Router.__instance__ = this;
    }
    return Router.__instance__;
  }

  static getInstance(platform) {
    if (!Router.__instance__) {
      Router.__instance__ = new Router(platform);
    }
    return Router.__instance__;
  }

  get $route() {
    const page = this.getPage();
    const { route, options = {} } = page;
    const decodeQuery = this.decoding(options);
    const query = { ...options, ...decodeQuery };
    delete query._query_;
    return {
      ...page,
      query,
      fullPath: `/${route}`,
    }
  }

  getPage() {
    if (getCurrentPages) {
      const pages = getCurrentPages();
      const page = pages.pop();
      return page;
    } else {
      throw new Error('The "getCurrentPages" is not supported on the current platform');
    }
  }

  decoding(options = {}) {
    const { _query_ = '{}' } = options;
    return JSON.parse(decodeURIComponent(_query_));
  }

  push(params) {
    const options = this._paramsPipe(params);
    Router.__platform__.navigateTo(options);
  }

  replace(params) {
    const options = this._paramsPipe(params);
    const { closeAll = false } = options;
    if (closeAll) {
      Router.__platform__.reLaunch(options);
    } else {
      Router.__platform__.redirectTo(options);
    }
  }

  switchTab(params) {
    const options = this._paramsPipe(params);
    const { url } = this._urlPipe(options.url);
    Router.__platform__.switchTab({ ...options, url });
  }

  goBack(params = 1) {
    const type = typeof params;
    if (type === 'number' || type === 'string') {
      Router.__platform__.navigateBack({ delta: params });
      return undefined;
    }
    const isObject = Object.prototype.toString.call(params) === '[object Object]';
    if (isObject) {
      const { delta } = params;
      if (!delta) {
        throw new Error('The "delta" parameter is invalid');
      }
      Router.__platform__.navigateBack(params);
    }
    throw new Error('The parameter is invalid');
  }

  goHome() {
    this.goBack(99);
  }

  _encoding(query = {}) {
    return encodeURIComponent(JSON.stringify(query));
  }

  _urlPipe(url = '') {
    if (!url) {
      throw new Error('The "url" parameter is necessary');
    }
    const isString = typeof url === 'string';
    if (!isString) {
      throw new Error('The "url" parameter is invalid');
    }
    const { route } = this.getPage();
    const [path, queryStr] = url.split('?');
    if (`/${route}` === path) {
      throw new Error(`Cannot jump to the "${path}"`);
    }
    const query = this._queryPipe(queryStr);
    return { query, url: path };
  }

  _queryPipe(queryStr = '') {
    if (!queryStr) return {};
    const query = queryStr.split('&').reduce((acc, item) => {
      const [key, value] = item.split('=');
      return {
        ...acc,
        [key]: value,
      };
    }, {});
    return query;
  }

  _paramsPipe(params) {
    if (!params) {
      throw new Error('The "url" parameter is necessary');
    }
    const isString = typeof params === 'string';
    if (isString) {
      return { url: params };
    }
    const isObject = Object.prototype.toString.call(params) === '[object Object]';
    if (isObject) {
      const { url, query } = params;
      const route = this._urlPipe(url);
      if (query) {
        const encodeQuery = this._encoding({ ...route.query, ...query });
        const options = {
          ...params,
          url: `${route.url}?_query_=${encodeQuery}`,
        };
        delete options.query;
        return options;
      }
      return params;
    }
    throw new Error('The parameter is invalid');
  }
}

export default Router;
