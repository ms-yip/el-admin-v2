<template>
  <div class="mod-config">
    <grid :api="api"
          :columns="columns"
          :model.sync="dataForm"
          :rowKey="'id'"
          ref="ad"
          :multiSelectedArr.sync="multiselectedArr">
      <div slot="form">
        <el-form-item label="号码">
          <el-input v-model="dataForm.no"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="业务类型">
          <el-select size="mini"
             v-model="dataForm.type"
                     :placeholder="this.$t('type')">
            <el-option :label="this.$t('status.all')"
                       value=""></el-option>
            <el-option v-for="item in typeList"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
        </el-form-item>
        <el-form-item label="状态">
          <el-select size="mini"
             v-model="dataForm.status"
             :placeholder="this.$t('status')">
            <el-option :label="this.$t('status.all')"
                       value=""></el-option>
            <el-option v-for="item in statusList"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
        </el-form-item>
      </div>
      <div slot="toolbar">
      </div>
    </grid>
  </div>
</template>

<script>
// import Grid from '@/components/template/grid/grid.vue'
export default {
  data () {
    return {
      dataForm: {
        no: '',
        adName: ''
      },
      api: '/list',
      columns: [
        { label: '序号', prop: 'no' },
        {
          label: '号码',
          prop: 'number'
        },
        { label: '类型', prop: 'type' },
        { label: '状态', prop: 'status' }
      ],
      typeList: [],
      statusList: []
    }
  },
  components: {
    // Grid
  },
  created () {
    this.getTypeList()
    this.getStatusList()
  },
  methods: {
    getTypeList () {
      this.typeList = [{
        value: '1',
        label: '1'
      }]
    },
    getStatusList () {
      this.statusList = [{
        value: '1',
        label: '1'
      }]
    }
  }
}
</script>
<style scoped>
</style>
