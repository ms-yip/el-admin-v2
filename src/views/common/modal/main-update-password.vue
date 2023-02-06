<template>
  <el-dialog
    :title="$t('修改密码')"
    :visible.sync="visible"
    :append-to-body="true"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="150px"
    >
      <el-form-item :label="$t('旧密码')" prop="password">
        <el-input
          type="password"
          v-model="dataForm.password"
          :placeholder="$t('旧密码')"
          maxlength="16"
          minlength="6"
        />
      </el-form-item>
      <el-form-item :label="$t('新密码')" prop="newPassword">
        <el-input
          type="password"
          v-model="dataForm.newPassword"
          :placeholder="$t('新密码')"
          maxlength="16"
          minlength="6"
        />
      </el-form-item>
      <el-form-item :label="$t('确认新密码')" prop="confirmPassword">
        <el-input
          type="password"
          v-model="dataForm.confirmPassword"
          :placeholder="$t('确认新密码')"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{ $t('取消') }}</el-button>
      <el-button
        type="primary"
        @click="dataFormSubmit()"
        v-loading.fullscreen.lock="fullscreenLoading"
      >
        {{ $t('确定') }}
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import sha256 from 'js-sha256'
// import { clearLoginInfo } from '@/utils';
const clearLoginInfo = function () {}

export default {
  data () {
    const validateConfirmPassword = (rule, value, callback) => {
      if (this.dataForm.newPassword !== value) {
        callback(new Error(this.$t('user.confirmPasswordErrorTips')))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!/\S/.test(value)) {
        callback(new Error(this.$t('msg.input', [this.$t('user.newPassword')])))
      } else if (!/^(?=.*[0-9])(?=.*[a-zA-Z])(.{6,16})$/.test(value)) {
        callback(new Error(this.$t('user.passwordErrorTips')))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      dataForm: {
        password: '',
        newPassword: '',
        confirmPassword: ''
      },
      dataRule: {
        password: [
          {
            required: true,
            message: this.$t('msg.input', [this.$t('user.oldPassword')]),
            trigger: 'blur'
          }
        ],
        newPassword: [
          {
            required: true,
            message: this.$t('msg.input', [this.$t('user.newPassword')]),
            trigger: 'blur'
          },
          { validator: validatePassword, trigger: 'blur' }
        ],
        confirmPassword: [
          {
            required: true,
            message: this.$t('msg.input', [this.$t('user.confirmPassword')]),
            trigger: 'blur'
          },
          { validator: validateConfirmPassword, trigger: 'blur' }
        ]
      },
      fullscreenLoading: false
    }
  },
  computed: {
    userName: {
      get () {
        return this.$store.state.user.name
      }
    },
    mainTabs: {
      get () {
        return this.$store.state.common.mainTabs
      },
      set (val) {
        this.$store.commit('common/updateMainTabs', val)
      }
    }
  },
  methods: {
    // 初始化
    init () {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields()
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          this.fullscreenLoading = true
          const { id } = this.$store.state.user
          const res = await this.$http({
            url: '/service/user/changePassword',
            method: 'post',
            data: {
              oldPassword: sha256(this.dataForm.password),
              newPassword: sha256(this.dataForm.newPassword),
              userId: id
            },
            contentType: 'json'
          })
          this.fullscreenLoading = false
          if (res && res.code === 0) {
            this.$message.success(this.$t('msg.success') || '')
            this.visible = false
            this.$nextTick(() => {
              this.mainTabs = []
              clearLoginInfo()
              this.$router.replace({ name: 'login' })
            })
          } else {
            this.$message.error(this.$t(res.msg) || '')
          }
        }
      })
      setTimeout(() => {
        this.fullscreenLoading = false
      }, 1500)
    }
  }
}
</script>
<style lang="scss" scoped>
:deep .el-dialog__body {
  padding: 0 135px !important;
}
</style>
