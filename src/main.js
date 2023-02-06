import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import '@/plugins/element-ui'
import i18n from '@/plugins/i18n'
import http from '@/plugins/http.js'
import store from '@/store'
import '@/plugins/utils'
<<<<<<< HEAD
// import Grid from './plugins/commonExtart/index'
import BtnList from './plugins/btn-list.vue'
import '@/assets/css/index.scss'
import 'element-ui/lib/theme-chalk/index.css';
import COM from 'material-market-v2'
Vue.use(COM)

=======
import Grid from './plugins/commonExtart/index'
import BtnList from './plugins/btn-list.vue'
import '@/assets/css/index.scss'
import 'element-ui/lib/theme-chalk/index.css';
>>>>>>> ad24299c2cbfb338e7f56e5a1e147b4269455d60

require('./mock/index')
// import 'default-passive-events'
Vue.config.productionTip = false
Vue.use(http)
<<<<<<< HEAD
// Vue.use(Grid)
=======
Vue.use(Grid)
>>>>>>> ad24299c2cbfb338e7f56e5a1e147b4269455d60
Vue.component('BtnList', BtnList)

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
