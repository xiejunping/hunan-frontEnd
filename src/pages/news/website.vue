<template>
  <div class="c-website">
    <IPhone />
  </div>
</template>
<script>
import IPhone from '@/base/iphone/iphone.vue'
export default {
  name: 'website',
  components: { IPhone }
}
</script>
<style lang="stylus" scoped>
@import "~assets/styles/mixin.styl"

.c-website
  width 436px
  position relative
  margin 0 auto
</style>
