import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import '@/plugins/element-ui'
import i18n from '@/plugins/i18n'
import http from '@/plugins/http.js'
import store from '@/store'
import '@/plugins/utils'
import Grid from './plugins/commonExtart/index'
import BtnList from './plugins/btn-list.vue'
import '@/assets/css/index.scss'
import 'element-ui/lib/theme-chalk/index.css';

require('./mock/index')
// import 'default-passive-events'
Vue.config.productionTip = false
Vue.use(http)
Vue.use(Grid)
Vue.component('BtnList', BtnList)

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
