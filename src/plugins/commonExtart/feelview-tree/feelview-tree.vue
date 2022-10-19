<template>
  <div class="full-tree"
       :class="{ isactive: isactive }">
    <el-input :placeholder="searchPlaceholder"
              size="mini"
              class="filter-input"
              v-model="filterText">
    </el-input>
    <el-button @click="toggleRowExpansion"
               type="text"
               :icon="iconName(!foldStatu)">{{  treeBtnText(!foldStatu) }}</el-button>
    <div class="filter-tree-box">
      <el-tree class="filter-tree"
               :node-key="nodeKey"
               :data="list"
               :props="defaultProps"
               highlight-current
               :filter-node-method="filterNode"
               @node-click="selectTree"
               :default-expanded-keys="treeExpansionIdList"
               ref="tree">
      </el-tree>
      <!-- :default-expand-all="foldStatu" -->
    </div>
  </div>
</template>

<script>
const ICON_DEFAULT = {
  open: 'el-icon-folder-opened',
  close: 'el-icon-folder'
}
const FREE_DEFAULT_TEXT = {
  open: '展开',
  close: '收缩'
}
const DEFAULT_PROPS = {
  children: 'children',
  label: 'name'
}
export default {
  props: {
    placeholder: {
      type: String
    },
    iconClass: {
      type: Object,
    },
    btnText: {
      type: Object,
    },
    nodeKey: {
      type: String,
      default: 'id'
    },
    defaultProps: {
      type: Object,
      default: () =>DEFAULT_PROPS
    },
    api: [String],
    method: {
      type: String,
      default: 'post',
      validator: function (value) {
        return ['get', 'GET', 'POST', 'post'].indexOf(value) !== -1
      }
    },
    data: {
      type: Object,
      default: () => {}
    },
    config: {
      type: Object,
      default: () => {}
    },
    treeData: {
      type: Array,
    },
    requestCallback: {
      type: Function
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  computed: {
    searchPlaceholder() {
      return this.placeholder || ''
    },
    iconName () {
      return function (isOpen) {
        if (isOpen) {
          return (this.iconClass && this.iconClass.open) || ICON_DEFAULT.open
        } else {
          return (this.iconClass && this.iconClass.close) || ICON_DEFAULT.close
        }
      }
    },
    treeBtnText: {
      get() {
        return  function (isOpen) {
          if (isOpen) {
            return (this.btnText && this.btnText.open) || FREE_DEFAULT_TEXT.open
          } else {
            return (this.btnText && this.btnText.close) || FREE_DEFAULT_TEXT.close
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    resetTree () {
      this.treeExpansionIdList = []
      this.$refs.tree.$el.click()
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    selectTree (e) {
      this.isactive = false
      this.$emit('selectNode', e)
      if (!this.treeExpansionIdList.includes(e.id)) {
        this.treeExpansionIdList.push(e.id)
      }
    },
    // 表格中树展开收缩
    unfoldAll () {
      this.treeExpansionIdList = []
      this.toggleRowExpansion(true)
    },
    shrinkAll () {
      this.toggleRowExpansion(false)
    },
    toggleRowExpansion () {
      this.foldStatu = !this.foldStatu
      console.log(this.$refs.tree.store.nodesMap)
      for (var i in this.$refs.tree.store.nodesMap) {
        this.$refs.tree.store.nodesMap[i].expanded = this.foldStatu
      }
    },
    getTree (url, method, data, config) {
      let requestObj = {
        url,
        method,
        ...config
      }
      const temp = method.toLowerCase()
      if (temp === 'post') {
        requestObj.data = data
      } else if (temp === 'get') {
        requestObj.params = { data }
      }
        this.$http(requestObj).then(res => {
        if (this.requestCallback) {
          this.requestCallback(this, res)
          return
        }
        if (res.code === 0) {
          this.list = res.data
        } else {
          this.list =  []
        }
      }).catch(e => {
        console.log(`${url}: ${e}`)
        this.list = []
      })
    }
  },

  mounted () {
    if (this.treeData) {
      return this.treeData
    } else {
      this.getTree(this.api, this.method, this.data, this.config)
    }
  },
  data () {
    return {
      timer: false,
      foldStatu: false, // 是否折叠
      filterText: '',
      fromBrother: '',
      // 请求时间超过10分钟重新请求数据
      maxRequestTime: 600000,
      isactive: true,
      list:[],
      treeExpansionIdList: []
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('./feel-tree.scss');
</style>
