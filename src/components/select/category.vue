<template>
  <div class="c-category">
    <Row :gutter="12" class="c-input-box">
      <Input v-model="selectValue" placeholder="">
        <Button
          v-if="extend"
          type="text"
          icon="md-arrow-dropup"
          slot="append">收起</Button>
        <Button
          v-else
          type="text"
          icon="md-arrow-dropdown"
          slot="append">展开</Button>
      </Input>
      <div class="c-select-cataract" @click="extend = !extend"></div>
    </Row>
    <Row v-if="extend" :gutter="12">
      <Col
        :span="col"
        v-for="(box, idx) in resource"
        :key="idx">
        <select-item :title="box.title">
          <cate-box
            v-model="box.current"
            :data="box.data"
            @on-child="pushChild"
            @on-select="selectItem" />
        </select-item>
      </Col>
    </Row>
  </div>
</template>
<script>
import SelectItem from './select-item.vue'
import CateBox from './cate-box.vue'
export default {
  name: 'category',
  components: { SelectItem, CateBox },
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    title: {
      type: [String, Array]
    },
    data: {
      type: Array
    }
  },
  computed: {
    selectValue () {
      return this.value && this.value.map(ret => ret.value).reverse().join(',')
    },
    col () {
      return 24 / this.resource.length
    }
  },
  methods: {
    selectItem (item) {
      const arr = [item]
      const { parent, level } = item

      if (level > 2) {
        const parentItem = this.resource[level - 2].data.filter(ret => ret.id === parent)
        arr.push(...parentItem)
        const pop = parentItem.pop()
        const rootItem = this.resource[0].data.filter(ret => ret.id === pop.parent)
        arr.push(...rootItem)
      } else if (level === 2) {
        const parentItem = this.resource[0].data.filter(ret => ret.id === parent)
        arr.push(...parentItem)
      }
      this.resource[level - 1].current = item.value
      this.extend = false
      this.$emit('on-select', arr)
    },
    pushChild (item) {
      const { level } = item
      const len = this.resource.length
      if (level <= len - 1) {
        this.resource.splice(level, len - level)
      }
      this.resource.push({
        data: item.children,
        current: '',
        title: this.title[level] || item.value
      })
      this.resource[level - 1].current = item.value
    }
  },
  data () {
    return {
      resource: [],
      extend: null
    }
  },
  created () {
    if (this.value && this.value.length) {
      // 编辑
      let len = this.value.length
      this.resource.push({
        data: this.data,
        current: this.value[len - 1].value,
        title: this.title[0] || this.title
      })
      while (--len > 0) {
        const item = this.value[len]
        this.resource.push({
          data: item.children,
          current: this.value[len - 1].value,
          title: this.title[item.level - 1] || item.value
        })
      }
    } else {
      this.resource.push({
        data: this.data,
        current: '',
        title: this.title[0] || this.title
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~common/styles/mixin"

.c-input-box
  padding 0 5px
  padding-bottom 10px
  position relative
.c-select-cataract
  position absolute
  z-index 8
  width 100%
  height 32px
  top 0
  left 0
  cursor pointer
</style>
