<template>
  <div id="app">
    <Layout>
      <Header class="c-page-header">
        <TopMenu :data="a" :current="b"></TopMenu>
      </Header>
      <Layout>
        <Sider class="c-page-sider" hide-trigger>
          <SideMenu :data="a" :current="b"></SideMenu>
        </Sider>
        <Content>

          <router-view />
        </Content>
      </Layout>
      <Footer class="c-page-footer"></Footer>
    </Layout>
  </div>
</template>
<script>
import TopMenu from '@/base/layout/top-menu.vue'
import SideMenu from '@/base/layout/side-menu.vue'
export default {
  name: 'app',
  components: { TopMenu, SideMenu },
  data () {
    return {
      a: [],
      b: 0
    }
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
  .c-page-footer
    background-color $footerBgColor
    margin-top $WrappSize
</style>
