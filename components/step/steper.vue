<template>
  <div class="c-step">
    <step-item
      v-for="item in menu"
      v-model="subCurrent"
      :key="item.id"
      :title="item.name"
      :sub="item.children"
      :active="current(item)"
      @on-href="scrollTo"
      :completed="Boolean(item.state)"></step-item>
  </div>
</template>
<script>
import stepItem from './step-item.vue'
export default {
  name: 'steper',
  components: { stepItem },
  props: {
    menu: {
      type: Array
    },
    currentName: {
      type: String
    },
    subCurrent: {
      type: [String, Number]
    }
  },
  computed: {
    current () {
      return item => this.currentName === item.href
    }
  },
  methods: {
    scrollTo (item) {
      this.$emit('on-href', item)
    }
  }
}
</script>
<style lang="stylus" scoped>
.c-step
  height 100%
  background-color #fff
  border-right 1px solid #eaeaea
</style>
