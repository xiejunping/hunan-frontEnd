<template>
  <Menu class="c-menu" theme="light" width="212" :active-name="current">
    <template v-for="(menu, id) in data">
      <MenuGroup
        :title="menu.title"
        :key="id"
        v-if="menu.children && menu.children.length">
        <MenuItem
          v-for="(t, i) in menu.children"
          :key="i"
          :name="t.name"
          :to="t.name">{{t.title}}</MenuItem>
      </MenuGroup>
      <MenuItem
        :name="menu.name"
        :to="menu.name"
        :key="id"
        v-else>{{menu.title}}</MenuItem>
    </template>
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
    },
    current: {
      type: String
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~assets/styles/mixin.styl"

.c-menu
  height inherit
</style>
