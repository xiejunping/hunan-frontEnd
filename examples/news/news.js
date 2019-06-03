import Vue from 'vue'
import iView from 'iview'
import App from './App.vue'
import router from './router'
import store from '@/store'
import 'babel-polyfill'
import 'iview/dist/styles/iview.css'
import '@/assets/styles/index.styl'

Vue.config.productionTip = false
Vue.use(iView)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
