
<template>
  <div id="mian">
    <div class="full-screen">
        <left></left>
        <right @userInfo="userInfo" @updatePwd="updatePwd" @notice="notice"></right>
    </div>
    <update-pwd ref="updatePwd"></update-pwd>
    <user-info ref="userInfo"></user-info>
    <notice ref="notice"></notice>
  </div>
</template>

<script type="text/jsx">
import Left from './left/mian-left'
import Right from './right/main-right'
import UpdatePwd from './modal/main-update-password'
import UserInfo from './modal/userInfo'
import notice from './modal/notice'

export default {
  name: 'mianCom',
  components: { UpdatePwd, UserInfo, notice, Left, Right },
  // mixins: [refleshUserData],
  props: {},
  data () {
    return {
    }
  },
  computed: {
    documentClientSize: {
      get () {
        return this.$store.state.common.documentClient
      },
      set (val) {
        return this.$store.commit('common/updateDocumentClient', val)
      }
    }
  },
  created () {
    console.log('mian-created')
  },
  mounted () {
    console.log('mian-mounted')
    // 初始化设置
    this.resetDocumentClientSize()
    const _this = this
    // 监听-防抖-设置窗口大小
    window.addEventListener('resize', _this.throttling(_this.resetDocumentClientSize, 500, true))
  },
  methods: {
    getSysInitSetting () {
      this.$http.get(`/systemInit`, {
        params: {
          language: this.$store.state.i18n.locale === 'zh' ? 'zh_CN' : 'en_us',
          code: ''
        }
      }).then(res => {
        if (res.code === 0) {
          const allmenu = res.data.menus
          // 菜单
          this.$store.commit('common/updateAllMenuList', allmenu)
          // 按钮权限
          this.$store.commit('common/updatePermissions', res.data.privileges)
          // 字典
          this.$store.commit('common/updateDictList', res.data.datas)
          // 语言
          this.$i18n.mergeLocaleMessage(this.$i18n.locale, res.data.languages)

          //初始化动态路由信息
          let routers = this.$store.getters['common/menuRoutersList'].map(row => {
            const url = row.url.startsWith('/') ? row.url : `/${row.url}`
            return {
              path: url,
              // name: '',
              meta: {
                nameEnUs: row.nameEnUs,
                nameLocal: row.nameLocal
              },
              component: null
            }
          })
          this.$store.commit('common/updateBusiRouters', [...routers])
          // 跳转首页
          if (this.$store.state.common.mainTabs.length === 0) {
            const locale = sessionStorage.getItem('locale') || 'zh'
            const homepageUrl = '/monitor/device/termMonitor'
            const homepage = this.$store.getters['common/menuRoutersList'].find(i => i.url === homepageUrl)
            if (homepage) {
              const temp = {
                id: homepage.id,
                name: locale === 'en' ? homepage.nameEnUs : homepage.nameLocal
              }
              // setTimeout(() => {
              // 更新tabs列表信息
              this.$store.commit('common/updateMainTabs', [homepage])
              // 更新激活的tabs信息
              this.$store.commit('common/updateMainTabsActive', temp)
              this.$router.push(homepageUrl)
              // }, 0)
            }
          }
        }
      })
    },
    // 前缘throttling
    throttling (fn, wait, immediate) {
      let timer
      let context
      let args
      const run = () => {
        timer = setTimeout(() => {
          if (!immediate) {
            fn.apply(context, args)
          }
          clearTimeout(timer)
          timer = null
        }, wait)
      }
      return (...args) => {
        if (!timer) {
          if (immediate) {
            fn.apply(this, args)
          }
          run()
        } else {
          console.log(1)
        }
      }
    },
    // 重置窗口可视高度
    resetDocumentClientSize () {
      function getSize () {
        const temp = document.documentElement
        return {
          width: temp.clientWidth,
          height: temp.clientHeight
        }
      }
      this.documentClientSize = getSize()

    },
    userInfo () {
      this.$refs.userInfo.init()
    },
    updatePwd () {
      this.$refs.updatePwd.init()
    },
    notice () {
      this.$refs.notice.init()
    }
  },
  filters: {},
  watch: {},
  beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnter')
    next(vm => {
      // window.clearVuexAlong(true, true)
      vm.getSysInitSetting()
    })
  }
}
</script>
<style lang="scss" scoped>
#mian {
}
#mian, .full-screen, .main-page{
    height: 100%;
}
.full-screen {
  overflow: hidden;
}
</style>
