// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import API from './API'
import store from './vuex/store'
import VueTimeago from 'vue-timeago'


//Components
import Navigation from './components/Navigation'
//Components end

Vue.component('app-navigation', Navigation)
axios.defaults.baseURL = 'http://localhost:8000/'//'https://bluecdf.gr/api/';
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
window.axios = axios;
window.API = API;
Vue.config.productionTip = false

router.beforeEach ((to, from, next) => {
  const authUser = JSON.parse(window.localStorage.getItem('authUser'))
 if (to.meta.requiresAuth) {
   if (authUser && authUser.access_token)
      next()
    else
      next('/')
 }else if (!to.meta.requiresAuth) {
   if (authUser && authUser.access_token)
      next('/dashboard')
    else
      next()
 }

 next()

})


Vue.use(VueTimeago, {
  name: 'timeago', // component name, `timeago` by default
  locale: 'el-GR',
  locales: {
    // you will need json-loader in webpack 1
    'el-GR': require('vue-timeago/locales/el-GR.json')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
