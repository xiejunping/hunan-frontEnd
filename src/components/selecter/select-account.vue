<template>
  <Modal
    v-model="state"
    :title="title"
    :mask-closable="false"
    width="920"
    class-name="vertical-center-modal"
    @on-visible-change="updateResource">
    <Row class-name="m-wrap">
      <Col span="8" v-for="(box, idx) in resource" :key="idx" class-name="m-box">
        <account-box :title="box.title">
          <account-item
            v-model="box.current"
            :data="box.data"
            :level="box.level"
            :icon-lock="box.lock"
            :disabled="box.disabled"
            @on-lock="changeLock"
            @on-child="pushChild"
            @on-select="selectAll" />
        </account-box>
      </Col>
    </Row>
    <template slot="footer">
      <div class="m-foot">
        <Button @click="$emit('input', false)">取消</Button>
        <Button type="primary" :loading="loading" @click="asyncOk">
          <span v-if="loading">提交中...</span>
          <span v-else>确认</span>
        </Button>
      </div>
    </template>
  </Modal>
</template>
<script>
import AccountBox from './account-box'
import AccountItem from './account-item'
export default {
  name: 'selectAccount',
  components: { AccountBox, AccountItem },
  props: {
    value: {
      type: Boolean
    },
    data: {
      type: Array,
      default () {
        return []
      }
    },
    len: {
      type: Number
    },
    account: {
      type: Number
    },
    loading: {
      type: Boolean,
      default () {
        return false
      }
    },
    asyneble: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  computed: {
    state: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    title () {
      const subTitle = this.len ? `  （共选择计划${this.len}个，${this.account}个账号）` : ''
      return `选择账号计划 ${subTitle}`
    }
  },
  methods: {
    updateResource (val) {
      if (val) {
        let current = this.data[0].id
        this.resource[0].data = this.data
        this.data.some(ret => {
          const hasCheck = ret.children && ret.children.some(met => {
            return met.children && met.children.some(t => t.check)
          })
          if (hasCheck) {
            current = ret.id
            return true
          }
        })
        this.pushChild({ level: 1, current })
      }
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
    pushChild ({level, current}) {
      const len = this.resource.length
      const append = []
      this.resource.splice(level, len - level)
      this.resource[level - 1].current = current
      if (level === 1) { // 账号
        const { children, lock } = this.data.filter(ret => ret.id === current).pop()
        if (children.length) {
          const child = children[0].id
          const items = children[0].children
          append.push({
            title: '广告组/计划',
            level: 2,
            current: child,
            disabled: lock,
            data: children
          })
          append.push({
            title: '广告计划/单元',
            level: 3,
            current: '',
            disabled: lock,
            data: items
          })
        } else { // 空账号
          append.push({
            title: '广告组/计划',
            level: 2,
            current: '',
            disabled: lock,
            data: []
          })
          append.push({
            title: '广告计划/单元',
            level: 3,
            current: '',
            disabled: lock,
            data: []
          })
        }
      } else if (level === 2) {
        const { children, lock } = this.data.filter(ret => ret.id === this.resource[0].current).pop()
        const items = children.filter(ret => ret.id === current).pop()
        append.push({
          title: '广告计划/单元',
          level: 3,
          current: '',
          disabled: lock,
          data: items.children
        })
      }

      this.resource.push(...append)
    },
    changeLock ({id, lock}) {
      const item = this.data.filter(ret => ret.id === id).pop()
      this.$set(item, 'lock', lock)
      if (id === this.resource[0].current) this.pushChild({level: 1, current: id})
    },
    asyncOk () {
      if (this.asyneble) this.$emit('on-change')
      else this.$emit('input', false)
    }
  },
  data () {
    return {
      resource: [
        {
          title: '账号',
          level: 1,
          lock: true,
          current: 442,
          data: []
        },
        {
          title: '广告组/计划',
          level: 2,
          current: '',
          data: []
        },
        {
          title: '广告计划/单元',
          level: 3,
          current: '',
          data: []
        }
      ]
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~assets/styles/mixin.styl"

>>>.ivu-modal
  position relative
  z-index 99
.m-wrap
  border-bottom 1px solid #e8eaec
  border-right 1px solid #e8eaec
  .m-box
    border-top 1px solid #e8eaec
    border-left 1px solid #e8eaec
</style>
