// 用户管理
<template>
  <div id="userList">
    <grid
      :api="api"
      :columns="columns"
      :model.sync="dataForm"
      :multiSelectedArr.sync="multipleSelection"
      :rowKey="'id'"
      ref="user"
      has-tree
    >
      <div slot="form">
        <el-form-item :label="$t('sys.user.account')">
          <el-input
            size="mini"
            :placeholder="this.$t('sys.user.account')"
            v-model="dataForm.account"
            clearable
          />
        </el-form-item>
        <el-form-item :label="$t('sys.user.name')">
          <el-input
            size="mini"
            v-model="dataForm.name"
            :placeholder="this.$t('sys.user.name')"
            clearable
          />
        </el-form-item>
      </div>
      <btn-list :data="btnList" @click="action" slot="toolbar"></btn-list>
    </grid>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="refresh"></add-or-update>
    <set-group v-if="SetGroupVisible" ref="setGroup" @refreshDataList="refresh"></set-group>
    <import-user-info v-if="importVisible" ref="importUserInfo" @refreshDataList="refresh"></import-user-info>
  </div>
</template>

<script type="text/jsx">
import AddOrUpdate from './User-add-or-update'
import SetGroup from './setGroup'
import ImportUserInfo from './importUserInfo'
export default {
  name: 'userList',
  components: { AddOrUpdate, SetGroup, ImportUserInfo },
  mixins: [],
  props: {},
  data () {
    return {
      api: '/service/user/getPage',
      addOrUpdateVisible: false,
      SetGroupVisible: false,
      importVisible: false,
      multipleSelection: [],
      dataForm: {
        account: '',
        name: '',
        treeDeptId: ''
      },
      columns: [
        { type: 'selection', width: 50 },
        { label: '机构', prop: 'deptName' },
        { label: 'sys.user.account', prop: 'account' },
        { label: 'sys.user.name', prop: 'name' },
        { label: 'sys.user.tel', prop: 'tel', minWidth: '100' },
        { label: 'sys.user.email', prop: 'email' },
        {
          label: 'sys.user.flag',
          render (h, { row }) {
            const flag = (
              <span>
                {this.$store.getters['getDictName']('status', row.flag)}
              </span>
            )
            return [flag]
          }
        },
        { label: 'sys.user.roles', prop: 'userRole', minWidth: 200 }
      ],
      dataListSelections: []
    }
  },
  computed: {
    btnList () {
      return this.$store.getters.getPermissionsByCode('management.user')
    },
    stateList () { return this.$store.getters['getDictList']('dept.status') }
  },
  created () { },
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
        this.$refs.user.list.forEach(item => {
          if (item.id === this.multipleSelection[0].id) {
            editItem = JSON.parse(JSON.stringify(item))
          }
        })
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
        this.$refs.user.list.forEach(item => {
          if (item.id === this.multipleSelection[0].id) {
            editItem = JSON.parse(JSON.stringify(item))
          }
        })
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
          url: '/service/user/del',
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
    refresh () {
      this.$refs.user.getDataList()
    },
    exportData () { },
    resetpassword () {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: this.$t('info.common.selectmore'),
          type: 'warning',
          duration: 1500
        })
      } else if (this.multipleSelection.length === 1) {
        this.$confirm(this.$t('info.password.reset'), this.$t('window.prompt')).then(() => {
          let params = {}
          params = {
            id: this.multipleSelection[0].id,
            language: this.$store.state.i18n.locale === 'zh' ? 'zh_CN' : 'en_us'
          }
          this.$http({
            url: '/service/user/resetPassword',
            method: 'post',
            data: params,
            contentType: 'json'
          }).then((res) => {
            if (res && res.code === 0) {
              this.refresh()
              this.$message({
                message: this.$t('operateSuccess'),
                type: 'success',
                duration: 1500,
                onClose: () => { }
              })
            } else {
              this.$message.error(this.$t(res.msg))
            }
          })
        })
      } else {
        this.$message({
          message: this.$t('info.common.selectone'),
          type: 'warning',
          duration: 1500
        })
      }
    },
    setgroup () {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: this.$t('info.common.selectmore'),
          type: 'warning',
          duration: 1500
        })
      } else if (this.multipleSelection.length === 1) {
        this.SetGroupVisible = true
        let editItem = {}
        this.$refs.user.list.forEach(item => {
          if (item.id === this.multipleSelection[0].id) {
            editItem = JSON.parse(JSON.stringify(item))
          }
        })
        this.$nextTick(() => {
          this.$refs.setGroup.init(editItem)
        })
      } else {
        this.$message({
          message: this.$t('info.common.selectone'),
          type: 'warning',
          duration: 1500
        })
      }
    },
    importUserInfo () {
      this.importVisible = true
      this.$nextTick(() => {
        this.$refs.importUserInfo.init()
      })
    }
  },
  filters: {},
  watch: {
    btnList: {
      immediate: true,
      handler (val) {
        console.log(val.map(i => i.code))
      }
    },
    dataListSelections (val) {
      console.log(val)
    }
  }
}
</script>
<style lang="scss" scoped>
// @import '';
#userList {
}
</style>
