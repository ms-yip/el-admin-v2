<template>
  <div id="deptList">
    <grid
      :api="api"
      :model="dataForm"
      :columns="columns"
      :requestOption="{contentType: 'json'}"
      :method="'post'"
      :rowKey="'id'"
      single-select
      :selectedByMouseClick.sync="selectedByMouseClick"
      ref="dept"
      :layout="['form', 'toolbar', 'table']"
      :requestCallback="requestCallback"
    >
      <div slot="form">
        <el-form-item :label="this.$t('sys.dept.code')">
          <el-input v-model="dataForm.code" :placeholder="this.$t('sys.dept.code')" clearable></el-input>
        </el-form-item>
        <el-form-item :label="this.$t('sys.dept.name')">
          <el-input v-model="dataForm.name" :placeholder="this.$t('sys.dept.name')" clearable></el-input>
        </el-form-item>
        <el-form-item :label="this.$t('sys.dept.contactMan')">
          <el-input
            v-model="dataForm.contactMan"
            :placeholder="this.$t('sys.dept.contactMan')"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item :label="this.$t('sys.dept.address')">
          <el-input v-model="dataForm.address" :placeholder="this.$t('sys.dept.address')" clearable></el-input>
        </el-form-item>
      </div>
      <btn-list :data="btnList" @click="action" slot="toolbar"></btn-list>
    </grid>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="refresh"></add-or-update>
    <week-set v-if="weekSetVisiable" ref="weekSet" @refreshDataList="refresh"></week-set>
    <change-parent v-if="changeParentVisiable" ref="changeParent" @refreshDataList="refresh"></change-parent>
  </div>
</template>

<script type="text/jsx">
import ChangeParent from './changeParent'
import AddOrUpdate from './dept-add-or-update'
import WeekSet from './weekSet'
export default {
  name: 'deptList',
  components: { AddOrUpdate, WeekSet, ChangeParent },
  mixins: [],
  props: {},
  data () {
    return {
      api: '/service/dept/getDepts',
      columns: [
        { label: 'sys.dept.name', prop: 'name', align: 'left', minWidth: '200' },
        { label: 'sys.dept.address', prop: 'address', align: 'center', width: '220' },
        { label: 'sys.dept.telephone', prop: 'telephone', align: 'center' },
        {
          label: '标志',
          align: 'center',
          isFilter: true,
          render (h, { row }) {
            const orgMark = (
              <span>
                {this.$store.getters['getDictName']('dept.orgMark', row.orgMark)}
              </span>
            )
            return [orgMark]
          }
        },
        {
          label: '状态',
          align: 'center',
          isFilter: true,
          render (h, { row }) {
            const status = (
              <span>
                {this.$store.getters['getDictName']('dept.status', row.status)}
              </span>
            )
            return [status]
          }
        },
        { label: '周边环境', prop: 'memo', align: 'center', isFilter: true }
      ],
      addOrUpdateVisible: false,
      changeParentVisiable: false,
      selectedByMouseClick: null,
      list: [],
      weekSetVisiable: false,
      dataForm: {
        code: '',
        name: '',
        contactMan: '',
        address: ''
      }
    }
  },
  computed: {
    btnList () {
      return this.$store.getters.getPermissionsByCode('management.hierarchy')
    }
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
      this.addOrUpdateVisible = true
      if (this.selectedByMouseClick) {
        let editItem = {}
        this.list.forEach(item => {
          if (item.id === this.selectedByMouseClick.id) {
            editItem = JSON.parse(JSON.stringify(item))
          }
        })
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(editItem)
        })
      }
    },
    setWeek () {
      this.weekSetVisiable = true
      if (this.selectedByMouseClick) {
        this.$nextTick(() => {
          this.$refs.weekSet.init(this.selectedByMouseClick.id)
        })
      }
    },
    setHoliday () { },
    importHoliday () { },
    changeParent () {
      this.changeParentVisiable = true
      if (this.selectedByMouseClick) {
        let editItem = {}
        this.list.forEach(item => {
          if (item.id === this.selectedByMouseClick.id) {
            editItem = JSON.parse(JSON.stringify(item))
          }
        })
        if (editItem.deptLevel >= 3) {
          this.$nextTick(() => {
            this.$refs.changeParent.init(editItem)
          })
        } else {
          this.$message({
            message: '不允许修改支行以上机构的父机构！',
            type: 'warning',
            duration: 1500
          })
        }
      }
    },
    exportData () {
      let params = {
        language: this.$store.state.i18n.locale === 'zh' ? 'zh_CN' : 'en_us',
        code: this.dataForm.code,
        name: this.dataForm.name,
        contactMan: this.dataForm.contactMan,
        address: this.dataForm.address,
        titles: this.$t('sys.dept.name') + ',' +
          this.$t('sys.dept.deptIndex') + ',' +
          this.$t('sys.dept.code') + ',' +
          this.$t('sys.dept.contactMan') + ',' +
          this.$t('sys.dept.address') + ',' +
          this.$t('sys.dept.telephone') + ',' +
          this.$t('sys.dept.unionNo') + ',' +
          this.$t('sys.dept.unionBankno') + ',' +
          this.$t('feelview.term.info.longitude') + ',' +
          this.$t('feelview.term.info.dimension') + ',' +
          this.$t('sys.dept.orgMark') + ',' +
          this.$t('sys.dept.status') + ',' +
          this.$t('sys.dept.city') + ',' +
          this.$t('sys.dept.cityArea') + ',' +
          this.$t('sys.dept.holidaySetting') + ',' +
          this.$t('sys.dept.memo'),
        titleFields: 'name' + ',' +
          'deptIndex' + ',' +
          'code' + ',' +
          'contactMan' + ',' +
          'address' + ',' +
          'telephone' + ',' +
          'unionNo' + ',' +
          'unionBankno' + ',' +
          'orgLng' + ',' +
          'orgLat' + ',' +
          'dept.orgMark' + ',' +
          'status' + ',' +
          'city' + ',' +
          'weeksetFlag' + ',' +
          'holidaysetFlag' + ',' +
          'memo'
      }
      this.$http({
        url:
          `/service/dept/exportExcel`,
        method: 'post',
        data: params,
        contentType: 'json'
      }).then((res) => {
        if (res.code === 0) {
          let fileName = res.data.fileName
          let query = 'fileName=' + fileName
          window.location.href = '/api/service/excel/download?' + query
        }
      })
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
    refresh () {
      this.$refs.dept.getDataList()
    },
    requestCallback (grid, data) {
      if (data && data.code === 0) {
        grid.list = data.data
        grid.list.forEach(item => {
          item.city = item.city.padStart(4, '0')
        })
        this.nestToSimple(grid.list)
      }
    },
    del () {
      let params = {}
      params = {
        ids: [this.selectedByMouseClick.id],
        language: this.$store.state.i18n.locale === 'zh' ? 'zh_CN' : 'en_us'
      }
      this.$confirm(this.$t('info.common.delete'), this.$t('window.prompt')).then(() => {
        this.$http({
          url: '/service/dept/del',
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
#deptList {
}
</style>
