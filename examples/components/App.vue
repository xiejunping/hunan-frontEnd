<template>
  <div id="app">
    <Layout>
      <Header class="c-page-header">
        <TopMenu :data="menu" :current="currentModule" :sign="false"></TopMenu>
      </Header>
      <Layout>
        <Sider class="c-page-sider" hide-trigger>
          <SideMenu :data="sideMenu" :current="currentMenu"></SideMenu>
        </Sider>
        <Content class="c-page-container" ref="main">
          <router-view />
        </Content>
      </Layout>
      <Footer class="c-page-footer">
        <foot></foot>
      </Footer>
    </Layout>
  </div>
</template>
<script>
import routes from './router/routes'
import TopMenu from '@/base/layout/top-menu.vue'
import SideMenu from '@/base/layout/side-menu.vue'
import Foot from '@/base/layout/footer.vue'
export default {
  name: 'app',
  components: { TopMenu, SideMenu, Foot },
  computed: {
    currentModule () {
      let current = ''
      if (this.menu && this.menu.length) current = this.menu.filter(ret => ret.id === this.menuId).pop().name
      return current
    },
    currentMenu () {
      let menu = ''
      if (this.sideMenu && this.sideMenu.length) menu = this.sideMenu[this.sideId].name
      return menu
    }
  },
  data () {
    return {
      menu: this.$store.state.menu,
      menuId: 2,
      sideMenu: [],
      sideId: 1
    }
  },
  mounted () {
    this.sideMenu = routes.map(ret => {
      return {
        name: ret.name,
        path: ret.path,
        title: ret.meta.title
      }
    })
  }
}
</script>
<style lang="stylus" scoped>
@import "~assets/styles/mixin.styl"

#app
  height inherit
  .c-page-header
    padding 0
    background-color transparent
    margin-bottom $WrappSize
  >>>.ivu-layout
    $scroll()
    height inherit
  .c-page-sider
    background-color $WrappBgColor
  .c-page-container
    position relative
    background-color $WrappBgColor
  .c-page-footer
    background-color $footerBgColor
    margin-top $WrappSize
</style>
