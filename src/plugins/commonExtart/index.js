
import Grid from './grid.jsx'

function install(Vue) {
  if (install.installed) return;
  Vue.component('Grid', Grid)
}

export default {
  install
}