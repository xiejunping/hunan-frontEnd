<template>
  <div>
    <PDF :src="src"></PDF>
  </div>

</template>

<script>
import PDF from 'vue-pdf/src/vuePdfNoSss.vue'
export default {
  name: 'ipdf',
  components: { PDF },
  data () {
    return {
      src: ''
    }
  },
  created () {
    this.src = PDF.createLoadingTask(this.$route.query.src)
  }
}
</script>
<style lang="stylus" scoped>

</style>
