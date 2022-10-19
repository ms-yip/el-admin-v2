<template>
  <el-dialog
    :title="!dataForm.id ? this.$t('window.add') : this.$t('window.edit')"
    :visible.sync="visible"
    @close="resetDataForm"
  >
    <el-form
      :model="dataForm"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      :rules="dataRule"
      label-width="150px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('sys.dept.name')" prop="name">
            <el-input v-model="dataForm.name" :maxlength="25"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="12">
          <el-form-item :label="$t('sys.dept.code')" prop="code">
            <el-input v-model="dataForm.code" :maxlength="25"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('sys.dept.parentName')" prop="parentName">
            <el-select size="mini" v-model="parentName" :disabled="disabled">
              <el-option :value="parentName">
                <el-tree
                  :data="deptList"
                  :props="defaultProps"
                  accordion
                  @node-click="handleNodeClick"
                ></el-tree>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('sys.dept.contactMan')" prop="contactMan">
            <el-input v-model="dataForm.contactMan" :maxlength="25"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('状态')" prop="status">
            <el-select size="mini" v-model="dataForm.status">
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('sys.dept.telephone')" prop="telephone">
            <el-input v-model="dataForm.telephone" :maxlength="25"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item :label="$t('sys.dept.address')" prop="address">
          <el-input v-model="dataForm.address" :maxlength="25"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item :label="$t('sys.dept.memo')" prop="memo">
          <el-input v-model="dataForm.memo" :maxlength="25"></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button @click="visible = false">{{$t('button.cancel')}}</el-button>
      <el-button
        type="primary"
        @click="dataFormSubmit()"
        v-loading.fullscreen.lock="fullscreenLoading"
      >{{$t('button.confirm')}}</el-button>
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
      disabled: false,
      deptList: [],
      statusList: this.$store.getters['getDictList']('dept.status'),
      orgMarkList: this.$store.getters['getDictList']('dept.status'),
      cityList: this.$store.getters['getDictList']('dept.status'),
      cityAreaList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      parentName: '',
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
      },
      dataRule: {
        name: [
          {
            required: true,
            message: '',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
  },
  methods: {
    init (item, type) {
      this.getDeptList()
      this.disabled = false
      this.visible = true
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields()
        if (item) {
          console.log(item)
          this.disabled = true
          item.city = item.city.padStart(4, '0')
          let dictCode = item.city
          this.cityList.forEach(item => {
            if (item.value === dictCode) {
              let dictCode = item.code
              dictCode = dictCode.split('.')
              dictCode = dictCode[dictCode.length - 1]
              this.cityAreaList = this.$store.getters['getDictList']('dept.status' + dictCode)
            }
          })
          this.dataForm = item || ''
          for (let i = 6; i >= 1; i--) {
            if (item['deptName' + i]) {
              this.parentName = item['deptName' + (i - 1)]
              return
            }
          }
          if (type === 'copy') {
            this.dataForm.id = ''
          }
        }
      })
    },
    resetDataForm () {
      this.dataForm = {
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
      this.dataForm.parentId = val.id
      this.dataForm.deptLevel = val.deptLevel + 1
      this.parentName = val.name
    },
    changeHandle (val) {
      this.cityList.forEach(item => {
        if (item.value === val) {
          let dictCode = item.code
          dictCode = dictCode.split('.')
          dictCode = dictCode[dictCode.length - 1]
          this.cityAreaList = this.$store.getters['getDictList']('dept.status' + dictCode)
          this.dataForm.cityArea = this.cityAreaList[0].value
        }
      })
    },
    dataFormSubmit () {
      if (!this.clickStatu) {
        this.clickStatu = true
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.fullscreenLoading = true
            let params = {}
            params = {
              id: this.dataForm.id || null,
              parentId: this.dataForm.parentId,
              name: this.dataForm.name,
              unionNo: this.dataForm.unionNo,
              code: this.dataForm.code,
              unionBankno: this.dataForm.unionBankno,
              orgLng: this.dataForm.orgLng,
              deptIndex: this.dataForm.deptIndex,
              orgLat: this.dataForm.orgLat,
              contactMan: this.dataForm.contactMan,
              status: this.dataForm.status || null,
              telephone: this.dataForm.telephone,
              city: this.dataForm.city || null,
              orgMark: this.dataForm.orgMark,
              cityArea: this.dataForm.cityArea || null,
              address: this.dataForm.address,
              memo: this.dataForm.memo,
              deptLevel: this.dataForm.deptLevel,
              language: this.$store.state.i18n.locale === 'zh' ? 'zh_CN' : 'en_us',
              deptId1: this.dataForm.deptId1 || null,
              deptId2: this.dataForm.deptId2 || null,
              deptId3: this.dataForm.deptId3 || null,
              deptId4: this.dataForm.deptId4 || null,
              deptId5: this.dataForm.deptId5 || null,
              deptId6: this.dataForm.deptId6 || null,
              deptName1: this.dataForm.deptName1 || null,
              deptName2: this.dataForm.deptName2 || null,
              deptName3: this.dataForm.deptName3 || null,
              deptName4: this.dataForm.deptName4 || null,
              deptName5: this.dataForm.deptName5 || null,
              deptName6: this.dataForm.deptName6 || null
            }
            this.$http({
              url:
                '/service/dept/save',
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
        })
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
