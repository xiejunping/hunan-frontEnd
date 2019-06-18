<template>
  <div>
    <PDF :src="src"></PDF>
  </div>

</template>

<script>
import PDF from 'vue-pdf/src/vuePdfNoSss.vue'
const loadingTask = PDF.createLoadingTask({url: 'https://pdf-book-1252359508.cos.ap-shanghai.myqcloud.com/pdf/%5B%E4%BB%A3%E7%A0%81%E6%95%B4%E6%B4%81%E4%B9%8B%E9%81%93%5D.(%E7%BE%8E)%E9%A9%AC%E4%B8%81.%E6%89%AB%E6%8F%8F%E7%89%88.pdf'})
export default {
  name: 'ipdf',
  components: { PDF },
  data () {
    return {
      src: ''
    }
  },
  created () {
    console.log(this.$route)
    // this.src = PDF.createLoadingTask(this.$route.query.src)
    this.src = loadingTask
  }
}
</script>
<style lang="stylus" scoped>

</style>
