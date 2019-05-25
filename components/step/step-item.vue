<template>
  <div class="c-step-item" :class="createdClass">
    <div class="step-item-title">
      <span>{{title}}</span>
      <img v-if="completed" :src="completeSvg" alt="" />
    </div>
    <div class="step-item-sub">
      <ul>
        <li
          v-for="t in sub"
          :key="t.id"
          @click="$emit('on-href', t)"
          :class="subActiveClass(t)">
          {{t.name}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import completeSvg from '@/assets/complete.svg'
export default {
  name: 'stepItem',
  props: {
    value: {
      type: [String, Number]
    },
    title: {
      type: String
    },
    sub: {
      type: Array
    },
    completed: {
      type: Boolean
    },
    active: {
      type: Boolean
    }
  },
  computed: {
    createdClass () {
      if (this.completed) return 'complete'
      else if (this.completed || this.active) return 'creat'
      else return 'forbidden'
    },
    subActiveClass () {
      return t => {
        return this.value === t.href ? 'active' : ''
      }
    }
  },
  data () {
    return {
      completeSvg
    }
  }
}
</script>
<style lang="stylus" scoped>
.c-step-item
  user-select none
  padding 24px 24px 32px
  border-bottom 1px solid #eaeaea
  &.creat
    background-color #f8f8f8
  &.forbidden
    cursor not-allowed
    .step-item-title, .step-item-sub ul li
      &:hover
        cursor not-allowed
      color #c1c1c1
  .step-item-title
    position relative
    color #333
    font-size 16px
    font-weight 500
    margin-bottom 12px
    img
      height 18px
      position absolute
      top -2px
      right 0
      display block
  .step-item-sub
    ul
      margin 0 50px 0 0
      padding 0
      li
        font-weight 300
        margin-bottom 4px
        display block
        font-size 14px
        color #666
        line-height 1.4
        user-select none
        cursor pointer
        &.active
          color #598fe6
</style>
