<template>
  <div class="c-moduler" :ref="name">
    <div class="c-moduler-range">
      <div class="c-moduler-title">
        {{title}}
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'moduler',
  props: {
    title: {
      type: String
    },
    name: {
      type: String
    },
    media: {
      type: Number,
      default () {
        return 10
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.setModuler()
    })
  },
  methods: {
    setModuler () {
      const top = this.$refs[this.name].offsetTop
      const height = this.$refs[this.name].offsetHeight
      const [min, max] = [top, top + height]
      let storeName
      if (this.media === 10) storeName = 'Toutiao'
      else if (this.media === 6) storeName = 'UC'
      else if (this.media === 16) storeName = 'Tencent'
      else if (this.media === 45) storeName = 'Baidu'
      this.$store.commit(`${storeName}/setModulerLinks`, {
        name: this.name,
        min: min < 40 ? 0 : (min - 12),
        max
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~assets/styles/mixin.styl"

.c-moduler
  $submit-btn()
  margin-bottom 12px
  position relative
  padding 36px 24px 48px 48px
  &:last-child
    margin-bottom 0
  .c-moduler-title
    font-size 22px
    margin-bottom 36px
    line-height 30px
</style>
