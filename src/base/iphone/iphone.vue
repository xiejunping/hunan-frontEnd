<template>
  <div class="c-axure">
    <slot></slot>
    <div class="c-image-top">
      <img src="~assets/images/iphone8/u258.png" />
    </div>
    <div class="c-image-left">
      <img src="~assets/images/iphone8/u259.png" />
    </div>
    <div class="c-image-right">
      <img src="~assets/images/iphone8/u260.png" />
    </div>
    <div class="c-image-bottom">
      <img src="~assets/images/iphone8/u261.png" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'iphone'
}
</script>
<style lang="stylus" scoped>
@import "~assets/styles/mixin.styl"

.c-axure
  position absolute
  left 0
  right 0
  width 0
  height 0
  img
    width inherit
    height inherit
  .c-image-top
    position absolute
    top 20px
    left 0
    width 436px
    height 114px
  .c-image-left
    position absolute
    top 134px
    left 0
    width 31px
    height 666px
  .c-image-right
    position absolute
    top 134px
    left 406px
    width 30px
    height 666px
  .c-image-bottom
    position absolute
    left 0
    top 800px
</style>
