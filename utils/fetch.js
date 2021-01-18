const axios = require('axios');
const service = axios.create({
  baseURL: sails.config.custom.ipfs.gateWayUrl[0],
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
