const axios = require('axios');
const service = axios.create({
  baseURL: 'http://192.168.66.16:8080',
  timeout: 30000
});

service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

module.exports = service;
