<template>
  <Poptip class="c-profile" placement="bottom-end">
    <Avatar style="margin-right: 8px" icon="ios-person" />
    <template v-if="sign">
      <Icon type="ios-arrow-down" size="18" />
      <div slot="content">
        <slot></slot>
      </div>
    </template>
    <template v-else>
      <a @click="$emit('on-login')" class="c-text"><span>登录</span></a>
    </template>
  </Poptip>
</template>
<script>
export default {
  name: 'perfile',
  props: {
    sign: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  methods: {

  }
}
</script>
<style lang="stylus" scoped>
@import "~assets/styles/mixin.styl"

.c-profile
  padding 0 8px
  .c-text
    color #666
    &:hover
      color #2d8cf0
</style>
