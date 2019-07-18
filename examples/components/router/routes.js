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
  },
  {
    path: '/cascader',
    name: 'cascader',
    component: resolve => {
      require(['@/pages/components/cascader.vue'], resolve)
    },
    meta: {
      title: '级联组件'
    }
  }
]
