<template>
  <el-autocomplete
    ref="autocomplete"
    class="c-autocomplete"
    v-model="query"
    :popper-append-to-body="false"
    :fetch-suggestions="querySearch"
    :placeholder="placeholder"
    :disabled="disabled"
    :style="styleWidth"
    @select="handleSelect"
    @blur="clearInput(true)"
  >
    <i v-if="clear" @click="clearInput(false)" class="el-icon-close el-input__icon" slot="suffix" style="color: #666"></i>
    <i v-else @click="focusInput" class="el-icon-arrow-down el-input__icon" slot="suffix" style="color: #666"></i>
    <template slot-scope="{ item }">
      <div class="c-autocomplete-item">{{ item.name }}</div>
    </template>
  </el-autocomplete>
</template>
<script>
import { trim } from '@/common/js/utils'
export default {
  name: 'complete',
  props: {
    value: {
      type: [String, Number]
    },
    data: {
      type: Array
    },
    width: {
      type: [String, Number],
      default: 180
    },
    disabled: {
      type: Boolean,
      default () {
        return false
      }
    },
    placeholder: {
      type: String
    }
  },
  computed: {
    styleWidth () {
      const width = parseInt(this.width)
      return { width: `${width}px` }
    },
    clear () {
      return Boolean(trim(this.query))
    }
  },
  methods: {
    querySearch (queryString, cb) {
      const result = queryString ? this.data.filter(ret => {
        return (ret.name.toLowerCase().indexOf(queryString.toLowerCase())) === 0
      }) : this.data
      cb(result)
    },
    handleSelect (item) {
      this.query = item.name
      this.$emit('on-select', item)
    },
    clearInput (cale) {
      if (this.disabled) return
      let param = {id: '', name: ''}
      if (cale && this.query) {
        const patter = this.data.filter(ret => ret.name === this.query)
        if (patter && patter.length) {
          param = patter.pop()
        }
      }
      this.query = param.name
      this.$emit('on-select', param)
    },
    focusInput () {
      if (this.$refs && this.$refs.autocomplete) this.$refs.autocomplete.focus()
    },
    bind (id) {
      if (id) {
        const item = this.data.filter(ret => ret.id === id)
        item.length && (this.query = item.pop().name)
      } else if (id === '') {
        this.query = id
      }
    }
  },
  data () {
    return {
      query: ''
    }
  },
  watch: {
    value (nVal) {
      this.bind(nVal)
    }
  },
  created () {
    this.bind(this.value)
  }
}
</script>
<style lang="stylus" scoped>
@import "~common/styles/mixin"

.c-autocomplete
  height 28px
  line-height 28px
.el-icon-circle-close-outline, .el-icon-close, .el-icon-arrow-down
  cursor pointer
</style>
