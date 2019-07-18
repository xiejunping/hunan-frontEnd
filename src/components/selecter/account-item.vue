<template>
  <div class="c-nodata" v-if="nodata">
    <Icon type="ios-filing-outline" size="92" color="#efefef" />
  </div>
  <div class="c-account-item" v-else>
    <div class="c-check-all m-account" :class="{'m-disabled': disabled}">
      <div class="c-item-select c-cataract" @click.stop="selectAll"></div>
      <Checkbox class="c-check-item" v-model="all" :disabled="disabled">全选</Checkbox>
    </div>
    <div v-for="item in data" :key="item.id" :class="itemClasses(item)" @click="$emit('on-child', {current: item.id, level})">
      <div v-if="iconLock" class="c-lock" @click.stop="lockItem(item)">
        <Icon type="ios-lock" size="20" color="#19be6b" v-if="item.lock" />
        <Icon type="ios-unlock-outline" size="20" color="#19be6b" v-else />
      </div>
      <div v-if="item.children && item.children.length" class="c-item c-check-item">
        <Checkbox v-model="item.check" :indeterminate="itemIndeterminate(item)" style="margin: 0 8px 0 0" :disabled="item.lock || disabled" />
        <span>{{item.name}} <ins style="color: #ff9900" v-show="count(item.children)">({{count(item.children)}})</ins></span>
        <Icon type="ios-arrow-forward" class="c-check-arrow" size="14" color="#c1c1c1" />
        <span class="c-item-checkbox c-cataract" @click="selectItem(item)"></span>
      </div>
      <div v-else class="c-item c-check-item">
        <Checkbox v-model="item.check" :disabled="item.lock || disabled" />
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { computeChild, isArray, mergeArray } from '@/common/js/utils'
export default {
  name: 'accountItem',
  props: {
    value: {
      type: [String, Number]
    },
    data: {
      type: Array
    },
    level: {
      type: Number
    },
    iconLock: {
      type: Boolean
    },
    disabled: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  computed: {
    itemClasses () {
      return item => {
        const cls = ['m-account']
        item.id === this.value && cls.push('active')
        if (this.disabled || item.lock) cls.push('m-disabled')
        return cls
      }
    },
    all () {
      const len = this.data.filter(ret => ret.check).length
      return this.data.length === len
    },
    nodata () {
      const no = Boolean(this.data.length)
      return !no
    },
    count () {
      return child => {
        const reducePlan = (ret, arr) => {
          ret.forEach(met => {
            if (met.plan && met.check) {
              const bool = arr.map(t => t.id).includes(met.id)
              !bool && arr.push(met)
            }
            if (met.children && met.children.length) arr = mergeArray(arr, reducePlan(met.children, arr))
          })
          return arr
        }
        const c = reducePlan(child, [])
        return c.length
      }
    }
  },
  methods: {
    selectAll () {
      this.$emit('on-select', {
        check: !this.all,
        level: this.level
      })
    },
    selectItem (item) {
      this.$emit('on-select', {
        check: !item.check,
        level: this.level,
        cat: item.id
      })
    },
    lockItem (item) {
      const { id, lock, children } = item
      if (isArray(children) && children.length) {
        this.$emit('on-select', {
          check: true,
          level: this.level,
          cat: id
        })
      } else this.$set(item, 'check', true)
      this.$emit('on-lock', { id, lock: !lock })
    },
    itemIndeterminate (child) {
      const hasChild = (meta) => {
        return meta.children.reduce((sum, item) => {
          let foundChilds = []
          if (item.check) sum.push(item)
          if (item.children) foundChilds = hasChild(item)
          return sum.concat(foundChilds)
        }, [])
      }
      const some = hasChild(child).length > 0
      const every = child.children && child.children.every(ret => ret.check)
      return some && !every
    }
  },
  watch: {
    data: {
      handler (nVal, oVal) {
        computeChild(nVal, this)
      },
      deep: true
    }
  },
  mounted () {
    computeChild(this.data, this)
  }
}
</script>
<style lang="stylus" scoped>
@import "~assets/styles/mixin.styl"

.c-account-item
  width 100%
  height 36px
  line-height 20px
  position relative
  .m-account
    padding 8px 12px
    display flex
    &:hover
      background-color #f8f8f8
    &.active
      color #598fe6
      background-color #f8f8f8
      .c-check-arrow
        color #598fe6 !important
    .c-item-checkbox
      width 14px
      height 100%
  .c-check-all
    width 100%
    height 36px
    position relative
    z-index 5
    .c-item-select
      width 100%
      height 100%
  .c-cataract
    display block
    position absolute
    top 0
    left 0
    z-index 8
    cursor pointer
  .m-disabled
    color #ccc
    &.active
      color #a5bada
      .c-check-arrow
        color #a5bada !important
    .c-cataract
      visibility hidden
  .c-item
    width 100%
    position relative
    z-index 5
    display flex
    justify-content flex-start
    align-items center
    span
      width calc(100% - 38px)
      line-height 20px
  .c-lock
    cursor pointer
    padding 0 8px 0 0
    display flex
    align-items center
  >>>.ivu-checkbox-indeterminate
    .ivu-checkbox-inner
      background-color #6fb3fb
      border-color #6fb3fb
.c-nodata
  width 100%
  height 100%
  display flex
  justify-content center
  align-items center
  .ivu-icon
    display inline-block
</style>
