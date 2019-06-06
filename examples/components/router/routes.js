export default [
  {
    path: '/',
    name: 'index',
    redirect: '/drag',
    meta: {
      title: ''
    }
  },
  {
    path: '/drag',
    name: 'drag',
    component: resolve => {
      require(['@/pages/components/drag.vue'], resolve)
    },
    meta: {
      title: '投放时间段'
    }
  }
]
