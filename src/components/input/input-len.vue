<template>
  <div class="c-len" :class="{'c-len-large': lenLarge}" :style="styleValue">
    <Input
      ref="input"
      class="c-input"
      v-model="data"
      autocomplete="on"
      :disabled="disabled"
      :placeholder="placeholder"
      @on-blur="itrim(data)" />
    <span class="c-length">
      <ins :class="{'c-text-err': lenStat}">{{len}}</ins>/{{max}}
    </span>
  </div>
</template>
<script>
import { getByteLen, trim } from '@/common/js/utils'
export default {
  name: 'clen',
  props: {
    value: {
      type: String
    },
    placeholder: {
      type: String
    },
    disabled: {
      type: Boolean,
      default () {
        return false
      }
    },
    width: {
      type: [Number, String]
    },
    max: {
      type: Number
    },
    bc: {
      type: Boolean,
      default () {
        return false
      }
    },
    charset: {
      type: String,
      default () {
        return 'gb2312'
      }
    }
  },
  computed: {
    data: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    styleValue () {
      return {
        width: `${this.width}px`
      }
    },
    len () {
      let charLen
      if (this.charset === 'utf-8') charLen = 3
      else if (this.charset === 'init') charLen = 1
      else charLen = 2
      return this.bc ? Math.ceil(getByteLen(this.data) / charLen) : getByteLen(this.data, charLen)
    },
    lenStat () {
      return this.len > this.max
    },
    lenLarge () {
      return this.max > 99
    }
  },
  methods: {
    focus () { // Api public
      console.log(this.$refs.input)
      this.$refs.input.focus()
    },
    itrim (val) {
      this.$emit('input', trim(val))
      this.$emit('inputlen', this.len)
    }
  }
}
</script>
<style lang="stylus">
@import "~common/styles/mixin"
.c-len
  position relative
  height inherit
  display inline-block
  input
    padding-right 36px
  .c-length
    position absolute
    right 0
    top 0
    padding 0 4px
    line-height 32px
    color #8e8e8e
    .c-text-err
      color #ff4900
  &.c-len-large
    input
      padding-right 50px
</style>
