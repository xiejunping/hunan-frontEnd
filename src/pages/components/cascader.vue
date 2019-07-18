<template>
  <div class="c-cascader">
    <div class="m-compont">
      <h1>如何实现一个这样的级联组件</h1>
    </div>
    <Row class="row-item" :gutter="12">
      <Col span="3" class="col-item">
        <span class="item-field">选择地区</span>
      </Col>
      <Col span="19">
        <selecter
          v-model="mult_city"
          :data="regionData"
          :title="['国家', '省份', '城市', '县（区）']"
          @on-select="selectAll"
          @on-delete="delTag"
          @on-clear="clearTag" />
      </Col>
    </Row>

  </div>
</template>
<script>
import Region from '@/data/city_province'
import Selecter from '@/components/select/selecter'

// 数据中搜索
const getKeyOfData = (list, key, value) => {
  let i = -1
  let len = list.length
  let homeItem = {}

  while (++i < len) {
    let item = list[i]

    if (item[key] === value) {
      homeItem = item
      break
    } else if (item.children && item.children.length) {
      let res = getKeyOfData(item.children, key, value)
      if (res[key]) return res
    }
  }

  return homeItem
}

// 过滤选中
const findCheck = (list, arr = []) => {
  list.forEach(ret => {
    if (ret.check) arr.push(ret)
    else if (ret.children && ret.children.length !== 0) {
      findCheck(ret.children, arr)
    }
  })
  return arr
}

export default {
  name: 'cascader',
  components: { Selecter },
  computed: {
    mult_city () {
      return findCheck(this.regionData)
    }
  },
  data () {
    return {
      regionData: Region,
      regions: []
    }
  },
  methods: {
    // 全选
    selectAll ({list, check = true, current = ''}) {
      let data
      // 无限递归
      const setAllChecked = (data, check, Vue) => {
        data.forEach(ret => {
          if (ret.children && ret.children.length) setAllChecked(ret.children, check, Vue)
          Vue.$set(ret, 'check', check)
        })
      }
      if (current) {
        const item = getKeyOfData(list, 'value', current)
        data = item.children
      } else data = list
      setAllChecked(data, check, this)
    },
    // 删除已选
    delTag ({list, name}) {
      const data = getKeyOfData(list, 'value', name)
      if (data.children && data.children.length) {
        this.selectAll({list, check: false, current: data.value})
      } else {
        this.$set(data, 'check', false)
      }
    },
    // 清空全部
    clearTag ({list}) {
      const clearTagOfData = (list, Vue) => {
        let i = -1
        let len = list.length
        while (++i < len) {
          let item = list[i]
          if (item.children && item.children.length) {
            clearTagOfData(item.children, Vue)
          }
          Vue.$set(item, 'check', false)
        }
      }
      clearTagOfData(list, this)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~assets/styles/mixin.styl"

.c-cascader
  padding 15px 20px
  .m-compont
    line-height 45px
    padding 40px 15px
/* 表单选项 */
.row-item
  display flex
  justify-content flex-start
  align-items center
  margin-bottom 32px
  .col-item
    text-align right
  i
    margin-right 4px
    vertical-align middle
    &.ivu-icon-md-add
      margin 0
  .item-field
    font-size 14px
    padding-right 12px
  /* 必填项 */
  .row-item-must
    position relative
    z-index 5
    &:after
      content " "
      display inline-block
      width 4px
      height 4px
      position absolute
      top 6px
      right 0
      background-color #f45858
      border-radius 3px
</style>
