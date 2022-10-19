import Vue from 'vue'
import Vuex from 'vuex'
import createVuexAlong from 'vuex-along'
import common from './modules/common'
import user from './modules/user'
import i18n from './modules/i18n'
import theme from './modules/theme'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  modules: {
    common,
    user,
    i18n,
    theme
  },
  plugins: [
    createVuexAlong({
      name: 'el-admin',
      session: {
        list: ['common', 'user', 'theme.themeColor', 'i18n.locale']
      },
      justSession: true
    })
  ],
  getters: {
    sessionId: state => {
      return state.user.sessionId
    },
    getDictList: state => dictName => {
      const tempArr = state.common.dictList[dictName]
      if (tempArr) {
        return tempArr.list
      } else {
        return []
      }
    },
    getDictObj: state => (dictName, value) => {
      const tempArr = state.common.dictList[dictName]
      if (tempArr) {
        const temp = tempArr.map && tempArr.map[value]
        if (temp) {
          return tempArr.map[value]
        } else {
          return null
        }
      } else {
        return null
      }
    },
    getDictName: state => (dictName, value) => {
      const temp = state.common.dictList[dictName]
      if (temp && temp.map && temp.map[value]) {
        return temp.map[value][state.i18n.locale === 'zh' ? 'nameLocal' : 'nameEnUs']
      } else {
        return ''
      }
    },
    getPermissionsByCode: state => code => {
      const temp = state.common.permissions[code]
      if (temp) {
        return temp
      } else {
        return []
      }
    }
  },
  mutations: {
    // 重置vuex本地储存状态
    resetStore (state) {
      state.common.allMenuList = []
      state.common.menuList = []
      state.common.mainTabs = []
      state.common.permissions = []
      state.common.mainTabsActive = {}
      state.common.menuActiveItem = {}
      state.user = {}
      state.common.busiRouters = []
    },
    increment (state, userId) {
      state.userId = userId
    }
  },
  actions: {
  },
  strict: process.env.NODE_ENV !== 'production'
})
