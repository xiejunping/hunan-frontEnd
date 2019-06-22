<template>
  <div class="c-news">
    <!-- 导航 -->
    <Breadcrumb style="margin-bottom: 12px">
      <BreadcrumbItem :to="{path: '/'}">
        <Icon type="ios-home-outline"></Icon> 兴趣爱好
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
                <a href="#" target="_blank">
                  <Row>
                    <Col span="18">
                      <div class="content-box">
                        <h2>前端工程化（5）：你所需要的npm知识储备都在这了</h2>
                        <p>在前端开发流程中提供了非常完善的自动化工具链</p>
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
                <a href="#" target="_blank">
                  <Row>
                    <Col span="18">
                      <div class="content-box">
                        <h2>前端架构师亲述：前端工程师成长之路的 N 问 及 回答</h2>
                        <p>better-scroll 作者 黄佚</p>
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

    <Row>
      <Col span="24" style="height: 600px">
        <editor-md
          :mdValuesP="msg"
          :fullPageStatusP="false"
          :editStatusP="false"
          :previewStatusP="false"
          :navStatusP="true"
          @childevent="childEventHandler">
        </editor-md>
      </Col>
    </Row>

  </div>
</template>
<script>
import EditorMd from '@/components/editor/editor-md.vue'
export default {
  name: 'news',
  components: { EditorMd },
  methods: {
    childEventHandler (data) {
      console.log(data)
    }
  },
  data () {
    return {
      msg: '# Vue技术栈'
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
