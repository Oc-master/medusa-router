import setWatcher from '../utils/watch';

function page(options) {
  const originOnLoad = options.onLoad || function() {};

  const onLoad = function(ops) {
    const { query } = ops;
    const formatQuery = query ? JSON.parse(decodeURIComponent(query)) : {};
    options.watch && setWatcher.call(this, this.data, this.watch);
    originOnLoad && originOnLoad.call(this, { ...ops, query: formatQuery });
  };

  Page({ ...options, onLoad });
};

export default page;
