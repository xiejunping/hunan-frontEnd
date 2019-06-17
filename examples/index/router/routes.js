export default [
  {
    path: '/',
    name: 'index',
    redirect: '/news',
    meta: {
      title: ''
    }
  },
  {
    path: '/news',
    name: 'news',
    component: resolve => {
      require(['@/pages/news/news.vue'], resolve)
    },
    meta: {
      title: '新闻'
    }
  },
  {
    path: '/github',
    name: 'github',
    component: resolve => {
      require(['@/pages/news/news.vue'], resolve)
    },
    meta: {
      title: '开源项目'
    }
  },
  {
    path: '/share',
    name: 'share',
    component: resolve => {
      require(['@/pages/news/news.vue'], resolve)
    },
    meta: {
      title: '分享'
    }
  },
  {
    path: '/website',
    name: 'website',
    component: resolve => {
      require(['@/pages/news/website.vue'], resolve)
    },
    meta: {
      title: '网站'
    }
  },
  {
    path: '/design',
    name: 'design',
    component: resolve => {
      require(['@/pages/news/news.vue'], resolve)
    },
    meta: {
      title: '设计'
    }
  },
  {
    path: '/tool',
    name: 'tool',
    component: resolve => {
      require(['@/pages/news/news.vue'], resolve)
    },
    meta: {
      title: '工具'
    }
  }
]
