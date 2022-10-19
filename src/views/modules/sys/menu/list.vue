<template>
  <div id="menuList">
    <grid
      :api="api"
      :columns="columns"
      :rowKey="'id'"
      :selectedByMouseClick.sync="selectedByMouseClick"
      ref="menu"
      single-select
      :requestCallback="requestCallback"
      @dbClickCell="dbClickCell"
      :layout="['toolbar', 'table']"
    >
      <btn-list :data="btnList" @click="action" slot="toolbar"></btn-list>
      <el-button type="primary" icon="icon-ic_tianjia" @click="refresh()">{{$t('button.refresh')}}</el-button>
      <el-button type="primary" icon="icon-ic_tianjia" @click="refresh()">{{$t('button.export')}}</el-button>
    </grid>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="refresh"></add-or-update>
  </div>
</template>

<script type="text/jsx">
import AddOrUpdate from './menu-add-or-update'
export default {
  name: 'menuList',
  components: { AddOrUpdate },
  mixins: [],
  props: {},
  data () {
    return {
      api: `/service/module/getTree/${this.$store.state.i18n.locale === 'zh' ? 'zh_CN' : 'en_us'}`,
      columns: [
        { label: 'sys.menu.name', prop: 'name', align: 'left', minWidth: '200' },
        { label: 'sys.menu.nameLocal', align: 'center', prop: 'nameLocal' },
        { label: 'sys.menu.nameEnUs', align: 'center', prop: 'nameEnUs' },
        { label: 'sys.menu.moduleLevel', align: 'center', prop: 'moduleLevel' },
        {
          label: 'sys.menu.moduleType',
          render (h, { row }) {
            const moduleType = (
              <span style="">
                {this.$store.getters['getDictName']('common', row.moduleType)}
              </span>
            )
            return [moduleType]
          }
        },
        {
          label: 'sys.menu.flag',
          render (h, { row }) {
            const flag = (
              <span style="">
                {this.$store.getters['getDictName']('status', row.flag)}
              </span>
            )
            return [flag]
          }
        },
        { label: 'sys.menu.url', prop: 'url', width: '300' },
        { label: 'sys.menu.iconUrl', align: 'center', prop: 'iconUrl', isFilter: true },
      ],
      addOrUpdateVisible: false,
      selectedByMouseClick: null,
      list: []
    }
  },
  computed: {
    btnList () {
      return this.$store.getters.getPermissionsByCode('management.module')
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    action (functionName) {
      const hasFun = !!(functionName && this[functionName])
      if (hasFun) {
        this[functionName]()
      } else {
        this.$message('该功能暂未支持,请联系管理员确认配置是否出错！')
      }
    },
    add () {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init()
      })
    },
    edit () {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        let editItem = {}
        this.list.forEach(item => {
          if (item.id === this.selectedByMouseClick.id) {
            editItem = JSON.parse(JSON.stringify(item))
          }
        })
        this.list.forEach(item => {
          if (item.id === editItem.parentId) {
            editItem.parentName = item.name
          }
        })
        console.log(editItem)
        this.$refs.addOrUpdate.init(editItem)
      })
    },
    copy () {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        let editItem = {}
        this.list.forEach(item => {
          if (item.id === this.selectedByMouseClick.id) {
            editItem = JSON.parse(JSON.stringify(item))
          }
        })
        this.list.forEach(item => {
          if (item.id === editItem.parentId) {
            editItem.parentName = item.name
          }
        })
        console.log(editItem)
        this.$refs.addOrUpdate.init(editItem, 'copy')
      })
    },
    exportData () {
    },
    nestToSimple (data) {
      data.forEach(item => {
        this.list.push(item)
        if (item.children && item.children.length > 0) {
          this.nestToSimple(item.children)
        }
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    dbClickCell () {

    },
    requestCallback (grid, data) {
      if (data && data.code === 0) {
        grid.list = data.data
        this.nestToSimple(grid.list)
      }
    },
    refresh () {
      this.$refs.menu.getDataList()
    },
    del () {
      let params = {}
      params = {
        ids: [this.selectedByMouseClick.id],
        language: this.$store.state.i18n.locale === 'zh' ? 'zh_CN' : 'en_us'
      }
      this.$confirm(this.$t('info.common.delete'), this.$t('window.prompt')).then(() => {
        this.$http({
          url:
            '/service/module/delete',
          method: 'post',
          data: params,
          contentType: 'json'
        }).then((list) => {
          if (list && list.code === 0) {
            this.refresh()
            this.$message({
              message: this.$t('info.common.deletesuccess'),
              type: 'success',
              duration: 1500
            })
          } else {
            this.$message.error(this.$t(list.msg))
          }
        })
      })
    }
  },
  filters: {},
  watch: {}
}
</script>
<style lang="scss" scoped>
// @import '';
</style>
