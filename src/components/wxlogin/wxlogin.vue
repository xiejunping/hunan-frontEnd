<template>
  <div>
    <iframe
      :width="width"
      :height="height"
      src="setSrc"
      scrolling="no"
      allowTransparency="true"
      frameborder="0"></iframe>
  </div>
</template>
<script>
export default {
  name: 'wxlogin',
  props: {
    appid: {
      type: String
    },
    scope: {
      type: String,
      default () {
        return 'snsapi_login'
      }
    },
    state: {
      type: String,
      default () {
        return ''
      }
    },
    theme: {
      type: String,
      default () {
        return 'black'
      }
    },
    width: {
      type: Number,
      default () {
        return 300
      }
    },
    height: {
      type: Number,
      default () {
        return 400
      }
    },
    redirect_uri: {
      type: String
    },
    href: {
      type: String,
      default () {
        return ''
      }
    }
  },
  computed: {
    setSrc () {
      const _url = `https://open.weixin.qq.com/connect/qrconnect?
                    appid=${this.appid}&
                    scope=${this.scope}&
                    state=${this.state}&
                    response_type=code&
                    redirect_uri=${this.redirect_uri}&
                    style=${this.theme}&
                    href=${this.href}`
      return _url
    }
  }
}
</script>
