
<template>
  <div id="termMonitor">
     <grid
      :api="api"
      :columns="columns"
      :model.sync="dataForm"
      :rowKey="'id'"
      ref="user"
      has-tree
      :multiSelectedArr.sync="dataListSelections"
    >
      <div slot="form">
        <el-form-item :label="$t('编号')">
          <el-input
            size="mini"
            :placeholder="this.$t('feeldist.upgrade.task.termId')"
            v-model="dataForm.termId"
            clearable
          />
        </el-form-item>
         <el-form-item :label="this.$t('开始时间')">
          <el-date-picker size="mini"
                          :clearable="false"
                          v-model="dataForm.startDate"
                          type="date"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="this.$t('结束时间')">
          <el-date-picker size="mini"
                          :clearable="false"
                          v-model="dataForm.endDate"
                          type="date"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
      </div>
      <btn-list :data="btnList" @click="action" slot="toolbar"></btn-list>
    </grid>
  </div>
</template>

<script type="text/jsx">
import { getFormatDate } from '@/plugins/utils/index'

export default {
  name: 'termMonitor',
  components: {},
  mixins: [],
  props: {},
  data () {
    const todatTimetemp = new Date()
    const aday = 24 * 3600 * 1000
    return {
      api: '/service/itmTxnReport/getPage',
      dataForm: {
        deptId: '',
        termId: '',
        termBrand: '',
        startDate: getFormatDate(todatTimetemp - aday, 'ymd'),
        endDate: getFormatDate(todatTimetemp - aday, 'ymd') // 2021-02-26 有数据
      },
      columns: [
        { label: '编号', prop: 'deptName' },
        {
          label: 'A',
          children: [
            {
              label: '个人',
              children: [
                {label: '笔数', prop: 'subclass0001_num'},
                {label: '金额', prop: 'subclass0001_amo'}
              ]
            },
            {
              label: '公司',
              children: [
                {label: '笔数', prop: ''},
                {label: '金额', prop: ''}
              ]
            }
          ]
        },
        {
          label: 'B',
          children: [
            {
              label: '个人',
              children: [
                {label: '笔数', prop: ''},
                {label: '金额', prop: ''}
              ]
            },
            {
              label: '公司',
              children: [
                {label: '笔数', prop: ''},
                {label: '金额', prop: ''}
              ]
            }
          ]
        },
        {
          label: '合计',
          children: [
            { label: '笔数', prop: 'total_num' },
            { label: '金额', prop: 'total_amo' }
          ]
        }
      ],
      dataListSelections: []

    }
  },
  computed: {
    btnList () {
      return this.$store.getters.getPermissionsByCode('report.statistics.itmtxn')
    }
  },
  created () {},
  mounted () {},
  methods: {
    action (functionName) {
      const hasFun = !!(functionName && this[functionName])
      if (hasFun) {
        this[functionName]()
      } else {
        this.$message('该功能暂未支持,请联系管理员确认配置是否出错！')
      }
    }
  },
  filters: {},
  watch: {}
}
</script>
<style lang="scss" scoped>
// @import '';
#termMonitor{
}
</style>
