// 监控
<template>
  <div id="termMonitor">
    <grid :layout="layout"
      method="post"
      ref="grid"
      :columns="columns"
      :requestOption="{contentType: 'json'}"
      :model.sync="dataForm"
      :api="api"
      has-tree
      @listLoaded="listLoaded"
      :rowKey="'id'">
      <!-- :autoGetData="false" -->
        <div slot="toolbar" class="mon-btn-list">
          <el-button @click="reflesh">刷新</el-button>
          <el-button>导出</el-button>
          <el-button @click="openFilter">过滤</el-button>
          <div class="auto-refresh">
            <el-checkbox v-model="isAutoRefresh"
                          @change="changeAutoRefresh"></el-checkbox>
            <span style="padding: 0 5px;">自动刷新</span>
            <el-select v-model="autoRefreshTime"
                        @change="changeAutoRefresh"
                        style="width: 80px;">
              <el-option v-for="item in autoList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div slot="graph" slot-scope="scopedSlots" class="list-box">
          <div class="card-box" v-for="(item, index) in scopedSlots.list" :key="index">
            {{item.typeId}}
          </div>
        </div>
    </grid>
    <filter-dlg ref="filterDlg" v-model="dataForm" @reflesh="reflesh"></filter-dlg>
  </div>
</template>

<script type="text/jsx">
import FilterDlg from './filterDlg'
export default {
  name: 'termMonitor',
  components: { FilterDlg },
  mixins: [],
  props: {},
  data () {
    return {
      dataForm: {
        name: '',
        contacts: '',
        opsType: '',
        isEnabled: ''
      },
      layout: ['toolbar', 'graphTable'],
      api: '/list/1',
      columns: [
        { label: '编号', prop: '' },
        { label: '状态', prop: '' },
        { label: '网络状态', prop: '' },
        { label: '告警开始时间', prop: '' },
        { label: '部门名称', prop: '' },
        { label: '安装地点', prop: '' }
      ],
      dataListSelections: [],
      autoList: [
        {
          label: '15s',
          value: 15
        },
        {
          label: '30s',
          value: 30
        },
        {
          label: '60s',
          value: 60
        },
        {
          label: '90s',
          value: 90
        },
        {
          label: '120s',
          value: 120
        },
        {
          label: '150s',
          value: 150
        }
      ],
      isAutoRefresh: true,
      autoRefreshTime: 120,
      autoRefreshTimer: null
    }
  },
  computed: {},
  created () {
  },
  mounted () {
  },
  methods: {
    reflesh () {
      if (!this.isAutoRefresh) {
        clearTimeout(this.clearTimeout)
      }
      this.$refs.grid.getDataList()
    },
    changeAutoRefresh () {
      let _this = this
      if (
        !_this.isAutoRefresh ||
        _this.currentRoutePath !== _this.$route.path
      ) {
        clearTimeout(_this.autoRefreshTimer)
        return
      }
      _this.autoRefreshTimer = setTimeout(() => {
        if (_this.autoRefreshTimer) clearTimeout(_this.autoRefreshTimer)
        _this.getDataList()
        setTimeout(_this.changeAutoRefresh(), _this.autoRefreshTime * 1000)
      }, _this.autoRefreshTime * 1000)
    },
    listLoaded (value) {
      // 加载完表格后出发
      console.log(value)
    },
    openFilter () {
      this.$refs.filterDlg.init()
    }
  },
  filters: {},
  watch: {}
}
</script>
<style lang="scss" scoped>
// @import '';
#termMonitor{
  .mon-btn-list {
    margin-left: 10px;
  }
  .auto-refresh {
    display: flex;
    align-items: center;
    margin-left: 20px;
    margin-top: -10px;
  }
  .list-box {
    display: flex;
    flex-wrap: wrap;
  }
  .card-box {
    padding: 10px;
    margin: 0 20px 10px 0;
    width: 200px;
    height: 150px;
    background-color: #cccccc;
  }
}
</style>
