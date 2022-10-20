<template>
  <!-- 父级 下有节点-->
  <el-submenu
    v-if="menu.children && menu.children.length >= 1 && menu.moduleLevel  <= 2"
    :index="menu.id + ''"
  >
    <!-- :popper-class="'site-sidebar--' + sidebarLayoutSkin + '-popper'" -->
    <template slot="title">
      <i :class="menu.icon || 'el-icon-folder'" class="menu-icon"></i>
      <span v-text="menu.name"></span>
    </template>
    <sub-menu
      v-for="item in menu.children"
      :key="item.id"
      :menu="item"
      :dynamicMenuRoutes="dynamicMenuRoutes"
    ></sub-menu>
  </el-submenu>
  <!-- 树叶级节点 -->
  <el-menu-item v-else :index="menu.id + ''" @click="gotoRouteHandle(menu)">
    <i v-if="menu.parentId == '0'" :name="menu.icon || 'el-icon-folder'" class="menu-icon"></i>
    <div v-else class="sub-menu-icon"></div>
    <span v-text="menu.name" :style="{ 'padding-left': menu.parentId !== '0' ? '10px' : '10px' }"></span>
  </el-menu-item>
</template>

<script>
import SubMenu from './main-sidebar-sub-menu'

export default {
  // Vertical menu
  name: 'sub-menu',
  props: {
    menu: {
      type: Object,
      required: true
    },
    dynamicMenuRoutes: {
      type: Array,
      required: true
    }
  },
  components: {
    SubMenu
  },
  computed: {
    sidebarLayoutSkin: {
      get () {
        return this.$store.state.common.sidebarLayoutSkin
      }
    },
    mainTabs: {
      get () {
        return this.$store.state.common.mainTabs
      },
      set (val) {
        this.$store.commit('common/updateMainTabs', val)
      }
    },
    mainTabsActive: {
      get () {
        return this.$store.state.common.mainTabsActive
      },
      set (val) {
        this.$store.commit('common/updateMainTabsActive', val)
      }
    }
  },
  methods: {
    gotoRouteHandle (menu) {
      const {id, name} = menu
      this.mainTabsActive = {id, name}
      const temp = this.mainTabs.filter(i => i.url === menu.url)
      if (temp.length) {
        if (menu.url[0] === '/') {
          this.$router.push(menu.url)
        } else {
          this.$router.push('/' + menu.url)
        }
      } else {
        this.mainTabs = [...this.mainTabs, menu]
        if (menu.url[0] === '/') {
          this.$router.push(menu.url)
        } else {
          this.$router.push('/' + menu.url)
        }
      }
    }
  }
}
</script>
<style scoped>
/* 二级菜单的缩进 */
.el-menu .el-menu .el-menu-item {
  padding-left: 28px !important;
}
/* 二级菜单图标 */
.sub-menu-icon {
  position: relative;
  display: inline-block;
  z-index: 5;
  width: 9px;
  height: 9px;
  box-sizing: content-box;
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 50%;
  margin-right: 2px;
  margin-left: -2px;
}
.el-menu-item.is-active .sub-menu-icon {
  border: 1px solid #606266;
}
.sub-menu-icon::before {
  position: absolute;
  content: "";
  z-index: 6;
  display: block;
  left: 4px;
  top: -21px;
  width: 1px;
  height: 50px;
  background-image: linear-gradient(#ccc 0%, #1d84ef 50%, transparent 50%);
  background-size: 1px 6px;
  background-repeat: repeat-y;
}
.sub-menu-icon::after {
  position: absolute;
  z-index: 6;
  display: block;
  content: "";
  top: 2.5px;
  left: 2px;
  width: 5px;
  height: 5px;
  text-align: center;
  background: #C0C4CC
;
  border-radius: 50%;
}
.el-menu-item.is-active .sub-menu-icon::after {
  background: #606266;
}
.el-submenu .el-menu-item:last-child .sub-menu-icon::before {
  height: 25px;
}
</style>
