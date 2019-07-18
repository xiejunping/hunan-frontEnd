# 如何实现一个这样的级联组件

Vue封装组件系列文章
- [如何实现一个这样的级联组件](https://segmentfault.com/a/1190000019801886)

## 组件背景

根据产品原型实现一个级联组件，下面看演示图

![级联组件](https://user-gold-cdn.xitu.io/2019/7/18/16c040f88d020fc3?w=1435&h=729&f=gif&s=840726)

> 应用场景很多，如：后台管理系统，旅游系统，广告投放系统，营销系统...等，现在流行`Vue`，`React` ， `Anagular` 三大框架，下面看看怎么使用`Vue`实现

## 实现逻辑
产品经理的评审功能需求如下
* 根据大分类到子分类层级选择，无层级限制（根据UI的横板宽度，适合做多级，但深度很深的场景并不多）
* 每个层级支持全选，根据子级可以推导全选项选中，并对其父级执行选中操作
* 已选层级可显示出结果列表，可对其结果操作，并有快速清空结果功能
* 分类名称字数并不做限制，待选区域分类名称应在该项中居中显示，长度过长换行显示
* 结果选项结构简化，每项固定一行，过长在尾部出现`...`代表过长，鼠标移上时显示全部内容

## 思路
Vue.js 的核心包括一套“响应式系统”。

"响应式"，开发思路跟Jquery的开发思路完全不同。

“响应式”，是指当数据改变后，Vue 会通知到使用该数据的代码。例如，视图渲染中使用了数据，数据改变后，视图也会自动更新。

根据地区数据 `JSON` 可以看出其结构

```js
[
  {
    "value": "中国",
    "key": 1156,
    "id": 1156,
    "children": [
      {
        "value": "北京市",
        "id": 10000,
        "key": 10000,
        "children": []
      },
      {
        "value": "河北省",
        "key": 200107,
        "id": 200107,
        "children": [
          {
            "value": "石家庄",
            "key": 20010701,
            "id": 20010701
          },
          {
            "value": "唐山市",
            "key": 20010702,
            "id": 20010702,
            "children": [
               {
                  "value": "路南区",
                  "key": 2001070201,
                 "id": 2001070201,
                  "children": []
               }
            ]
          }
        ]
      }
    ]

```

* 中国
  * 直辖市
  * xx省
    * xx市
      * xx区
    * xx市
      * xx县

### 待选数据组件
这是一个循环嵌套的数据对象，而组件嵌套似乎不能满足产品需求，如果使用数组来代替层级，似乎可以解决数据嵌套的问题

array =>  level 1  -> level 2  -> level 3 -> level 4

level 1    =>  current，  children  =>  level 2 (array)
level 2   =>   current， children  =>   level 3 (array)
...

>每个`level` 都是一个整体，
- 有标题 `title`
- 有全选 计算data中是否都选中 `select`
- 子集的集合数据 `data`
- 有当前选中 `current`
- 标记当期层级 数组的索引  `level`

首先定义个空的数组代表组件

`const array = []`

把数据处理成数组格式就能展开这个组件，那怎么处理数据呢
初始化组件时不是所有都显示，必须让用户选择当前一个顶级大类

拿到所有顶级大类，并构建第一个元素

- title = 省级
- data = 顶级大类
- current = 空
- level = 1
- select = false

`array.push({title, select, data, current, level})`

在选择顶级大类时，给这个数组增加其一个子集元素

`array.push({title, select, data, current, level})`
...

依次类推

### 结果选择器
获取组件的选择结果，
可以过滤数据的check 属性得到，
可使用Vue的计算属性得知随时的结果

结果选择框可以直接绑定已选的计算组件，可构建结果UI

## 组件构想
  * 主组件
  * 布局组件
  * 选择项

### 主组件 Selecter
用来负责组件框架， 左右分栏，
左边是选择区域，  右边是结果区域
这个是组件引用层，统一对外提供导入props  `数据` 和 导出的 emit `事件`
组件需要做到完全配置化，内部所以参数需要被抽象

  * 选择区
  更具层级平均分配空间，所有在横向固定空间中，不能做过多的层级，太窄了没法显示
 因为需要循环显示其层级，抽离层级为布局组件，布局组件由 `标题` 和  `滚动的选择区域` 组成

  * 结果区
  在有选择时才显示，有标题栏显示，结果区可统计结果个数，选择项使用Tag标签，支持快速删除，建立纵向滚动条
  可使用布局组件 与选择区保持风格统一，


### 布局组件 box
要兼容选择区与结果区使用，所以统计个数得有开关控制，
边框，颜色 UI 控制

抽象  清空按钮UI
抽象  统计个数UI

### 选择项（子组件）item
最关键的组件就算这个了

## 逻辑

### 双向绑定
v-model 绑定数据的好处是： 数据在内部发生了改变，而在原始端同样改变了，只要使用就可以了，
当然在使用上也有些不方便的地方，
props导入的数据，通过什么props 属性接收呢， `value`
```js
...
props: {
  value: {
    type: Array
  }
}
...
```
在组件内部是不能Set 改变的，只能通过事件传到父组件中来
通过什么方法名来传呢， `input` (初级很多人不知道)
`this.$emit('input', val)`



### 原始数据构建选择层级组件
  在初始化过程中，构建第一层级组件的  `title`  `data`   `current`   `level`
  假使省市json 数据为 `cityJson` 构建第一层级的data
```js
const data = this.cityJson.map(ret => {
  delete ret.children
  return ret
})
```
  当用户选择层级的 `item` 时触发  动作新增层级数据
  当用户选中层级的 `item` 时触发  动作新增层级数据  选中该层级下所有数据

### 全选
### 清空
### 删除

## 代码

* 主组件 Selecter

```js
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
```

* 布局组件 box
```js
<template>
  <div class="c-select-item">
    <div class="c-header">
      <span class="c-header-title">{{title}}</span>
      <span class="c-header-clear" v-if="clear" @click="$emit('on-clear')">清空全部</span>
    </div>
    <div class="c-selecter-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'selectItem',
  props: {
    title: {
      type: String
    },
    clear: {
      type: Boolean
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~assets/styles/mixin.styl"

.c-select-item
  background-color #fff
  border solid 1px #dee4f5
  .c-header
    padding 0 12px
    height 34px
    font-size 14px
    color #333
    border-bottom solid 1px #dee4f5
    background-color #fafbfe
    .c-header-title, .c-header-clear
      height 34px
      line-height 34px
      vertical-align middle
    .c-header-clear
      color #598fe6
      float right
      cursor pointer
  .c-selecter-content
    $scroll()
    height 246px
    width 100%
    padding-bottom 8px
</style>
```


* 选择项（子组件）item
```js
<template>
  <div class="c-select-box">
    <div class="c-check-all">
      <div class="c-item-select c-cataract" @click="selectAll"></div>
      <Checkbox class="c-check-item" v-model="all">全选</Checkbox>
    </div>
    <div v-for="item in data" :key="item.id">
      <div v-if="item.children && item.children.length" :class="itemClasses(item)" @click="$emit('on-child', {item, level})">
        <Checkbox v-model="item.check" :indeterminate="itemIndeterminate(item)"></Checkbox>
        <span>{{item.value}}</span>
        <Icon type="ios-arrow-forward" class="c-check-arrow" size="14" color="#c1c1c1" />
        <span class="c-item-checkbox c-cataract" @click="selectItem(item)"></span>
      </div>
      <Checkbox v-else class="c-check-item" v-model="item.check">{{item.value}}</Checkbox>
    </div>
  </div>
</template>
<script>

const computeChild = (list, Vue) => {
  list.forEach(item => {
    if (item.children && item.children.length) {
      const child = item.children
      if (child.every(ret => ret.check)) Vue.$set(item, 'check', true)
      else Vue.$set(item, 'check', false)
      computeChild(child, Vue)
    }
  })
}

export default {
  name: 'selectBox',
  props: {
    value: {
      type: [String, Number]
    },
    data: {
      type: Array
    },
    level: {
      type: Number
    }
  },
  computed: {
    itemClasses () {
      return item => {
        const cls = ['c-check-item']
        item.value === this.value && cls.push('active')
        return cls
      }
    },
    all () {
      const len = this.data.filter(ret => ret.check).length
      return this.data.length === len
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
        cat: item.value
      })
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

.c-cataract
  display block
  position absolute
  top 0
  left 0
  z-index 8
  cursor pointer
.c-check-all
  width 100%
  height 36px
  position relative
  z-index 9
  &:hover
    .c-check-item
      background-color #f8f8f8
  .c-item-select
    width 100%
    height 100%
.c-check-item
  margin 0
  padding 0 12px
  display block
  position relative
  height 36px
  line-height 36px
  &:hover
    background-color #f8f8f8
  &.active
    color #598fe6
    background-color #f8f8f8
    .c-check-arrow
      color #598fe6 !important
  .c-check-arrow
    float right
    margin-top 10px
  .c-item-checkbox
    width 36px
    height 36px
.c-select-box >>>.ivu-checkbox-indeterminate
  .ivu-checkbox-inner
    background-color #6fb3fb
    border-color #6fb3fb
</style>
```

## 优化体验

* 半选功能
* 行内文本过长，换行显示优化

## 经验总结

