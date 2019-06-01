<template>
  <div id="app">
    <Layout>
      <Header>

      </Header>
      <Layout>
        <Content>

          <router-view />
        </Content>
        <Sider hide-trigger>

        </Sider>
      </Layout>
      <Footer></Footer>
    </Layout>
  </div>
</template>
<script>
export default {
  name: 'app'
}
</script>
<style lang="stylus" scoped>

</style>
