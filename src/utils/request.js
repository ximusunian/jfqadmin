import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";
import { ZKPubUrls } from "@/utils/url";

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL: 'http://api.zztx7.com',
  baseURL: ZKPubUrls.baseURL,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 300000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken();
      config.headers["Authorization"] = "Bearer " + getToken();
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;

    return res;
    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 200) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 401 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
  },
  error => {
    var errormsg = error.message ? error.message : "";
    if (error.response && error.response.status === 401) {
      // to re-login
      // MessageBox.confirm('当前页面已经过期，请重新登录', '', {
      //   confirmButtonText: '去登录',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   store.dispatch('user/resetToken').then(() => {
      //     location.reload()
      //   })
      // })

      //在钉钉内部不提示，直接登录
      console.log("token过期，重新登录");
      store.dispatch("user/resetToken").then(() => {
        location.reload();
      });
    } else if (error.response && error.response.status === 500) {
      errormsg = "系统内部错误";
      const errormsgInput = error.response.data.error.message;
      errormsg = errormsgInput ? errormsgInput : errormsg;
      //this.$message.error(errormsg);
      Message({
        message: errormsg,
        type: "error",
        duration: 5 * 1000
      });
    } else {
      Message({
        message: errormsg,
        type: "error",
        duration: 5 * 1000
      });
    }
    return Promise.reject(error);
  }
);

export default service;
