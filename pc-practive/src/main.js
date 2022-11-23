import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// import 'url-search-params-polyfill';
import request from "./utils/request"
import axios from 'axios'
import VueAxios from "vue-axios";
 
Vue.use(VueAxios, axios)


Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.request = request
// Vue.prototype.$http=axios
axios.defaults.baseURL='http://localhost:8080'
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// router.beforeEach((to, from, next) => {
//   if (to.path === '/loginLog') {
//     next('');
//   } else {
//     let token = localStorage.getItem('Authorization');
//     console.log(token)
//     if (token === null || token === '') {
//       next('/');
//     } else {
//       if (to.matched.length === 0) {
//         next('/404')
//       } else {
//         next();
//       }
//     }
//   }
// });
 
// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });