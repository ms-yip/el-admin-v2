<script type="text/jsx">
// 刷新用户基础数据方法：包括 国际化languages、菜单menus、权限privileges、字典datas、事件events
export default {
  methods: {
    refreshUserData (type) {
      this.$http.get('/service/loginData/refreshUserData', {
        params: {
          language: this.$store.state.i18n.locale === 'zh' ? 'zh_CN' : 'en_us',
          refreshDataType: type // languages、menus、privileges、datas、events
        }
      }).then((res) => {
        if (res.code === 0) {
          let routers =[]
          switch (type) {
            case 'events':
              break
            case 'datas':
              // 字典
              this.$store.commit('common/updateDictList', res.data)
              break
            case 'privileges':
              // 按钮权限
              this.$store.commit('common/updatePermissions', res.data)
              break
            case 'menus':
              // 菜单
              this.$router.options.hasAddDynamicMenuRoutes = false
              console.log(this.$router.options.hasAddDynamicMenuRoutes)
              this.$store.commit('common/updateAllMenuList', res.data)
              routers = this.$store.getters['common/menuRoutersList'].map(row => {
                const url = row.urlVue.startsWith('/') ? row.urlVue : `/${row.urlVue}`
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
              break
            case 'languages':
              // 语言
              // this.$store.commit('common/updateLanguages', res.data.languages)
              this.$i18n.mergeLocaleMessage('zh', res.data.languages)
              break
          }
        }
      })
    }
  },
  filters: {},
  watch: {}
}
</script>
