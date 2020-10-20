import { login, logout, getInfo, ddlogin } from "@/api/user";
import {
  getToken,
  setToken,
  removeToken,
  setUserId,
  removeUserId,
  setEmployeeId,
  removeEmployeeId,
  setDingDingId,
  removeDingDingId
} from "@/utils/auth";
import { resetRouter } from "@/router";

import zklogo from "@/imgs/logo_notitle.png";

const state = {
  token: getToken(),
  name: "",
  userid: "",
  avatar: zklogo,
  permissions: []
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions;
  },
  SET_USERID: (state, userid) => {
    state.userid = userid;
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { userNameOrEmailAddress, password } = userInfo;
    return new Promise((resolve, reject) => {
      
      login({
        userNameOrEmailAddress: userNameOrEmailAddress.trim(),
        password: password
      })
        .then(response => { 
          var data = response.result.result; 
          var result = response.result.success;
          if(result == false) {
            reject(data);
            return;
          }
          commit("SET_TOKEN", data.accessToken);
          setToken(data.accessToken);
          setUserId(data.userId);
          setEmployeeId(data.employeeId);
          setDingDingId(data.dingDingId);
          resolve();
        })
        .catch(error => { 
          const errmsg = error.response.data.error.details;
          reject(errmsg);
        });
    });
  },

  // 钉钉免登录
  ddlogin({ commit }, code) {
    return new Promise((resolve, reject) => {
      ddlogin(code)
        .then(response => {  
          const { data } = response.result;
          commit("SET_TOKEN", response.result.accessToken);
          setToken(response.result.accessToken);
          setUserId(response.result.userId);
          setEmployeeId(response.result.employeeId);
          setDingDingId(response.result.dingDingId);
          resolve();
        })
        .catch(error => { 
          const errmsg = error.response.result.error.details;

          reject(errmsg);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => { 
          const data= response.result; 
          if (!data) {
            reject("Verification failed, please Login again.");
          }   
          const { fullName, avatar, permissions, id } = data;
          commit("SET_NAME", fullName);
          commit("SET_PERMISSIONS", permissions);
          commit("SET_USERID", id);
          if (avatar) {
            commit("SET_AVATAR", avatar);
          } else {
            commit("SET_AVATAR", zklogo);
          }
          resolve(data);
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      //   commit('SET_TOKEN', '')
      //   removeToken()
      //   resetRouter()
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
      commit("SET_TOKEN", "");
      commit("SET_NAME", "");
      commit("SET_AVATAR", "");
      commit("SET_USERID", "");
      commit("SET_PERMISSIONS", []);
      removeToken();
      removeUserId();
      removeEmployeeId();
      removeDingDingId();
      resetRouter();
      resolve();
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      commit("SET_PERMISSIONS", []);
      removeToken();
      removeUserId();
      removeEmployeeId();
      removeDingDingId();
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
