import axios from "axios";
import iView from "iview";
import qs from "qs";
import Vue from "vue";
export const ApiUrl = "http://106.14.180.49:9009";
axios.defaults.baseURL = ApiUrl;
// axios.defaults.withCredentials = true;
axios.defaults.transformRequest = [
  function(data) {
    data = qs.stringify(data);
    return data;
  }
];
axios.interceptors.request.use(config => {
  if (localStorage.getItem("token")) {
    config.headers.common["X-USERTOKEN"] = localStorage.getItem("token");
  }
  if (config.method === "post" || config.method === "put") {
    if (config.data) {
      if (
        !(config.data instanceof Array) &&
        config.data.toString() === "[object Object]"
      ) {
        let fd = {};
        for (var item in config.data) {
          if (item.substring(0, 1) !== "_") {
            fd[item] =
              config.data[item] === "true" || config.data[item] === "false"
                ? Boolean(config.data[item])
                : config.data[item];
          }
        }
        config.data = fd;
      }
    }
  }
  config.validateStatus = status => {
    return status >= 200 && status <= 502;
  };
  return config;
});

axios.interceptors.response.use(
  response => {
    if (response.status < 200 || response.status >= 400) {
      if (response.config.method === "get" && response.status === 404) {
        window.location.href = "/whoops";
      } else if (response.status === 401) {
        this.$router.push({
          name: "Login"
        });
        return;
      } else {
        // console.log(response);
        // iView.Message.error(response.data.message);
        iView.Message.error("网络异常");
      }
      return Promise.reject(response);
    }
    if (response.data.code == "1000") {
      return response.data;
    } else if (response.data.code == "1001") {
      location.href =
        "#/login?url=" + window.btoa(window.encodeURIComponent(location.href));
      return Promise.reject(response);
    } else {
      iView.Message.error(response.data.msg);
      return Promise.reject(response);
    }
  },
  error => {
    // iView.Spin.hide();
    return Promise.reject(error);
  }
);
const $axios = axios;
export default $axios;
