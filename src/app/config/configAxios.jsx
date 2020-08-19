import axios from 'axios';
export default () => {
  axios.interceptors.request.use(function (config) {
    document.body.classList.add('with-loader');
    return config
  }, function (error) {
    document.body.classList.remove('with-loader');
    return Promise.reject(error);
  });

  axios.interceptors.response.use(function (response) {
    document.body.classList.remove('with-loader');
    return response;
  }, function (error) {
    document.body.classList.remove('with-loader');
    return Promise.reject(error);
  });
}