<template>
  <el-dialog
    :visible.sync="visible"
  >
    <el-table :data="tableData">
      <el-table-column prop="termId" :label="$t('termId')"></el-table-column>
      <el-table-column prop="deptName" :label="$t('deptName')"></el-table-column>
      <el-table-column prop="typeId" :label="$t('term.model.typeId')"></el-table-column>
      <el-table-column prop="modelId" :label="$t('modelId')"></el-table-column>
      <el-table-column  id = "brand" prop="brandId" :label="$t('brandId')"></el-table-column>
    </el-table>
  </el-dialog>
</template>

<script type="text/jsx">
export default {
  name:'groupInfo',
  components: {},
  mixins: [],
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      visible: false,
      fullscreenLoading: false,
      deptId: ''
    }
  },
  created () {
  },
  mounted () {
    this.posLIst = this.$store.getters['getDictName']('termBrand')
  },
  methods: {
    init () {
      this.visible = true
    }
  },
  filters: {},
  watch: {}
}
</script>
<style lang="scss" scoped>
// @import '';
</style>
