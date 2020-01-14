function page(options) {
  const originOnLoad = options.onLoad || function() {};

  const onLoad = function(ops) {
    const { query } = ops;
    const formatQuery = query ? JSON.parse(decodeURIComponent(query)) : {};

    originOnLoad && originOnLoad.call(this, { ...ops, query: formatQuery });
  };

  Page({ ...options, onLoad });
};

module.exports = page;
