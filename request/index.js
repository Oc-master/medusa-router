export const request = ({ url, method, data = {}, header = {}, loadingOps = {}, toastOps = {} }) => {
  const defaultLoadingOps = {
    isShow: true,
    text: '正在加载中...',
  };
  const curLoadingOps = Object.assign(defaultLoadingOps, loadingOps);
  if (curLoadingOps.isShow) {
    wx.showLoading({
      mask: true,
      title: curLoadingOps.text,
    });
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data,
      header,
      success: ({ statusCode, data: resData }) => {
        if (statusCode === 200) {
          resolve(resData);
        } else {
          reject(resData);
        }
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        if (curLoadingOps.isShow) {
          wx.hideLoading();
        }
      },
    });
  });
};

export const getRequest = ({ url, data, header, loadingOps }) => {
  const options = {
    url,
    method: 'GET',
    data,
    header,
    loadingOps,
  };
  return request(options);
}

export const postRequest = ({ url, data, header, loadingOps }) => {
  const options = {
    url,
    method: 'POST',
    data,
    header,
    loadingOps,
  };
  return request(options);
}

export default { request, getRequest, postRequest };
