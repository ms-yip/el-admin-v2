<template>
  <el-dialog :title="this.$t('window.view')" :visible.sync="visible">
    <el-form
      :model="dataForm"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="150px"
    >
      <el-form-item :label="$t('原父机构')" prop="disParentName">
        <el-select size="mini" v-model="disParentName" disabled>
          <el-option :value="disParentName">
            <el-tree :data="deptList" :props="defaultProps"></el-tree>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('修改后的父机构')" prop="parentName">
        <el-select size="mini" v-model="parentName">
          <el-option :value="parentName">
            <el-tree :data="deptList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button
        type="primary"
        @click="dataFormSubmit()"
        v-loading.fullscreen.lock="fullscreenLoading"
      >确定</el-button>
    </div>
  </el-dialog>
</template>

<script type="text/jsx">
export default {
  components: {},
  mixins: [],
  props: {},
  data () {
    return {
      visible: false,
      fullscreenLoading: false,
      clickStatu: false,
      deptList: [],
      parentName: '',
      newParent: '',
      disParentName: '',
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dataForm: {
        id: '',
        name: '',
        unionNo: '',
        code: '',
        unionBankno: '',
        parentId: '',
        orgLng: '',
        deptIndex: '',
        orgLat: '',
        contactMan: '',
        status: '',
        telephone: '',
        city: '',
        orgMark: '',
        cityArea: '',
        address: '',
        memo: '',
        weeksetFlag: '',
        deptId1: '',
        deptId2: '',
        deptId3: '',
        deptId4: '',
        deptId5: '',
        deptId6: '',
        deptLevel: 1,
        deptName1: '',
        deptName2: '',
        deptName3: '',
        deptName4: '',
        deptName5: '',
        deptName6: ''
      }
    }
  },
  computed: {},
  created () {
  },
  mounted () {
  },
  methods: {
    init (item) {
      this.getDeptList()
      this.visible = true
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields()
        if (item) {
          console.log(item)
          this.dataForm = item || ''
          this.newParent = item.parentId
          for (let i = 6; i >= 1; i--) {
            if (item['deptName' + i]) {
              this.parentName = item['deptName' + (i - 1)]
              this.disParentName = item['deptName' + (i - 1)]
              return
            }
          }
        }
      })
    },
    getDeptList () {
      let params = {}
      params = {
        language: this.$store.state.i18n.locale === 'zh' ? 'zh_CN' : 'en_us'
      }
      this.$http({
        url: '/service/dept/getDepts',
        method: 'post',
        data: params,
        contentType: 'json'
      }).then(res => {
        if (res.code === 0) {
          this.deptList = res.data
        } else {
          this.$message(this.$t(res.msg))
        }
      })
    },
    handleNodeClick (val) {
      this.parentName = val.name
      this.newParent = val.id
      this.dataForm.deptLevel = val.deptLevel + 1
    },
    dataFormSubmit () {
      if (!this.clickStatu) {
        if (this.newParent === this.dataForm.parentId) {
          this.$message({
            message: this.$t('父机构未改变'),
            type: 'warning',
            duration: 1500,
            onClose: () => {
              this.clickStatu = false
              this.fullscreenLoading = false
            }
          })
        } else {
          this.clickStatu = true
          this.fullscreenLoading = true
          let params = {}
          params = {
            id: this.dataForm.id,
            weeksetFlag: this.dataForm.weeksetFlag,
            newParent: this.newParent,
            parentId: this.dataForm.parentId,
            mx_internal_uid: '',
            city: this.dataForm.city,
            orgMark: this.dataForm.orgMark,
            address: this.dataForm.address,
            deptLevel: this.dataForm.deptLevel,
            code: this.dataForm,
            children: this.dataForm.children,
            state: this.dataForm.state,
            holidaysetFlag: this.dataForm.holidaysetFlag,
            orgLat: this.dataForm.orgLat,
            unionNo: this.dataForm.unionNo,
            status: this.dataForm.status,
            telephone: this.dataForm.telephone,
            unionBankno: this.dataForm.unionBankno,
            memo: this.dataForm.memo,
            flag: this.dataForm.flag,
            contactMan: this.dataForm.contactMan,
            name: this.dataForm.name,
            deptIndex: this.dataForm.deptIndex,
            orgLng: this.dataForm.orgLng,
            cityArea: this.dataForm.cityArea,
            deptId1: this.dataForm.deptId1,
            deptId2: this.dataForm.deptId2,
            deptId3: this.dataForm.deptId3,
            deptId4: this.dataForm.deptId4,
            deptId5: this.dataForm.deptId5,
            deptId6: this.dataForm.deptId6,
            deptName1: this.dataForm.deptName1,
            deptName2: this.dataForm.deptName2,
            deptName3: this.dataForm.deptName3,
            deptName4: this.dataForm.deptName4,
            deptName5: this.dataForm.deptName5,
            deptName6: this.dataForm.deptName6,
            language: this.$store.state.i18n.locale === 'zh' ? 'zh_CN' : 'en_us'
          }
          this.$http({
            url:
              '/service/dept/changeParent',
            method: 'post',
            data: params,
            contentType: 'json'
          }).then((res) => {
            console.log(res)
            if (res && res.code === 0) {
              this.visible = false
              this.$emit('refreshDataList')
              this.$message({
                message: this.$t('operateSuccess'),
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.clickStatu = false
                  this.fullscreenLoading = false
                }
              })
            } else {
              this.$message({
                message: this.$t(res.msg),
                type: 'error',
                duration: 1500,
                onClose: () => {
                  this.clickStatu = false
                  this.fullscreenLoading = false
                }
              })
            }
          })
        }
      }
      setTimeout(() => {
        this.clickStatu = false
        this.fullscreenLoading = false
      }, 1500)
    }
  },
  filters: {},
  watch: {}
}
</script>
<style lang="scss" scoped>
// @import '';
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  background-color: white;
}
</style>
