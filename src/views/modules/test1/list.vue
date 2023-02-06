<template>
  <div id="list">
    <grid
      :api="api"
      :columns="columns"
      :model.sync="dataForm"
      :method="'post'"
      :requestOption="{contentType: 'json'}"
      :rowKey="'id'"
      ref="type"
      :multiSelectedArr.sync="dataListSelections"
    >
      <div slot="form">
        <el-form-item :label="$t('name')">
          <el-input
            size="mini"
            :placeholder="this.$t('name')"
            v-model="dataForm.groupName"
            clearable
            style="width:140px;"
          />
        </el-form-item>
      </div>
      <btn-list :data="btnList" @click="action" slot="toolbar"></btn-list>
    </grid>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="refresh" :flag="publicFlag" :tableData="tableData"></add-or-update>
    <group-info v-if="groupInfoVisible" ref="groupInfo" :tableData="tableData"></group-info>
  </div>
</template>

<script type="text/jsx">
import AddOrUpdate from './add-or-update'
import GroupInfo from './group-info'
export default {
  name: 'groupList',
  components: {AddOrUpdate, GroupInfo},
  mixins: [],
  props: {},
  data () {
    return {
      api: '/list/2',
      dataForm: {
        groupName: ''
      },
      columns: [
        { type: 'selection', width: 50 },
        { label: 'name',
          render (h, { row }) {
            const show = (
              <el-button
                type = "text"
                size = "small"
                style = "color:#000;"
                on-click = {() => this.showGroupInfo(row.groupId)}
              >{ row.groupName }</el-button>
            )
            return show
          },
          sortable: true
        },
        { label: 'remark', prop: 'memo', sortable: true },
        {
          label: 'Flag',
          render (h, { row }) {
            const flag = (
              <span>
                {this.$store.getters['getDictName']('groupFlag', row.flag)}
              </span>
            )
            return [flag]
          },
          sortable: true
        },
        { label: 'operation',
          fixed: 'right',
          render (h, { row }) {
            // var filt = row.filter
            // console.log(filt.deptIds)
            // if (filt.deptIds.length !== 0) {
            const edt = (
              <el-button
                type="text"
                on-click={() => this.edit(row.groupId)}
                icon="icon-ic_bianji"
              >编辑</el-button>
            )
            const dlt = (
              <el-button
                type="text"
                on-click={() => this.del(row.groupId)}
                icon="icon-ic_shanchu"
              >删除</el-button>
            )
            let btnArr = []
            btnArr.push(edt)
            btnArr.push(dlt)
            return btnArr
            // }
          },
          sortable: true
        }
      ],
      dataListSelections: [],
      addOrUpdateVisible: false,
      groupInfoVisible: false,
      publicFlag: 0, // 新增公共方法0，新增私人方法1
      tableData: []
    }
  },
  computed: {
    btnList () {
      return this.$store.getters.getPermissionsByCode('management.terminal.Group')
    }
  },
  created () {},
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
    showGroupInfo (id) {
      let ids = {}
      ids.id = id
      this.$http({
        url: '/list/6',
        method: 'post',
        data: ids,
        contentType: 'json'
      }).then((res) => {
        this.groupInfoVisible = true
        this.tableData = []
        res.data.forEach(item => {
          this.tableData.push(JSON.parse(JSON.stringify(item)))
        })
        this.$nextTick(() => {
          this.$refs.groupInfo.init()
        })
      })
    },
    // 新增公共分组
    add () {
      this.publicFlag = 0
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init()
      })
    },
    // 新增私人分组-是否在新增页面多加一个参数flag
    addperson () {
      this.publicFlag = 1
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init()
      })
    },
    edit (id) {
      this.addOrUpdateVisible = true
      let editItem = {}
      this.tableData = []
      this.publicFlag = 2
      this.$refs.type.list.forEach(item => {
        if (item.groupId === id) {
          editItem = JSON.parse(JSON.stringify(item))
          this.tableData.push(JSON.parse(JSON.stringify(item.filter)))
        }
      })
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(editItem)
      })
    },
    copy () { },
    del (id) {
      this.$confirm(this.$t('info.common.delete'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        let params = {}
        params = {
          groupIds: id
          // language: this.$store.state.i18n.locale === 'zh' ? 'zh_CN' : 'en_us'
        }
        this.$http({
          url: '/del',
          method: 'post',
          data: params,
          contentType: 'json'
        }).then((res) => {
          if (res && res.resultCode === 0) {
            this.refresh()
            this.$message({
              message: this.$t('info.common.deletesuccess'),
              type: 'success',
              duration: 1500,
              onClose: () => { }
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('unselect')
        })
      })
    },
    refresh () {
      this.$refs.type.getDataList()
    },
    resetpassword () { },
    setgroup () { },
    importUserInfo () { }
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
// :deep .el-button .icon-ic_bianji{
//   width: 20px !important;
// }
</style>
