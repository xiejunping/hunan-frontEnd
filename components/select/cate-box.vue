<template>
  <div class="c-cate-box">
    <div v-for="item in data" :key="item.id">
      <div
        v-if="hasChild(item)"
        :class="{'c-check-item': true, 'active': item.value === value}"
        @click="$emit('on-child', item)">
        <span>{{item.value}}</span>
        <Icon type="ios-arrow-forward" class="c-check-arrow" size="14" color="#c1c1c1" />
      </div>
      <div v-else :class="{'c-check-item': true, 'select': item.value === value}" @click="$emit('on-select', item)">{{item.value}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'cateBox',
  props: {
    value: {
      type: [String, Number]
    },
    data: {
      type: Array
    }
  },
  computed: {
    hasChild () {
      return item => item.children && item.children.length
    },
    itemClasses () {
      return item => {
        const cls = ['c-check-item']
        item.value === this.value && cls.push('')
        return cls
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~common/styles/mixin"

.c-check-item
  margin 0
  padding 0 12px
  display block
  position relative
  height 36px
  line-height 36px
  &:hover
    background-color #f8f8f8
  &.active
    color #598fe6
    background-color #f8f8f8
    .c-check-arrow
      color #598fe6 !important
  &.select
    color #ffffff
    background-color #598fe6
  .c-check-arrow
    float right
    margin-top 10px
</style>
