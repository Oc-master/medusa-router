function setWatcher(data, watch) {
  Object.keys(watch).forEach(key => {
    const keys = key.split('.');
    let curData = data;
    const length = keys.length - 1;
    for (let i = 0; i < length; i++) {
      curData = curData[keys[i]];
    };
    const lastKey = keys[length];
    observe(curData, lastKey, watch[key].bind(this));
  });
};

function observe(data, key, watchFun) {
  let value = data[key];
  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    get: function() {
      return value;
    },
    set: function(newValue) {
      watchFun(newValue, value);
      value = newValue;
    },
  });
};

export default setWatcher;
