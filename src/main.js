import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import moment from 'moment'

import '@/icons' // icon
import '@/permission' // permission control
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'production') {
//   mockXHR()
// } 
Vue.prototype.$moment = moment; 
//  全局过滤器  
Vue.filter('dateformat', function (dataStr, pattern = 'YYYY-MM-DD hh:mm:ss') {
  if (dataStr) {  
    return  moment(dataStr).format(pattern);
  } else {
    return dataStr
  }
}) 
Vue.filter('dateformatday', function (dataStr, pattern = 'YYYY-MM-DD') {
  if (dataStr) { 
    return  moment(dataStr).format(pattern);
  } else {
    return dataStr
  }
}) 

// set ElementUI lang to EN
Vue.use(ElementUI, { locale:locale,size:'mini'})
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
 

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
