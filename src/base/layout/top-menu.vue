<template>
  <Menu class="c-menu" mode="horizontal" theme="light" active-name="1">
    <div class="c-menu-logo">
      <a href="/"><img src="~assets/logo.png" alt=""></a>
    </div>
    <div class="c-menu-nav">
      <div class="c-sub-menu">
        <MenuItem name="1">
          <Icon type="ios-paper" />
          内容管理
        </MenuItem>
        <MenuItem name="2">
          <Icon type="ios-paper" />
          内容管理
        </MenuItem>
        <MenuItem name="3">
          <Icon type="ios-paper" />
          内容管理
        </MenuItem>
        <Submenu name="4">
          <template slot="title">
            <Icon type="ios-stats" />
            下拉菜单
          </template>
          <MenuGroup>
            <MenuItem name="4-1">4-1</MenuItem>
            <MenuItem name="4-2">4-2</MenuItem>
            <MenuItem name="4-3">4-3</MenuItem>
          </MenuGroup>
        </Submenu>
      </div>
      <Prefile>

      </Prefile>
    </div>
  </Menu>
</template>
<script>
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
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~assets/styles/mixin.styl"

.c-menu
  display flex
  flex auto
  .c-menu-logo
    width 220px
    flex 0 0 220px
    text-align center
    img
      height 44px
  .c-menu-nav
    flex auto
    display flex
    justify-content flex-end
    padding-right 15px
</style>
