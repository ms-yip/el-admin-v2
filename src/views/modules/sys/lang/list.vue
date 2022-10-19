<template>
  <div id="I18nList">
    <grid
      :api="api"
      :model="dataForm"
      :columns="columns"
      :method="'post'"
      :requestOption="{contentType: 'json'}"
      :rowKey="'id'"
      :multiSelectedArr.sync="multipleSelection"
      ref="I18n"
      :requestCallback="requestCallback"
    >
      <div slot="form">
        <el-form-item :label="this.$t('sys.lang.code')">
          <el-input v-model="dataForm.code" :placeholder="this.$t('sys.lang.code')" clearable></el-input>
        </el-form-item>
        <el-form-item :label="this.$t('sys.lang.name')">
          <el-input v-model="dataForm.name" :placeholder="this.$t('sys.lang.name')" clearable></el-input>
        </el-form-item>
      </div>
      <btn-list :data="btnList" @click="action" slot="toolbar"></btn-list>
    </grid>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="refresh"></add-or-update>
  </div>
</template>

<script type="text/jsx">
import AddOrUpdate from './I18n-add-or-update'
export default {
  name: 'I18nList',
  components: { AddOrUpdate },
  mixins: [],
  props: {},
  data () {
    return {
      api: `/service/language`,
      addOrUpdateVisible: false,
      multipleSelection: [],
      dataForm: {
        code: '',
        name: ''
      },
      columns: [
        { type: 'selection', align: 'center', width: '50' },
        { label: 'sys.lang.code', prop: 'code', align: 'center' },
        { label: 'sys.lang.nameEnUs', prop: 'nameEnUs', align: 'center' },
        { label: 'sys.lang.nameLocal', prop: 'nameLocal', align: 'center' },
        { label: 'sys.lang.memo', prop: 'memo', align: 'center' }
      ]
    }
  },
  computed: {
    btnList () {
      return this.$store.getters.getPermissionsByCode('management.sysI18n')
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
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: this.$t('info.common.selectmore'),
          type: 'warning',
          duration: 1500
        })
      } else if (this.multipleSelection.length === 1) {
        this.addOrUpdateVisible = true
        let editItem = {}
        this.$refs.I18n.list.forEach(item => {
          if (item.id === this.multipleSelection[0].id) {
            editItem = JSON.parse(JSON.stringify(item))
          }
        })
        console.log(editItem)
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(editItem)
        })
      } else {
        this.$message({
          message: this.$t('info.common.selectone'),
          type: 'warning',
          duration: 1500
        })
      }
    },
    copy () {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: this.$t('info.common.selectmore'),
          type: 'warning',
          duration: 1500
        })
      } if (this.multipleSelection.length === 1) {
        this.addOrUpdateVisible = true
        let editItem = {}
        this.$refs.I18n.list.forEach(item => {
          if (item.id === this.multipleSelection[0].id) {
            editItem = JSON.parse(JSON.stringify(item))
          }
        })
        console.log(editItem)
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(editItem, 'copy')
        })
      } else {
        this.$message({
          message: this.$t('info.common.selectone'),
          type: 'warning',
          duration: 1500
        })
      }
    },
    exportData () { },
    resetpassword () { },
    setgroup () { },
    importUserInfo () { },
    requestCallback (grid, data) {
      if (data && data.code === 0) {
        grid.list = data.data.result
        grid.totalCount = data.data.totalCount
      }
    },
    refresh () {
      this.$refs.I18n.getDataList()
    },
    del (id) {
      var ids = id
        ? [id]
        : this.multipleSelection.map((item) => {
          return item.id
        })
      let params = {}
      params = {
        ids: ids,
        language: this.$store.state.i18n.locale === 'zh' ? 'zh_CN' : 'en_us'
      }
      this.$confirm(this.$t('info.common.delete'), this.$t('window.prompt')).then(() => {
        this.$http({
          url: '/service/language/del',
          method: 'post',
          data: params,
          contentType: 'json'
        }).then((res) => {
          if (res && res.code === 0) {
            this.refresh()
            this.$message({
              message: this.$t('info.common.deletesuccess'),
              type: 'success',
              duration: 1500,
              onClose: () => { }
            })
          } else {
            this.$message.error(this.$t(res.msg))
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
#menuList {
}
</style>
