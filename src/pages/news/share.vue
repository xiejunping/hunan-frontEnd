<template>
  <div class="c-share">
    <!-- 导航 -->
    <Breadcrumb style="margin-bottom: 12px">
      <BreadcrumbItem :to="{path: '/'}">
        <Icon type="ios-home-outline"></Icon> 资讯动态
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Icon type="logo-buffer"></Icon> {{$route.meta.title}}
      </BreadcrumbItem>
    </Breadcrumb>

    <Row :gutter="12">
      <Col span="18">
        <ul class="book-list" v-for="book in books" :key="book.id">
          <li @click="to(book)">{{book.name}}</li>
        </ul>
      </Col>
    </Row>

  </div>
</template>
<script>
export default {
  name: 'share',
  methods: {
    to (meta) {
      window.location.href = meta.url
      // this.$router.push({
      //   name: 'pdf',
      //   query: {
      //     src: meta.url
      //   }
      // })
    }
  },
  data () {
    return {
      books: [
        {
          id: 1,
          name: '《代码整洁之道》',
          url: 'https://pdf-book-1252359508.cos.ap-shanghai.myqcloud.com/pdf/%5B%E4%BB%A3%E7%A0%81%E6%95%B4%E6%B4%81%E4%B9%8B%E9%81%93%5D.(%E7%BE%8E)%E9%A9%AC%E4%B8%81.%E6%89%AB%E6%8F%8F%E7%89%88.pdf'
        },
        {
          id: 2,
          name: '《增长黑客》',
          url: 'https://pdf-book-1252359508.cos.ap-shanghai.myqcloud.com/pdf/%E5%A2%9E%E9%95%BF%E9%BB%91%E5%AE%A2_%E5%88%9B%E4%B8%9A%E5%85%AC%E5%8F%B8%E7%9A%84%E7%94%A8%E6%88%B7%E4%B8%8E%E6%94%B6%E5%85%A5%E5%A2%9E%E9%95%BF%E7%A7%98%E7%B1%8D%20-%20%E8%8C%83%E5%86%B0.pdf'
        },
        {
          id: 3,
          name: '《Liunx入门》',
          url: 'https://pdf-book-1252359508.cos.ap-shanghai.myqcloud.com/pdf/%E9%B8%9F%E5%93%A5%E7%9A%84linux%E7%A7%81%E6%88%BF%E8%8F%9C%EF%BC%9A%E5%9F%BA%E7%A1%80%E5%AD%A6%E4%B9%A0%E7%AF%87%20%EF%BC%88%E7%AC%AC%E5%9B%9B%E7%89%88%EF%BC%89.pdf'
        }
      ]
    }
  }
}
</script>
<style lang="stylus" scoped>

.c-share
  padding 15px 20px
  .book-list li
    background-color #ffffff
    cursor pointer
    line-height 64px
    margin-bottom 10px
    padding 8px 14px
    &:hover
      background-color #f8f8f8
</style>
