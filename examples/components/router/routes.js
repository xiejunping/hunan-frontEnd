export default [
  {
    path: '/',
    name: 'index',
    component: resolve => {
      require(['@/pages/components/index.vue'], resolve)
    }
  }
]
