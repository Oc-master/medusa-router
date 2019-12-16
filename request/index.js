export const request = ({ url, method, data = {}, header = {} }) => {
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
    });
  });
};

export const getRequest = ({ url, data, header }) => {
  const options = {
    url,
    method: 'GET',
    data,
    header,
  };
  return request(options);
}

export const postRequest = ({ url, data, header }) => {
  const options = {
    url,
    method: 'POST',
    data,
    header,
  };
  return request(options);
}

export default { request, getRequest, postRequest };
