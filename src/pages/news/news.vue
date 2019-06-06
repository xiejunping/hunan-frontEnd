<template>
  <div class="c-news">
    <!-- 导航 -->
    <Breadcrumb style="margin-bottom: 12px">
      <BreadcrumbItem :to="{path: '/'}">
        <Icon type="ios-home-outline"></Icon> 资讯动态
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Icon type="logo-buffer"></Icon> {{$route.meta.title}}
      </BreadcrumbItem>
    </Breadcrumb>

    <Row>
      <Col span="17">
        <div class="c-feed-context">
          <ul class="c-entry-list">
            <li class="c-entry-item">
              <div class="c-entry-content">
                <a href="https://www.infoq.cn/article/P76Ke6SDw7cXsGL-Q8fU" target="_blank">
                  <Row>
                    <Col span="18">
                      <div class="content-box">
                        <h2>被迫遵守法规？AMD停止向中国提供x86新技术授权</h2>
                        <p>从 Catalina 起，macOS 上默认的 shell 将从 bash 变成 zsh</p>
                        <p>
                          <span></span>
                          <span></span>
                        </p>
                      </div>
                    </Col>
                    <Col span="6">
                    </Col>
                  </Row>
                </a>
              </div>
            </li>
            <li class="c-entry-item">
              <div class="c-entry-content">
                <a href="https://www.infoq.cn/article/P76Ke6SDw7cXsGL-Q8fU" target="_blank">
                  <Row>
                    <Col span="18">
                      <div class="content-box">
                        <h2>被迫遵守法规？AMD停止向中国提供x86新技术授权</h2>
                        <p>从 Catalina 起，macOS 上默认的 shell 将从 bash 变成 zsh</p>
                        <p>
                          <span></span>
                          <span></span>
                        </p>
                      </div>
                    </Col>
                    <Col span="6">
                    </Col>
                  </Row>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </Col>
      <Col span="6" offset="1">
        <Card>
          <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              Classic film
          </p>
          <a href="#" slot="extra" @click.prevent="changeLimit">
              <Icon type="ios-loop-strong"></Icon>
              Change
          </a>
          <ul>
              <li>aaa</li>
          </ul>
        </Card>
      </Col>
    </Row>

  </div>
</template>
<script>
export default {
  name: 'news',
  data () {
    return {

    }
  },
  mounted () {
    console.log(this.$route.meta.title)
  }
}
</script>
<style lang="stylus" scoped>
@import "~assets/styles/mixin.styl"

.c-news
  padding 15px 20px
  .c-feed-context
    overflow hidden
    flex-grow 1
    .c-entry-list
      width 100%
      background-color #fff
      .c-entry-item
        border-bottom solid 1px rgba(178, 186, 194, 0.15)
        &:last-child
          border-bottom none
        &:hover
          background-color #f8f8f8
      .c-entry-content
        display flex
        align-items center
        padding 20px 25px
        a
          display inline-block
          width 100%
          &:hover
            color inherit
      .content-box
        font-size 14px
        color #999
        h2
          font-size 16px
          font-weight 400
          line-height 42px
          height 42px
          color #333
        span
          color #666
</style>
