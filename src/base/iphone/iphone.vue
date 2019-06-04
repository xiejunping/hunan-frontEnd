<template>
  <div class="c-axure">
    <!-- 导航栏 -->
    <div class="c-axure-nav" :class="{'nav-iphoneX': theme === 'iphoneX'}">
      <div class="nav-warp">
        <div class="nav-status">
          <img v-if="theme === 'iphoneX'" src="~assets/images/iphoneX/status.png" alt="">
          <img v-else src="~assets/images/iphone8/status.png" alt="">
        </div>
        <div class="nav-input">
          <Input value="草花手游" suffix="ios-sync" readonly>
            <img src="~assets/images/favicon.png" width="18" height="18" slot="prefix" alt="" />
          </Input>
        </div>
      </div>
    </div>
    <div class="c-axure-content" :class="{'content-iphoneX': theme === 'iphoneX'}">
      <iframe :src="src" width="375" :height="frameHeight" frameborder="0"></iframe>
    </div>

    <slot></slot>
    <!-- iphonX -->
    <div class="c-axure-bottom" v-if="theme === 'iphoneX'">
      <span class="bottom-status"></span>
    </div>
    <!-- 手机背景图 -->
    <div class="c-group-bg">
       <div :class="classes('top')">
        <img v-if="theme === 'iphoneX'" src="~assets/images/iphoneX/top.png" />
        <img v-else src="~assets/images/iphone8/top.png" />
      </div>
      <div :class="classes('left')">
        <img v-if="theme === 'iphoneX'" src="~assets/images/iphoneX/left.png" />
        <img v-else src="~assets/images/iphone8/left.png" />
      </div>
      <div :class="classes('right')">
        <img v-if="theme === 'iphoneX'" src="~assets/images/iphoneX/right.png" />
        <img v-else src="~assets/images/iphone8/right.png" />
      </div>
      <div :class="classes('bottom')">
        <img v-if="theme === 'iphoneX'" src="~assets/images/iphoneX/bottom.png" />
        <img v-else src="~assets/images/iphone8/bottom.png" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'iphone',
  props: {
    theme: {
      type: String,
      default () {
        return 'iphoneX'
      }
    },
    src: {
      type: String
    }
  },
  computed: {
    classes () {
      return (placement) => {
        return `c-${this.theme}-${placement}`
      }
    },
    frameHeight () {
      return this.theme === 'iphoneX' ? 704 : 601
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~assets/styles/mixin.styl"

$position ()
  position absolute
  z-index 0
  left 0
  right 0
  width 0
  height 0

.c-axure
  $position()
  .c-axure-nav
    position absolute
    left 31px
    top 134px
    .nav-warp
      position relative
      left 0
      top 0
      width 375px
      height 68px
      background-color #fff
      .nav-status
        width 375px
        height 28px
    &.nav-iphoneX
      left 28px
      top 45px
      .nav-warp
        height 84px
      .nav-status
        height 44px
    .nav-input
      height 40px
      padding 4px 10px
      >>> .ivu-input
        border-radius 32px
        background-color #f8f8f8
      img
        margin-top 7px
  .c-axure-content
    position absolute
    left 31px
    top 201px
    &.content-iphoneX
      left 28px
      top 129px
  .c-axure-bottom
    position absolute
    left 28px
    top 835px
    width 375px
    height 20px
    text-align center
    background-color #fff
    .bottom-status
      display inline-block
      width 200px
      height 7px
      border-radius 100px
      background-color #999
      margin-top 5.5px
  .c-group-bg
    $position()
    z-index 1001
    img
      width inherit
      height inherit
    // iphone8
    .c-iphone8-top
      position absolute
      top 20px
      left 0
      width 436px
      height 114px
    .c-iphone8-left
      position absolute
      top 134px
      left 0
      width 31px
      height 666px
    .c-iphone8-right
      position absolute
      top 134px
      left 406px
      width 30px
      height 666px
    .c-iphone8-bottom
      position absolute
      left 0
      top 800px
      width 436px
      height 108px
    // iphonex
    .c-iphoneX-top
      position absolute
      top 20px
      left 0
      width 432px
      height 62px
    .c-iphoneX-left
      position absolute
      left 0
      top 82px
      width 31px
      height 801px
    .c-iphoneX-right
      position absolute
      top 82px
      left 401px
      width 31px
      height 801px
    .c-iphoneX-bottom
      position absolute
      left 31px
      top 822px
      width 370px
      height 61px
</style>
