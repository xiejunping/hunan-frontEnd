<template>
  <div class="c-component">
    <Row class="row-item" :gutter="12">
      <Col span="3" class="col-item">
        <span class="item-field">推广时段</span>
      </Col>
      <Col span="12">
        <RadioGroup v-model="timeRange" type="button" @on-change="radioChange('weektimeData')">
          <Radio label="NONE">不限</Radio>
          <Radio label="RANGE">推广时段</Radio>
        </RadioGroup>
      </Col>
    </Row>
    <Row v-if="timeRange === 'RANGE'" class="row-item" :gutter="12">
      <Col span="3" class="col-item">&nbsp;</Col>
      <Col span="18">
        <drag-weektime
          v-model="mult_timeRange"
          :data="weektimeData"
          @on-clear="clearWeektime"></drag-weektime>
      </Col>
    </Row>
    <!-- <Row class="row-item" :gutter="12">
      <Col span="3" class="col-item">
        <span class="item-field">v-model</span>
      </Col>
      <Col span="12">
        {{mult_timeRange}}
      </Col>
    </Row> -->
    <Row class="row-item" :gutter="12">
      <Col span="3" class="col-item">
        <span class="item-field">提交数据</span>
      </Col>
      <Col span="12">
        <div style="word-break: break-all">
          {{schedule_time}}
        </div>
      </Col>
    </Row>
  </div>
</template>
<script>
import weektimeData from '@/components/drag/weektime_data'
import DragWeektime from '@/components/drag/drag-weektime'

const DATA = { weektimeData: JSON.parse(JSON.stringify(weektimeData)) }

const splicing = (list) => {
  let same
  let i = -1
  let len = list.length
  let arr = []

  if (!len) return
  while (++i < len) {
    const item = list[i]
    if (item.check) {
      if (item.check !== Boolean(same)) {
        arr.push(...['、', item.begin, '~', item.end])
      } else if (arr.length) {
        arr.pop()
        arr.push(item.end)
      }
    }
    same = Boolean(item.check)
  }
  arr.shift()
  return arr.join('')
}

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

export default {
  name: 'drag',
  components: { DragWeektime },
  computed: {
    mult_timeRange () {
      let arr = []
      this.weektimeData.forEach(item => {
        arr.push({
          id: item.row,
          week: item.value,
          value: splicing(item.child)
        })
      })
      return arr
    }
  },
  data () {
    return {
      timeRange: 'NONE',
      weektimeData: weektimeData,
      schedule_time: null
    }
  },
  watch: {
    // 投放时间段
    weektimeData: {
      handler (nVal) {
        this.schedule_time = this.getWeektime(nVal)
      },
      deep: true
    }
  },
  methods: {
    // 不限时还原默认值 - 地区组件\时间段组件
    radioChange (defautData) {
      clearTagOfData(DATA[defautData], this)
      this[defautData] = JSON.parse(JSON.stringify(DATA[defautData]))
    },
    clearWeektime () {
      this.weektimeData.forEach(item => {
        item.child.forEach(t => {
          this.$set(t, 'check', false)
        })
      })
    },
    // 处理7*48位值
    getWeektime (val) {
      const data = val.map(item => {
        return item.child.map(ret => ret.check ? '1' : '0').join('')
      })
      return data.join('')
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~assets/styles/mixin.styl"

.c-component
  padding 15px 20px

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
