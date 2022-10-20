<template>
  <el-color-picker
    popper-class="theme-select"
    v-model="theme"
    :predefine="predefineColors"
  ></el-color-picker>
</template>

<script>
const version = require('element-ui/package.json').version // element-ui version from node_modules
const ORIGINAL_THEME = '#409EFF' // default color
const THEME_LIST = ['#409EFF', '#67C23A', '#FFA500']
export default {
  name: 'ThemePicker',
  props: {
    value: {
      // 初始化主题，可由外部传入
      type: String,
      require: true
    },
    preColors: {
      type: Array
    }
  },
  data () {
    return {
      chalk: '', // content of theme-chalk css
      predefineColors: this.preColors || THEME_LIST
    }
  },
  mounted () {
  },
  computed: {
    theme: {
      get () {
        return this.value || ORIGINAL_THEME // 给默认赋值， 即element默认色
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    theme: {
      handler: function (val, oldVal) {
        this.changeTheme(val, oldVal || ORIGINAL_THEME)
      },
      immediate: true
    }
  },
  methods: {
    changeTheme (val, oldVal) {
      if (val === oldVal) return
      const themeCluster = this.getThemeCluster(val.replace('#', ''))
      const originalCluster = this.getThemeCluster(oldVal.replace('#', ''))
      const $message = this.$message({
        message: '  Compiling the theme',
        customClass: 'theme-message',
        type: 'success',
        duration: 0,
        iconClass: 'el-icon-loading'
      })
      const getHandler = (variable, id) => {
        return () => {
          const originalCluster = this.getThemeCluster(
            ORIGINAL_THEME.replace('#', '')
          )
          const newStyle = this.updateStyle(
            this[variable],
            originalCluster,
            themeCluster
          )

          let styleTag = document.getElementById(id)
          if (!styleTag) {
            styleTag = document.createElement('style')
            styleTag.setAttribute('id', id)
            // document.head.appendChild(styleTag)
            document
              .getElementsByTagName('head')[0]
              .insertBefore(styleTag, null)
          }
          styleTag.innerText = newStyle
        }
      }
      const chalkHandler = getHandler('chalk', 'chalk-style')

      if (!this.chalk) {
        // const url = `../assets/theme/yellow/element-variables.scss` // 本地css样式地址
        // const url = `./dist/index.css`;//项目打包后css地址（原文件放入public文件夹中）
        let url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css` // 如果是公司内网，此网址则不适用
        // if (process.env.NODE_ENV === '') {
        //   const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css` // 如果是公司内网，此网址则不适用
        // }
        this.getCSSString(url, chalkHandler, 'chalk')
      } else {
        chalkHandler()
      }

      const styles = [].slice
        .call(document.querySelectorAll('style'))
        .filter(style => {
          const text = style.innerText
          return (
            new RegExp(oldVal, 'i').test(text) &&
            !/Chalk Variables/.test(text)
          )
        })
      styles.forEach(style => {
        const { innerText } = style
        if (typeof innerText !== 'string') return
        style.innerText = this.updateStyle(
          innerText,
          originalCluster,
          themeCluster
        )
      })
      this.$emit('onThemeChange', val)
      $message.close()
      // 响应外部操作
      // 存入localStorage
    },
    updateStyle (style, oldCluster, newCluster) {
      let newStyle = style
      oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
      })
      return newStyle
    },
    getCSSString (url, callback, variable) {
      const xhr = new XMLHttpRequest()
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
          callback()
        }
      }
      xhr.open('GET', url)
      xhr.send()
    },
    getThemeCluster (theme) {
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)

        if (tint === 0) {
          // when primary color is in its rgb space
          return [red, green, blue].join(',')
        } else {
          red += Math.round(tint * (255 - red))
          green += Math.round(tint * (255 - green))
          blue += Math.round(tint * (255 - blue))
          red = red.toString(16)
          green = green.toString(16)
          blue = blue.toString(16)

          return `#${red}${green}${blue}`
        }
      }
      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)

        red = Math.round((1 - shade) * red)
        green = Math.round((1 - shade) * green)
        blue = Math.round((1 - shade) * blue)
        red = red.toString(16)
        green = green.toString(16)
        blue = blue.toString(16)

        return `#${red}${green}${blue}`
      }

      const clusters = [theme]
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
      }
      clusters.push(shadeColor(theme, 0.1))
      return clusters
    }
  }
}
</script>

<style>
.el-color-dropdown {
  width: unset;
}
.theme-select .el-color-predefine__colors {
  justify-content: space-around;
}
.theme-select .el-color-dropdown__main-wrapper,
.theme-select .el-color-dropdown__value,
.theme-select .el-color-dropdown__link-btn {
  /* display: none; */
}
</style>
