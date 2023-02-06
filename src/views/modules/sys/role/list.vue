<template>
  <div id="RoleList">
    <grid
      :api="api"
      :model="dataForm"
      :columns="columns"
      :method="'post'"
      :requestOption="{contentType: 'json'}"
      :rowKey="'id'"
      :multiSelectedArr.sync="multipleSelection"
      ref="role"
      :requestCallback="requestCallback"
    >
      <div slot="form">
        <el-form-item :label="this.$t('角色名称')">
          <el-input
            v-model="dataForm.roleName"
            :placeholder="this.$t('角色名称')"
            clearable
          ></el-input>
        </el-form-item>
      </div>
      <btn-list :data="btnList" @click="action" slot="toolbar"></btn-list>
    </grid>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="refresh"></add-or-update>
    <distribute v-if="distributeVisible" ref="distribute"></distribute>
  </div>
</template>

<script type="text/jsx">
import AddOrUpdate from './Role-add-or-update'
import Distribute from './Role-distribute'
export default {
  name: 'RoleList',
  components: { AddOrUpdate, Distribute },
  mixins: [],
  props: {},
  data () {
    return {
      api: '/list/5',
      addOrUpdateVisible: false,
      distributeVisible: false,
      multipleSelection: [],
      dataForm: {
        roleName: ''
      },
      columns: [
        { type: 'selection', align: 'center', width: '50' },
        { label: '角色名称', prop: 'roleName', align: 'center' },
        {
          label: '级别',
          prop: 'roleLevel',
          align: 'center',
          render (h, { row }) {
            const roleLevel = (
              <span>
                {this.$store.getters['getDictName']('user.level', row.roleLevel)}
              </span>
            )
            return [roleLevel]
          }
        }
      ]
    }
  },
  computed: {
    btnList () {
      return this.$store.getters.getPermissionsByCode('management.role')
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
        this.$refs.role.list.forEach(item => {
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
      } else if (this.multipleSelection.length === 1) {
        this.addOrUpdateVisible = true
        let editItem = {}
        this.$refs.role.list.forEach(item => {
          if (item.id === this.multipleSelection[0].id) {
            editItem = JSON.parse(JSON.stringify(item))
          }
        })
        console.log(editItem)
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(editItem, 'type')
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
    assign () {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: this.$t('info.common.selectmore'),
          type: 'warning',
          duration: 1500
        })
      } else if (this.multipleSelection.length === 1) {
        this.distributeVisible = true
        this.$nextTick(() => {
          this.$refs.distribute.init(this.multipleSelection[0].id)
        })
      } else {
        this.$message({
          message: this.$t('info.common.selectone'),
          type: 'warning',
          duration: 1500
        })
      }
    },
    refresh () {
      this.$refs.role.getDataList()
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
      this.$confirm(this.$t('info.common.delete'), this.$t('提示')).then(() => {
        this.$http({
          url: '/service/role/del',
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
    },
    requestCallback (grid, data) {
      if (data && data.code === 0) {
        grid.list = data.data.result
        grid.totalCount = data.data.totalCount
      }
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
