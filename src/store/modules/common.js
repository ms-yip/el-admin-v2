export default {
  namespaced: true,
  state: {
    // 页面文档可视宽高(随窗口改变大小)
    documentClient: {
      width: 0,
      hight: 0
    },
    allMenuList: [], // 权限内菜单
    permissions: [], // 按钮权限
    menuList: [], // 侧边栏, 菜单
    menuActiveItem: {
      name: '',
      Id: ''
    }, // 当前选中菜单
    dictList: [], // 字典
    // // 内容, 是否需要刷新
    mainTabs: [],
    mainTabsActive: {id: '', name: ''},
    busiRouters: []
  },
  mutations: {
    updateDocumentClient (state, obj) {
      Object.assign(state.documentClient, obj)
    },
    updateMenuList (state, list) {
      state.menuList = list
    },
    updateMenuActive (state, obj) {
      state.menuActiveItem = obj
    },
    updateMainTabs (state, tabs) {
      state.mainTabs = tabs
    },
    updateMainTabsActive (state, obj) {
      Object.assign(state.mainTabsActive, { ...obj })
    },
    updateAllMenuList (state, value) {
      state.allMenuList = value
    },
    updatePermissions (state, value) {
      state.permissions = value
    },
    updateDictList (state, value) {
      state.dictList = value
    },
    updateBusiRouters (state, value) {
      state.busiRouters = value
    }
  },
  getters: {
    // 头部 一级菜单
    activeMenuList: state => {
      return state.allMenuList.filter(i => i.children && i.children.length && i.flag === '1')
    },
    // 侧边栏 二/三级菜单
    activeMenuListlv2: state => {
      return state.menuList.filter(i => i.children && i.children.length && i.flag === '1')
    },
    // 递归生成所以菜单的路由
    menuRoutersList: state => {
      const temp = []
      function getLeaves (arr, target) {
        arr.forEach(row => {
          if (row.moduleLevel === 3 && row.flag === '1') {
            target.push(row)
          }
          if (row.children && row.children.length) {
            row.children.forEach(item => {
              item.children && getLeaves(item.children, target)
            })
          }
        })
      }
      getLeaves(state.allMenuList, temp)
      return temp
    }
  }
}
