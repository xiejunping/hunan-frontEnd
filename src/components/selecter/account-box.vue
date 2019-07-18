<template>
  <div class="c-account-box">
    <div class="c-header">
      <span>{{title}}</span>
    </div>
    <div class="c-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'accountBox',
  props: {
    title: {
      type: String
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~assets/styles/mixin.styl"

.c-account-box
  background-color #fff
  .c-header
    padding 0 12px
    height 34px
    font-size 14px
    color #333
    border-bottom 1px solid #e8eaec
    background-color #f8f8f8
    span
      line-height 34px
      vertical-align middle
  .c-content
    $scroll()
    height 368px
    width 100%
    padding-bottom 8px
</style>
