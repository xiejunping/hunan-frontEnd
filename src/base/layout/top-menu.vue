<template>
  <Menu class="c-menu" mode="horizontal" theme="light" :active-name="current">
    <div class="c-menu-logo">
      <a href="/">
        <img src="~assets/logo.png" alt="" />
        <span class="h1">技术客栈</span>
      </a>
    </div>
    <div class="c-menu-nav">
      <div class="c-sub-menu">
        <template v-for="menu in data">
          <Submenu v-if="menu.children && menu.children.length" :key="menu.id" :name="menu.name">
            <template slot="title">
              {{menu.value}}
            </template>
            <MenuItem
              v-for="childMenu in menu.children"
              :key="childMenu.id"
              :name="childMenu.name"
              :to="`${childMenu.name}.html`">{{childMenu.value}}</MenuItem>
          </Submenu>
          <MenuItem v-else :name="menu.name" :key="menu.id" :to="`${menu.name}.html`">
            {{menu.value}}
          </MenuItem>
        </template>
      </div>
      <Prefile class="info-menu" :sign="sign" @on-login="toHref('login')">
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
      </Prefile>
    </div>
  </Menu>
</template>
<script>
import { toHref } from '@/common/js/utils/assist'
import Prefile from './prefile.vue'
export default {
  name: 'topMenu',
  components: { Prefile },
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    current: {
      type: [Number, String]
    },
    sign: {
      type: Boolean
    }
  },
  methods: {
    toHref (name) {
      toHref(name)
    },
    signOut () {}
  }
}
</script>
<style lang="stylus" scoped>
@import "~assets/styles/mixin.styl"

.c-menu
  display flex
  flex auto
  height 63px
  .c-menu-logo
    width 220px
    flex 0 0 220px
    text-align center
    img
      height 44px
    .h1
      font-size 22.5px
      margin-left 12px
  .c-menu-nav
    flex auto
    display flex
    justify-content flex-end
    padding-right 15px
    .mene-log
      width 100%
      text-align left
      dd
        width 100%
        font-size 14px
        line-height 35px
        border-top solid 1px #e8e8e8
        &:first-child
          border-top none
.info-menu
  margin-left 32px
</style>
