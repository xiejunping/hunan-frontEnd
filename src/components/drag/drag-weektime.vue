<template>
  <div class="c-weektime">
    <div class="c-schedue"></div>
    <div :class="{'c-schedue': true, 'c-schedue-notransi': mode}" :style="styleValue"></div>

    <table class="c-weektime-table" :class="{'c-min-table': colspan < 2}">
      <thead class="c-weektime-head">
        <tr>
          <th rowspan="8" class="week-td">星期/时间</th>
          <th :colspan="12 * colspan">00:00 - 12:00</th>
          <th :colspan="12 * colspan">12:00 - 24:00</th>
        </tr>
        <tr>
          <td v-for="t in theadArr" :key="t" :colspan="colspan">{{t}}</td>
        </tr>
      </thead>
      <tbody class="c-weektime-body">
        <tr v-for="t in data" :key="t.row">
          <td>{{t.value}}</td>
          <td
            v-for="n in t.child"
            :key="`${n.row}-${n.col}`"
            :data-week="n.row"
            :data-time="n.col"
            @mouseenter="cellEnter(n)"
            @mousedown="cellDown(n)"
            @mouseup="cellUp(n)"
            :class="selectClasses(n)"
            class="weektime-atom-item">
          </td>
        </tr>
        <tr>
          <td colspan="49" class="c-weektime-preview">
            <div class="g-clearfix c-weektime-con">
              <span class="g-pull-left g-tip-text">{{selectState ? '已选择时间段' : '可拖动鼠标选择时间段'}}</span>
              <a class="g-pull-right" @click.prevent="$emit('on-clear')">清空选择</a>
            </div>
            <div v-if="selectState" class="c-weektime-time">
              <div v-for="t in selectValue" :key="t.id">
                <p v-if="t.value">
                  <span class="g-tip-text">{{t.week}}：</span>
                  <span>{{t.value}}</span>
                </p>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'dragWeektime',
  props: {
    value: {
      type: Array
    },
    data: {
      type: Array
    },
    colspan: {
      type: Number,
      default () {
        return 2
      }
    }
  },
  computed: {
    styleValue () {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
        left: `${this.left}px`,
        top: `${this.top}px`
      }
    },
    selectValue () {
      return this.value
    },
    selectState () {
      return this.value.some(ret => ret.value)
    },
    selectClasses () {
      return n => n.check ? 'ui-selected' : ''
    }
  },
  methods: {
    cellEnter (item) {
      const ele = document.querySelector(`td[data-week='${item.row}'][data-time='${item.col}']`)
      if (ele && !this.mode) {
        this.left = ele.offsetLeft
        this.top = ele.offsetTop
      } else {
        this.width = (item.col - this.col + 1) * ele.offsetWidth
        this.height = (item.row - this.row + 1) * ele.offsetHeight
      }
    },
    cellDown (item) {
      const ele = document.querySelector(`td[data-week='${item.row}'][data-time='${item.col}']`)

      this.mode = 1
      if (ele) {
        this.width = ele.offsetWidth
        this.height = ele.offsetHeight
      }

      this.row = item.row
      this.col = item.col
    },
    cellUp (item) {
      if (item.col >= this.col && item.row >= this.row) {
        this.selectWeek([this.row, item.row], [this.col, item.col])
      }

      this.width = 0
      this.height = 0
      this.mode = 0
    },
    selectWeek (row, col) {
      const [minRow, maxRow] = row
      const [minCol, maxCol] = col
      this.data.forEach(item => {
        item.child.forEach(t => {
          if (t.row >= minRow && t.row <= maxRow && t.col >= minCol && t.col <= maxCol) {
            this.$set(t, 'check', !t.check)
          }
        })
      })
    }
  },
  data () {
    return {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
      mode: 0,
      row: 0,
      col: 0,
      theadArr: []
    }
  },
  created () {
    this.theadArr = Array.from(Array(24)).map((ret, id) => id)
  }
}
</script>
<style lang="stylus" scoped>
@import "~assets/styles/mixin.styl"

.c-weektime
  min-width 640px
  position relative
  display inline-block

.c-schedue
  background #598fe6
  position absolute
  width 0
  height 0
  opacity .6
  pointer-events none
.c-schedue-notransi
  transition width .3s ease, height .3s ease

.c-weektime-table
  border-collapse collapse
  tr, td, th
    user-select none
    border 1px solid #dee4f5
    font-size 12px
    text-align center
    min-width 12px
    line-height 1.8em
    transition background .2s ease
  .c-weektime-head
    .week-td
      width 70px
  .c-weektime-body
    td
      &.weektime-atom-item
        user-select text
        background-color #f5f5f5
      &.ui-selected
        background-color #598fe6
  .c-weektime-preview
    line-height 2.4em
    padding 0 10px
    .c-weektime-con
      user-select none
    .c-weektime-time
      text-align left
      line-height 2.4em
      p
        max-width 625px
        line-height 1.4em
        word-break break-all
        margin-bottom 8px
.c-min-table
  tr, td, th
    min-width 24px
</style>
