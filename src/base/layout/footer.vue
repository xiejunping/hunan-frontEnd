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
          <span>&copy; jsVue.cn Vue技术栈 Team. <a href="http://www.beian.miit.gov.cn" target="_blank">湘ICP备18008873号-1</a> </span>
        </p>
        <p>腾讯云提供云服务器支持</p>
      </Col>
    </Row>
  </div>

</template>
<script>
export default {
  name: 'footer'
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
