<template>
  <div class="c-website">
    <input type="color" />
    <chrome-picker :value="colors"></chrome-picker>
    <draggable v-model="myArray">
      <transition-group type="transition" name="flip-list">
        <div v-for="element in myArray" :key="element.id">
            {{element.name}}
            <img :src="element.src" width="375" alt="" />
        </div>
      </transition-group>
    </draggable>
    <!-- <IPhone theme="iphoneX" src="https://m.weibo.cn/?jumpfrom=weibocom" /> -->
  </div>
</template>
<script>
import IPhone from '@/base/iphone/iphone.vue'
export default {
  name: 'website',
  components: { IPhone },
  data () {
    return {
      colors: '#ff6600',
      myArray: [
        {
          id: 1,
          name: '第一图',
          src: 'http://fc-feed.cdn.bcebos.com/0/pic/f8521e0b9b5cd85b70a375aeff7357e61.jpg'
        },
        {
          id: 2,
          name: '第二图',
          src: 'http://fc-feed.cdn.bcebos.com/0/pic/255dc5900f1373ac61475f76d7c3a45a1.jpg'
        },
        {
          id: 3,
          name: '第三图',
          src: 'http://fc-feed.cdn.bcebos.com/0/pic/5e42575bb73411d38f12caab8bea51fa1.jpg'
        }
      ]
    }
  },
  mounted () {
  }
}
</script>
<style lang="stylus" scoped>
@import "~assets/styles/mixin.styl"

.c-website
  width 436px
  position relative
  margin 0 auto
.flip-list-move
  transition transform 0.5s
</style>
