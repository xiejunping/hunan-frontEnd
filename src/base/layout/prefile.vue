<template>
  <Poptip class="c-profile" trigger="hover" placement="bottom-end">
    <Avatar style="margin-right: 8px" icon="ios-person" />
    <Icon type="ios-arrow-down" size="18" />
    <div slot="content">
      <dl class="mene-log">
        <dd>
          <Icon type="md-home"/>
          <span> 客户中心</span>
        </dd>
        <dd>
          <Icon type="md-person"/>
          <span> 账户信息</span>
        </dd>
        <dd>
          <Icon type="md-settings"/>
          <span> 修改密码</span>
        </dd>
        <dd>
          <Icon type="md-medal"/>
          <span> 积分中心</span>
        </dd>
        <dd @click="signOut">
          <Icon type="md-log-out"/>
          <span> 退出账户</span>
        </dd>
      </dl>
    </div>
  </Poptip>
</template>
<script>
export default {
  name: 'perfile',
  props: {

  },
  methods: {
    signOut () {}
  }
}
</script>
<style lang="stylus" scoped>
@import "~assets/styles/mixin.styl"

.c-profile
  padding 0 8px
.mene-log
  width: 100%
  text-align: left
  dd
    width: 100%
    font-size: 14px
    line-height: 35px
    border-top: solid 1px #e8e8e8
    &:first-child
      border-top: none
    &:hover
      color: #2d8cf0
</style>
