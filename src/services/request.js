import axios from 'axios';

axios.defaults.headers.common['Content-Type'] = 'application/json';

const Request = (method = '', url = '', body = {}, headers = {}) => {
  axios.defaults.headers.common.Authorization = headers.Authorization;

  return (
    new Promise((resolve, reject) => {
      if (method === '') {
        reject();
        return false;
      }

      if (url === '') {
        reject();
        return false;
      }

      return axios[method.toLowerCase()](
        url,
        body,
        {
          headers,
        },
      ).then(res => resolve(res)).catch((err) => {
        reject(err);
      });
    })
  );
};

export default Request;
