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
      title: '新闻',
      menu: true
    }
  },
  {
    path: '/github',
    name: 'github',
    component: resolve => {
      require(['@/pages/news/news.vue'], resolve)
    },
    meta: {
      title: '开源项目',
      menu: true
    }
  },
  {
    path: '/share',
    name: 'share',
    component: resolve => {
      require(['@/pages/news/share.vue'], resolve)
    },
    meta: {
      title: '分享',
      menu: true
    }
  },
  {
    path: '/pdf',
    name: 'pdf',
    component: resolve => {
      require(['@/pages/news/pdf.vue'], resolve)
    },
    meta: {
      title: 'pdf'
    }
  },
  {
    path: '/website',
    name: 'website',
    component: resolve => {
      require(['@/pages/news/website.vue'], resolve)
    },
    meta: {
      title: '网站',
      menu: true
    }
  },
  {
    path: '/design',
    name: 'design',
    component: resolve => {
      require(['@/pages/news/news.vue'], resolve)
    },
    meta: {
      title: '设计',
      menu: true
    }
  },
  {
    path: '/tool',
    name: 'tool',
    component: resolve => {
      require(['@/pages/news/news.vue'], resolve)
    },
    meta: {
      title: '工具',
      menu: true
    }
  }
]
