<template>
  <Menu class="c-menu" theme="light" width="212" active-name="1">
    <MenuGroup title="子菜单1"></MenuGroup>
    <MenuGroup title="子菜单1"></MenuGroup>
    <MenuGroup title="子菜单1"></MenuGroup>
    <MenuGroup title="子菜单1"></MenuGroup>
  </Menu>
</template>
<script>
export default {
  name: 'sideMenu',
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
  height inherit
</style>
