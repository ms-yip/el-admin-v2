/**
 * 使用此方法设置主题
 *
 * 新增主题需先在此处引入新主题的.scss文件，再在themeConfig里配置主题相关组件颜色
 */

// 先加载所有的主题(default在main.scss中加载，因为default主题对body没有使用class，可以应用在登陆页上)
// import './orange/compress/orange.css'
// import './green/compress/green.css'
// import './yellow/index.scss'
// import './theme-#409EFF/index.scss' // 默认蓝

// 默认主题
export const defaultTheme = 'blue'
export const themeList = [
  {
    label: 'blue',
    color: 'blue'
  },
  {
    label: 'orange',
    color: 'orange'
  },

  {
    label: 'green',
    color: 'green'
  },
  {label: 'yellow', color: 'yellow'}
]

export const setTheme = (themeName = defaultTheme) => {
  if (themeName === 'default') {
    if (document.body.className) document.body.className = ''
  } else {
    // 把该主题的所有属性存到缓存
    document.body.className = themeName
  }
}
