
<template>
  <div id="main-left" :class="[{'fold': sidebarFold}, 'mian-page']">
    <!-- logo -->
      <div class="left-top" :style="'background-color:'+ $store.state.theme.themeColor">
          <img class="nav-logo" v-if="!sidebarFold" src="../../../assets/img/login/logo.png"/>
          <el-button :class="[btnName, 'switch-btn']" type="text" @click="sidebarFold =!sidebarFold" ></el-button>
      </div>
      <!-- menuList -->
      <div class="menulist">
        <el-menu
          :default-active="mainTabsActiveId"
          :collapse="sidebarFold"
          :unique-opened="true"
          :collapseTransition="false"
        >
          <!-- <el-menu-item index="home" @click="$router.push('/')">
            <i class="el-icon-s-home menu-icon"></i>
            <span slot="title">{{ this.$t('menu.home') }}</span>
          </el-menu-item> -->
          <sub-menu
            v-for="menu in menuList"
            :key="menu.id"
            :menu="menu"
            :dynamicMenuRoutes="dynamicMenuRoutes"
          ></sub-menu>
        </el-menu>
      </div>
  </div>
</template>

<script type="text/jsx">
import SubMenu from './main-sidebar-sub-menu'

export default {
  name: 'main-left',
  components: { SubMenu },
  mixins: [],
  props: {},
  data () {
    return {
      sidebarFold: false,
      dynamicMenuRoutes: []
    }
  },
  computed: {
    btnName () {
      return this.sidebarFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'
    },
    menuList () {
      return this.$store.getters['common/activeMenuListlv2']
    },
    mainTabsActive () {
      return this.$store.state.common.mainTabsActive
    },
    mainTabsActiveId () {
      return this.mainTabsActive.id
    }
  },
  created () {},
  mounted () {},
  methods: {},
  filters: {},
  watch: {}
}
</script>
<style >
/* 菜单二级 弹出层 */
.el-menu--popup .el-menu-item, .el-menu--popup-right-start .el-menu-item{
  height: 40px;
  line-height: 40px;
}
</style>
<style lang="scss" scoped>
#main-left{
    float: left;
    width: 200px;
    height: 100%;
    display: inline-block;
    background-color: #fff;
    flex-shrink: 0;
    &.fold {
      width: 70px;
    }

    // logo
    .left-top {
      height: 60px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      .nav-logo {
          display: inline-block;
          width: 120px;
          height: auto;
          margin: 0 16px 0 0;
      }
      .switch-btn {
          line-height: 60px;
          font-size: 16px;
          font-weight: normal;
          color: #ffffff;
      }
    }
    // 菜单
    .menulist {
      height: calc(100% - 60px);
      padding: 10px 0 30px;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 2px;
        height: 2px;
        border-radius: 4px;
      }
      &:hover::-webkit-scrollbar {
        width: 12px;
        height: 4px;
        border-radius: 4px;
      }
      // 收缩宽度设置
      :deep .el-menu--collapse {
        width: unset;
        .menu-icon {
          font-size: 18px;
        }
      }
      .el-menu {
        border:none;
        // overflow: auto;
        // 覆盖二级行内样式
      }
      :deep .el-submenu.is-active > .el-submenu__title,
      :deep .el-submenu.is-active > .el-submenu__title .menu-icon,
      :deep .el-submenu.is-active > .el-submenu__title span {
        // color: #3e8ef7;
      }
      :deep .el-submenu.is-opened {
        padding-bottom: 10px;
        background-color: rgba(237, 240, 247, 0.1);
        &:after {
          position: absolute;
          content: "";
          width: 100%;
          height: 0.5rem;
          background: linear-gradient(0deg, #eef1f6 0%, rgba(0, 0, 0, 0) 100%);
        }
        .el-menu {
          background-color: rgba(237, 240, 247, 0.1);
        }
        .el-menu-item {
          padding-right: 20px;
        }
      }
      // 所有图标
      :deep .menu-icon {
        width: 24px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        margin-right: 2px;
      }
      // 所有高度
      :deep .el-menu-item, :deep .el-submenu__title{
        height: 40px;
        line-height: 40px;
        /* 文字换行显示 */
        span {
          display: inline-block;
          line-height: 15px;
          max-height: 40px;
          max-width: 140px;
          word-break: normal;
          white-space: pre-wrap;
          word-wrap: break-word;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
    }
}
</style>
