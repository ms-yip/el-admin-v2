
<template>
  <div id="mian-right" class="mian-page">
    <div class="nav-top" :style="'background-color:'+ lightTheme(0.7)">
      <span class="current-app-name" >
        {{ menuActiveItem.name }}
      </span>
      <div class="nav-right">
        <flex-menu :list="menuList"
          :value="menuActiveItem.id"
          @selected="setMenuListAndTitle"
          :btnColor="lightTheme(0.5)"
          textColor="#ffffff"
          :activeColor="lightTheme(1)"
          :width="(this.$store.state.common.documentClient.width - 700)"></flex-menu>
        <el-menu class="userInfo" mode="horizontal"  :background-color="$store.state.theme.themeColor">
          <el-menu-item>
            <el-dropdown :show-timeout="0" placement="bottom" size="medium">
              <span class="user-mess">
                <img src="~@/assets/img/login/avatar.png" :alt="userName" />
                <span class="name">{{ userName }}</span>
                <i class="el-icon-caret-bottom"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="toUserInfo()">{{
                  $t('window.userDetail')
                }}</el-dropdown-item>
                <el-dropdown-item @click.native="updatePasswordHandle()">{{
                  $t('window.changePassword')
                }}</el-dropdown-item>
                <el-dropdown-item @click.native="logoutHandle()">{{
                  $t('common.logout')
                }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-menu-item>
          <el-menu-item
            :class="clickRefresh ? 'active' : ''"
            index="1"
            @click="notice()"
          >
            <i class="el-icon-message-solid"></i>
          </el-menu-item>
          <el-menu-item>
            <theme-picker v-model="themeColor"></theme-picker>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <tabs :list.sync="mainTabs" :value="mainTabsActive.id" @change="setActiveTab"></tabs>
    <div class="content">
      <router-view></router-view>
    </div>
    <div class="footer">
        {{ $t('com.copyright', [new Date().getFullYear()]) }}
    </div>
  </div>
</template>

<script type="text/jsx">

import themePicker from '@/views/common/components/theme'
import FlexMenu from './menu'
import Tabs from './tabs'

export default {
  name: 'mian-right',
  components: { FlexMenu, Tabs, themePicker },
  mixins: [],
  props: {},
  data () {
    return {
      NODE_ENV: process.env.NODE_ENV,
      clickRefresh: false
    }
  },
  computed: {
    // 当前选择顶级菜单
    menuActiveItem () {
      return this.$store.state.common.menuActiveItem
    },
    lightTheme () {
      return function (val) {
        return this.$store.getters['theme/themeColorHex'](val)
      }
    },
    themeColor: {
      get () {
        return this.$store.state.theme.themeColor
      },
      set (val) {
        console.log(val)
        this.$store.commit('theme/updateThemeColor', val)
      }
    },
    userName () {
      return this.$store.state.user.name
    },
    menuList () {
      return this.$store.getters['common/activeMenuList']
    },
    themeList () {
      return this.$store.state.theme.themeList
    },
    mainTabs: {
      get () {
        return this.$store.state.common.mainTabs
      },
      set (val) {
        this.$store.commit('common/updateMainTabs', [...val])
      }
    },
    mainTabsActive () {
      return this.$store.state.common.mainTabsActive
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    setMenuListAndTitle (activeTopMenu) {
      if (activeTopMenu) {
        this.$store.commit('common/updateMenuActive', { id: activeTopMenu.id, name: activeTopMenu.name })
        this.$store.commit('common/updateMenuList', activeTopMenu.children)
      }
    },
    setActiveTab (tab) {
      this.$store.commit('common/updateMainTabsActive', { id: tab.id, name: tab.name })
    },
    notice () {
      this.$emit('notice')
    },
    refresh () {
      location.reload()
    },
    toUserInfo () {
      this.$emit('userInfo')
    },
    updatePasswordHandle () {
      this.$emit('updatePwd')
    },
    logoutHandle () {
      this.$confirm(this.$t('info.common.logout'), this.$t('window.prompt')).then(() => {
        this.$http.get('/logout').then(res => {
          if (res.code === 0) {
            this.$store.commit('resetStore')
            this.$router.push('/login')
          } else {
            this.$message(this.$t(res.msg))
          }
        })
      })
    }
  },
  filters: {},
  watch: {
  }
}
</script>
<style >
/* dropdown-menu */
/* .el-dropdown-menu {
}
.el-dropdown-menu .el-dropdown-menu__item {
} */
</style>
<style lang="scss" scoped>
// @import '';
#mian-right{
  display: flex;
  flex-direction: column;
  box-shadow: inset 0px 0px 12px 0px rgb(40 63 88 / 10%);
  height: 100%;
  overflow: auto;
    .nav-top {
        padding-right: 0px;
        // position: relative;
        height: 60px;
        display: flex;
        justify-content: space-between;
      .current-app-name {
        font-size: 17px;
        font-weight: bold;
        line-height: 60px;
        display: inline-block;
        margin-left: 1rem;
        color: white;
        min-width: 150px;
        max-width: 200px;
        overflow:hidden; //超出的文本隐藏
        text-overflow:ellipsis; //溢出用省略号显示
        white-space:nowrap; //溢出不换行
      }
      .nav-right {
        display: flex;
        justify-content: flex-end;
        .userInfo {
          padding: 0 22px 0 22px;
          // background: #0076ff;
          flex-shrink: 0;
          &.el-menu.el-menu--horizontal {
            border: none;
          }
          // min-width: 301px;
          :deep .el-menu-item {
            padding: 0 18px;
          }
          :deep .el-menu-item:focus, :deep .el-menu-item:hover {
          }
          :deep .el-menu-item i {
            color: #ffffff;
          }
          .user-mess {
            padding: 0 4px;
            img {
              width: 26px;
              height: 26px;
              border-radius: 50%;
              vertical-align: middle;
              border: 2px solid #e5f6ff;
            }
            .name {
              color: #fff;
              padding-left: 10px;
            }
          }
        }
      }
    }
    .content {
      margin: 10px 10px 0 20px;
      background-color: #fff;
      height: calc(100% - 130px); // 减去头部和下面备案信息
      div:first-child {
        height: 100%;
      }
    }
    .footer {
      height: 20px;
      line-height: 20px;
      text-align: center;
      font-size: 12px;
      opacity: 0.6;
      font-weight: 400;
      color: #6d819c;
    }
}
</style>
