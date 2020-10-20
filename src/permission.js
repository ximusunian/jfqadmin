import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken, getDDCorpId } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

// import { ddlogin } from "@/api/user";
// import * as dd from "dingtalk-jsapi";

NProgress.configure({
  showSpinner: false
}); // NProgress Configuration

const whiteList = [
  "/login",
  "/h5page/performance",
  "/h5page/performance/confirm",
  "/h5page/performance/list",
  "/h5page/feedback"
]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();
  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === "/login") {
      // if is logged in, redirect to the home page
      next({
        path: "/"
      });
      NProgress.done();
    } else {
      
      // const hasGetUserInfo = store.getters.name
      const hasPermissions =
        store.getters.permissions && store.getters.permissions.length > 0;
      if (hasPermissions) {
        next();
      } else {
        try {
          // get user info
          // await store.dispatch('user/getInfo')
          const { permissions } = await store.dispatch("user/getInfo");

          const accessRoutes = await store.dispatch(
            "permission/generateRoutes",
            permissions
          );
          router.addRoutes(accessRoutes);
          next({ ...to, replace: true });
        } catch (error) {
          
          console.log(error);
          // remove token and go to login page to re-login
          await store.dispatch("user/resetToken");
          Message.error(error || "Has Error");
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    /* has no token*/
    // 未登录处理
    // if (dd.env.platform !== "notInDingTalk") {
    //   var that = this;
    //   // 钉钉环境，通过钉钉授权码获取Token
    //   dd.ready(function () {
    //     dd.runtime.permission.requestAuthCode({
    //       corpId: getDDCorpId(),
    //       onSuccess: function (result) {
    //         var code = result.code;
    //         store
    //           .dispatch("user/ddlogin", code)
    //           .then(() => {
    //             // router.push({
    //             //   path: that.redirect || "/",
    //             //   query: that.otherQuery
    //             // });
    //             next(`/login?redirect=${to.path}`);
    //           })
    //           .catch((err) => {
    //             console.log(err);
    //           });
    //       },
    //       onFail: function (err) {
    //         console.log(err);
    //       }
    //     });
    //   });
    // }
    // else{
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
    // }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
