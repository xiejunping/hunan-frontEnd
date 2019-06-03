import Vue from 'vue'
import Router from 'vue-router'
// import store from '@/store'
import routes from './routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

router.afterEach(to => {
  // 路由置顶
  // window.scrollTo(0, 0)
})

export default router
