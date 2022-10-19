
const defaultTheme = '#409EFF'
const themeList = [
  {
    label: 'blue',
    color: '#409EFF'
  },
  {
    label: 'green',
    color: '#67C23A'
  },

  {
    label: 'orange',
    color: '#FFA500'
  }
]

export default {
  namespaced: true,
  state: {
    themeColor: defaultTheme,
    themeList: themeList
  },
  mutations: {
    updateThemeColor (state, value) {
      state.themeColor = value
    }
  },
  getters: {
    themeColorHex (state) {
      return function (val) {
        const hexString = state.themeColor.replace('#', '')
        let red = parseInt(hexString.slice(0, 2), 16)
        let green = parseInt(hexString.slice(2, 4), 16)
        let blue = parseInt(hexString.slice(4, 6), 16)
        return `rgba(${[red, green, blue, val].join(',')})`
      }
    }
  }
}
