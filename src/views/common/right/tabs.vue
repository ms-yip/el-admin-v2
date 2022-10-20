
<template>
  <div id="tabs" ref="menuTabs">
    <el-tabs
      v-model="activeId"
      :closable="true"
      @tab-click="selectedTabHandle"
      @tab-remove="removeTabHandle"
      class="content-tabs"
    >

      <el-tab-pane
        class="content-pane-title"
        v-for="(item) in mainTabs"
        :key="item[activeKey]"
        :label="tabName(item)"
        :name="item[activeKey]"
      >
       <span slot="label" class="content-header-text">
            <span
              @contextmenu.prevent="
                (e) => {
                  x_index = e.clientX - 180;
                  y_index = e.layerY;
                  ctrlItem = item;
                  showMenu = true;
                }
              "
              >{{ item.name }}</span
            >
          </span>
      </el-tab-pane>
    </el-tabs>

    <el-dropdown class="tabs-tools" :show-timeout="0">
      <i class="el-icon-caret-bottom "></i>
      <el-dropdown-menu
        slot="dropdown"
        style="padding: 0"
        class="dropdown-menu-list"
      >
        <el-dropdown-item @click.native="tabsCloseCurrentHandle">{{
          this.$t('com.closeCurrentTab')
        }}</el-dropdown-item>
        <el-dropdown-item @click.native="tabsCloseOtherHandle">{{
          this.$t('com.closeOtherTab')
        }}</el-dropdown-item>
        <el-dropdown-item @click.native="tabsCloseAllHandle">{{
          this.$t('com.closeAllTab')
        }}</el-dropdown-item>
        <el-dropdown-item @click.native="tabsRefreshCurrentHandle">{{
          this.$t('com.refreshCurrentTab')
        }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <right-menu
      :x="x_index"
      :y="y_index"
      :showMenu="showMenu"
      @close="closeMenu"
      @refreshCurrent="refreshCurrent"
      @closeOther="closeOther"
    >
    </right-menu>
  </div>
</template>

<script type="text/jsx">
import rightMenu from '@/views/common/components/right_menu.vue'

export default {
  name: 'tabsCom',
  components: { rightMenu },
  mixins: [],
  props: {
    value: {
      type: [String, Number]
      // require: true
    },
    activeKey: {
      type: String,
      default: 'id'
    },
    list: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      local: sessionStorage.getItem('locale') || 'zh',
      // 右键功能
      x_index: 0,
      y_index: 0,
      showMenu: false
    }
  },
  computed: {
    activeId: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    tabName () {
      return function (obj) {
        return this.local === 'zh' ? obj.nameLocal : obj.nameEnUs
      }
    },
    mainTabs: {
      get () {
        return this.list
      },
      set (val) {
        this.$emit('update:list', val)
      }
    }
  },
  created () {},
  mounted () {
    this.$nextTick(() => {
      var menuTabs = document.getElementById('tabs')
      document.body.onclick = function (e) {
        e = e || window.event
        const target = e.target || e.srcElement
        if (target !== menuTabs) {
          this.showMenu = false
        }
      }
    })
  },
  methods: {
    setActiveTab (val) {
      this.$emit('change', val)
    },
    // tabs, 选中tab
    selectedTabHandle (tab) {
      // compare to tab’s name （the key of tab options）
      tab = this.mainTabs.filter((item) => item[this.activeKey] === tab.name)
      if (tab.length >= 1) {
        if (tab[0].url[0] === '/') {
          this.$router.push(tab[0].url)
          this.activeId = tab[0][this.activeKey]
          this.setActiveTab(tab[0])
        } else {
          this.$router.push('/' + tab[0].url)
        }
      }
    },
    // tabs, 删除tab
    removeTabHandle (key) {
      if (this.mainTabs.length === 1) {
        this.$message('最后一个不能关闭！')
        return
      }
      const temp = this.mainTabs.filter((item) => item[this.activeKey] !== key)
      this.mainTabs = temp
      if (temp.length >= 1) {
        // 当前选中tab被删除
        if (key === this.activeId) {
          const tab = temp[temp.length - 1]
          this.$router.push({ path: tab.url, query: tab.query, params: tab.params }).then(() => {
            this.setActiveTab(tab)
          })
        }
      } else {
        this.$router.push({ name: 'main' })
      }
      // this.$http.stopRequest(tabName)
    },
    // tabs, 关闭当前
    tabsCloseCurrentHandle () {
      if (!this.activeId) return
      this.removeTabHandle(this.activeId)
    },
    // tabs, 关闭其它
    tabsCloseOtherHandle () {
      if (!this.activeId) return
      this.mainTabs = this.mainTabs.filter(
        (item) => item[this.activeKey] === this.activeId
      )
    },
    // tabs, 关闭全部
    tabsCloseAllHandle () {
      this.mainTabs = []
      this.setActiveTab({id: '', name: ''})
      this.$router.push({ name: 'main' })
    },
    // tabs, 刷新当前
    tabsRefreshCurrentHandle () {
      if (!this.activeId) return
      // this.$router.go(0)
      const temp = this.mainTabs.filter(
        (item) => item[this.activeKey] === this.activeId
      )
      this.$router.push({name: 'main'})
      this.$nextTick(() => {
        this.$router.push(temp[0].url)
      })
    },
    // 关闭回调
    closeMenu (state) {
      this.showMenu = state
    },
    // 刷新当前
    refreshCurrent () {
      this.tabsRefreshCurrentHandle()
    },
    // 关闭其他
    closeOther () {
      this.tabsCloseOtherHandle()
    }
  },
  filters: {}
}
</script>
<style lang="scss" scoped>
#tabs{
  width: 100%;
  display: flex;
  box-shadow: inset 0px 0px 12px 0px rgb(40 63 88 / 10%);
  position: relative;
  .content-tabs {
    background-color: #fff;
    width: calc(100% - 42px);
      :deep .el-tabs__header {
      margin: 0;
    }
  }

  .tabs-tools {
    z-index: 931;
    height: 40px;
    width: 42px;
    padding: 0 12px;
    font-size: 0.8rem;
    line-height: 40px;
    background-color: #ffffff;
    cursor: pointer;
    flex-shrink: 0;
  }
}
</style>
