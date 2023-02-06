<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '编辑'"
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
        <el-form-item label="账号" prop="account">
          <el-input v-model="dataForm.account"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="名称" prop="name">
          <el-input v-model="dataForm.name"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="机构" prop="deptName">
          <el-select size="mini" v-model="dataForm.deptName">
            <el-option :value="dataForm.deptName">
              <el-tree
                :data="deptList"
                :props="defaultProps"
                accordion
                @node-click="handleNodeClick"
              ></el-tree>
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item :label="$t('角色')" prop="userRole">
          <el-popover placement="bottom" width="400" trigger="click">
            <el-table
              :data="roleList"
              @selection-change="handleSelectionChange"
              ref="table"
              class="table"
            >
              <el-table-column type="selection" align="center" width="50"></el-table-column>
              <el-table-column property="roleName" :label="$t('sys.role.roleName')" align="center"></el-table-column>
              <el-table-column
                property="roleLevel"
                :label="$t('sys.role.roleLevel')"
                align="center"
              >
                <template slot-scope="scope">
                  <span>{{ getDictName(scope.row.roleLevel) }}</span>
                </template>
              </el-table-column>
            </el-table>
            <el-input slot="reference" v-model="dataForm.userRole" type="textarea" readonly></el-input>
          </el-popover>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="管理机构" prop="systemDept">
          <el-select size="mini" v-model="dataForm.systemDept">
            <el-option :value="dataForm.systemDept">
              <el-tree
                show-checkbox
                :data="deptList"
                :default-expanded-keys="ids"
                nodeKey="id"
                :props="defaultProps"
                accordion
                ref="tree"
                @check-change="handleNodeChange"
              ></el-tree>
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item
          label="邮箱"
          prop="email"
          :rules="dataForm.sendEmailFlag === '1' ? dynamicRules.email : []"
        >
          <el-input v-model="dataForm.email"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item
          label="电话"
          prop="tel"
          :rules="dataForm.sendflag === '1' ? dynamicRules.tel : []"
        >
          <el-input v-model="dataForm.tel"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="标志" prop="flag">
          <el-select size="mini" v-model="dataForm.flag">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-row>
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
      sendflagList: this.$store.getters['getDictList']('dept.status'),
      sendEmailFlagList: this.$store.getters['getDictList']('dept.status'),
      statusList: this.$store.getters['getDictList']('dept.status'),
      clickStatu: false,
      deptList: [],
      roleList: [],
      ids: [],
      selectedRole: [],
      selectedRoleId: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dataForm: {
        id: '',
        name: '',
        deptId: '',
        account: '',
        deptName: '',
        systemDept: '',
        userRole: '',
        datas: [],
        roles: [],
        email: '',
        tel: '',
        sendEmailFlag: '1',
        sendflag: '1',
        flag: '1'
      },
      dataRule: {
        account: [
          {
            required: true,
            message: this.$t('sys.role.account') + this.$t('info.common.notNull '),
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: this.$t('sys.role.name') + this.$t('info.common.notNull '),
            trigger: 'blur'
          }
        ],
        deptName: [
          {
            required: true,
            message: this.$t('sys.role.deptName') + this.$t('info.common.notNull '),
            trigger: 'change'
          }
        ]
      },
      dynamicRules: {
        email: [
          {
            required: true,
            message: this.$t('sys.role.emial') + this.$t('info.common.notNull '),
            trigger: 'change'
          }
        ],
        tel: [
          {
            required: true,
            message: this.$t('sys.role.tel') + this.$t('info.common.notNull '),
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {},
  created () {
  },
  mounted () {
  },
  methods: {
    init (item, type) {
      this.ids = []
      this.getDept()
      this.getRole()
      this.visible = true
      console.log(item)
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields()
        this.$refs.tree.setCheckedKeys([])
        if (item) {
          this.getUserRoleDatas(item.id)
          this.dataForm = item || ''
          this.dataForm.roles = this.dataForm.userRole.split('，')
          if (type === 'copy') {
            this.dataForm.id = null
          }
        }
      })
    },
    resetDataForm () {
      this.dataForm = {
        id: '',
        name: '',
        deptId: '',
        account: '',
        deptName: '',
        systemDept: '',
        userRole: '',
        datas: [],
        roles: [],
        email: '',
        tel: '',
        sendEmailFlag: '1',
        sendflag: '1',
        flag: '1'
      }
    },
    getDictName (val) {
      return this.$store.getters['getDictName']('user.level', val)
    },
    handleSelectionChange (val) {
      this.selectedRole = val
      this.dataForm.roles = val.map(item => { return item.id })
      let temp = val.map(item => { return item.roleName })
      this.dataForm.userRole = temp.join('，')
    },
    handleNodeClick (val) {
      this.dataForm.deptId = val.id
      this.dataForm.deptName = val.name
    },
    handleNodeChange (val) {
      console.log(val)
      let selectedDept = this.$refs.tree.getCheckedNodes()
      this.dataForm.datas = selectedDept.map(item => {
        return item.id
      })
      let temp = selectedDept.map(item => {
        return item.name
      })
      this.dataForm.systemDept = temp.join('，')
    },
    getUserRoleDatas (userId) {
      let params = {}
      params = {
        userId: userId,
        language: this.$store.state.i18n.locale === 'zh' ? 'zh_CN' : 'en_us'
      }
      this.$http({
        url: '/service/user/list',
        method: 'post',
        data: params,
        contentType: 'json'
      }).then(res => {
        if (res.code === 0) {
          this.nestToSimple(res.data.datas)
          this.dataForm.datas = this.ids
          this.$nextTick(() => {
            this.$refs.tree.setCheckedKeys(this.ids)
          })
        } else {
          this.$message(this.$t(res.msg))
        }
      })
    },
    nestToSimple (data) {
      data.forEach(item => {
        if (item.state) {
          this.ids.push(item.id)
        }
        if (item.children && item.children.length > 0) {
          this.nestToSimple(item.children)
        }
      })
    },
    getDept () {
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
          this.dataForm.systemDept = this.dataForm
        } else {
          this.$message(this.$t(res.msg))
        }
      })
    },
    getRole () {
      let params = {}
      params = {
        language: this.$store.state.i18n.locale === 'zh' ? 'zh_CN' : 'en_us',
        pageSize: '99999',
        pageNo: '1'
      }
      this.$http({
        url: '/service/role/list',
        method: 'post',
        data: params,
        contentType: 'json'
      }).then(res => {
        if (res.code === 0) {
          this.roleList = res.data.result
          for (let i in this.dataForm.roles) {
            for (let j in this.roleList) {
              if (this.dataForm.roles[i].replace(/^\s*|\s*$/g, '') === this.roleList[j].roleName) {
                this.$nextTick(() => {
                  this.$refs.table.toggleRowSelection(this.roleList[j], true)
                })
              }
            }
          }
        } else {
          this.$message(this.$t(res.msg))
        }
      })
    },
    getUserRole () {

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
              deptId: this.dataForm.deptId,
              datas: this.dataForm.datas,
              roles: this.dataForm.roles,
              name: this.dataForm.name,
              account: this.dataForm.account,
              email: this.dataForm.email,
              tel: this.dataForm.tel,
              sendEmailFlag: this.dataForm.sendEmailFlag,
              sendflag: this.dataForm.sendflag,
              flag: this.dataForm.flag,
              language: this.$store.state.i18n.locale === 'zh' ? 'zh_CN' : 'en_us'
            }
            this.$http({
              url:
                '/service/user/save',
              method: 'post',
              data: params,
              contentType: 'json'
            }).then((res) => {
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
.table {
  height: 400px;
}
</style>
