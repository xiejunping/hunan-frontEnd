<template>
  <div class="c-selecter">
    <Row :gutter="12">
      <Col span="16">
        <Row>
          <Col
            :span="col"
            v-for="(box, idx) in resource"
            :key="idx">
            <select-item :title="box.title">
              <select-box
                v-model="box.current"
                :data="box.data"
                :level="box.level"
                @on-child="pushChild"
                @on-select="selectAll" />
            </select-item>
          </Col>
        </Row>
      </Col>
      <Col span="7" offset="1">
        <select-item
          v-if="resultLen && transfer"
          title="已选"
          clear
          @on-clear="$emit('on-clear', {list: data})">
          <div
            v-for="item in result"
            :key="item.id"
            class="c-pop-tip">
            <Tag
              :name="item.value"
              closable
              class="c-tag-item"
              @on-close="handleClose">{{item.value}}</Tag>
          </div>
        </select-item>
      </Col>
    </Row>
  </div>
</template>
<script>
import SelectItem from './select-item.vue'
import SelectBox from './select-box.vue'
export default {
  name: 'selecter',
  components: { SelectItem, SelectBox },
  props: {
    value: {
      type: Array
    },
    title: {
      type: Array
    },
    data: {
      type: Array
    },
    transfer: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      resource: []
    }
  },
  computed: {
    col () {
      return 24 / this.resource.length
    },
    result () {
      return this.value
    },
    resultLen () {
      return Boolean(this.value.length)
    }
  },
  watch: {
    data (nVal) {
      if (nVal && nVal.length) this.updateResource()
      else this.resource = []
    }
  },
  methods: {
    updateResource () {
      this.resource = []
      this.resource.push({
        data: this.data,
        current: '',
        level: 1,
        title: this.title[0]
      })
    },
    handleClose (event, name) {
      this.$emit('on-delete', {list: this.data, name})
    },
    selectAll ({level, check, cat}) {
      let index = level - 2
      let current = index > -1 ? this.resource[index].current : ''
      cat && (current = cat)
      this.$emit('on-select', {
        check,
        current,
        list: this.data
      })
    },
    pushChild (params) {
      const {item, level} = params
      const len = this.resource.length
      if (level <= len - 1) {
        this.resource.splice(level, len - level)
      }
      this.resource.push({
        data: item.children,
        current: '',
        level: level + 1,
        title: this.title[level] || item.value
      })
      this.resource[level - 1].current = item.value
    }
  },
  created () {
    this.updateResource()
  }
}
</script>
<style lang="stylus" scoped>
@import "~assets/styles/mixin.styl"

.c-pop-tip
  width 100%
.c-tag-item
  width 90%
  margin 8px 8px 0
  padding 2px 6px
  display block
  font-size 14px
  height 28px
  >>>span.ivu-tag-text
    $no-wrap()
    width calc(100% - 22px)
    display inline-block
  >>>.ivu-icon-ios-close
    top -8px
</style>
