<template>
  <div class="c-footer">
    <Row>
      <Col span="6"></Col>
      <Col span="6"></Col>
      <Col span="6"></Col>
      <Col span="6"></Col>
    </Row>
    <Row class-name="copy-right">
      <Col span="24">
        <p>
          <span>&copy; jsVue.cn Vue技术栈 Team. </span>
          <span>
            <a href="http://www.beian.miit.gov.cn" target="_blank">湘ICP备18008873号-1</a>
          </span>
        </p>
        <p>
          <span>
            <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=43062602000075" target="_blank">
              <img src="~assets/beian_polic.png" style="display: inline-block; vertical-align: middle; margin-top: -2px" />
              <span> 湘公网安备 43062602000075号</span>
            </a>
          </span>
          <span>  腾讯云提供云服务器支持</span>
        </p>
      </Col>
    </Row>
  </div>

</template>
<script>
export default {
  name: 'foot'
}
</script>
<style lang="stylus" scoped>
@import "~assets/styles/mixin.styl"

.c-footer
  max-width 1100px
  margin 0 auto
  .copy-right
    text-align center
    color #ccc
    p
      line-height 1.6
</style>
