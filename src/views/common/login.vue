
<template>
  <div id="login">
    <div class="login-content">
      <div class="left"></div>
      <div class="right">
        <img src="@/assets/img/login/logo.png"
             class="logo" />
        <div class="title" :style="titleObj">{{ $t('login.title') }}</div>
        <el-form :model="dataForm"
                 :rules="dataRule"
                 ref="dataForm"
                 @keyup.enter.native="dataFormSubmit()"
                 class="login-form">
          <el-form-item prop="j_username">
            <el-input v-model="dataForm.j_username"
                      :placeholder="$t('login.account')"
                      class="username"
                      @keyup.native="showError = false">
              <span slot="prefix"
                    class="el-icon-user-solid"></span>
            </el-input>
          </el-form-item>
          <el-form-item prop="j_password">
            <el-input v-model="dataForm.j_password"
                      type="password"
                      :placeholder="$t('login.password')"
                      class="password"
                      @keyup.native="showError = false">
              <span slot="prefix"
                    class="el-icon-lock"></span>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col :span="18">
                <el-dropdown @command="onLanguageChange"
                             placement="bottom">
                  <span class="el-dropdown-link"
                        style="font-size: 12px; cursor: pointer">
                    {{ $t('dict.languageType.' + locale) }}
                    <i class="el-icon-arrow-down "></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="language in languages"
                                      :command="language.value"
                                      :key="language.value"
                                      :class="locale === language.value ? 'is-active' : ''"
                                      :disabled="loadingLanguageMessage">
                      {{ $t('dict.languageType.' + language.value) }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
              <el-col :span="6"
                      style="text-align: right">
         
                <theme-picker v-model="themeColor"></theme-picker>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn-submit"
                       type="primary"
                       @click="dataFormSubmit()">
              {{ $t('login.submit') }}</el-button>
          </el-form-item>
          <p class="error-info"
             v-if="errorInfo">
            <i class="el-icon-info"></i>&nbsp;&nbsp;{{ $t(errorInfo) }}
          </p>
        </el-form>
      </div>
    </div>
    <footer>{{ $t('com.copyright', [new Date().getFullYear()]) }}</footer>
  </div>
</template>

<script type="text/jsx">
import themePicker from '@/views/common/components/theme'
import sha256 from 'js-sha256'
const encodeUser = function (val) {
  const code = 255
  let encodeStr = ''
  for (let i = 0; i < val.length; i++) {
    encodeStr += (val.charCodeAt(i) ^ code) + 95 + '%'
  }
  return encodeStr
}

const encodePwd = function (username, userpwd) {
  const password = username + userpwd
  const pwd = sha256(password)
  return pwd
}

export default {
  name: 'loginCom',
  components: {themePicker},
  mixins: [],
  props: {},
  data () {
    return {
      loadingLanguageMessage: false, // loading data (requesting data) or not
      dataForm: {
        j_username: 'admin',
        j_password: 'ADMIN123'
      },
      errorInfo: '',
      dataRule: {
        j_username: [{ required: true, message: ' ', trigger: 'change' }],
        j_password: [{ required: true, message: ' ', trigger: 'change' }]
      }
    }
  },
  computed: {
    languages () {
      return this.$store.state.i18n.languages
    },
    locale () {
      sessionStorage.setItem('locale', this.$store.state.i18n.locale || 'zh')
      return this.$store.state.i18n.locale
    },
    themeList () {
      return this.$store.state.theme.themeList
    },
    titleObj () {
      return {
        'background-image': `-webkit-linear-gradient(100deg, ${this.$store.getters['theme/themeColorHex'](0.7)} 0%, ${this.$store.getters['theme/themeColorHex'](1)} 100%)`
      }
    },
    themeColor: {
      get () {
        return this.$store.state.theme.themeColor
      },
      set (val) {
        console.log(val)
        this.$store.commit('theme/updateThemeColor', val)
      }
    }
  },
  created () { },
  mounted () { },
  methods: {
    dataFormSubmit () {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.errorInfo = ''
          const url = '/login'
          this.$http.post(url, {
            j_username: encodeUser(this.dataForm.j_username),
            j_password: encodePwd(this.dataForm.j_username, this.dataForm.j_password)
          })
            .then((res) => {
              if (res && res.code === 0) {
                this.$store.commit('user/updateUser', res.data)
    
                sessionStorage.setItem('sessionId', res.data.sessionId)
                this.$router.push('/')
              } else {
                this.errorInfo = res.msg
           
              }
            })
        }
      })
    },
    onLanguageChange (locale) {
      if (locale !== this.locale) {
        this.$i18n.locale = locale
        this.$store.commit('i18n/updateLocale', locale)
      }
    }
  },
  filters: {},
  watch: {},
  beforeRouteEnter (form, to, next) {
    next(vm => {
      window.clearVuexAlong(true, true)
      console.log(vm)
    })
  }
}
</script>
<style lang="scss" scoped>



#login {
  height: 100%;
  min-width: 600px;
  min-height: 600px;
  background-color: rgba(0, 135, 243, 0.6);
  background: url('../../assets/img/login/bg.jpg') no-repeat;
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .login-content {
    width: 1000px;
    height: 500px;
    border-radius: 6px;
    box-shadow: 0px 22px 50px 0px rgba(0, 19, 91, 0.25);
    display: flex;
    background-color: transparent;
    @media screen and (max-width: 1100px) {
      width: 454px;
    }
    .left {
      width: 546px;
      height: 500px;
      display: inline-block;
      background-color: transparent;
      background: url('../../assets/img/login/login.gif') no-repeat;
      background-size: 100% 100%;
      opacity: 0.6;
      @media screen and (max-width: 1100px) {
        display: none;
      }
    }
    .right {
      width: 454px;
      padding: 70px 50px;
      font-size: 0;
      text-align: left;
      background-color: #ffffff4f;
      .username, .password {
        :deep .el-input__inner {
          height: 52px;
          line-height: 52px;
          border: none;
          border-radius: 0;
          border-inline: none;
          border-bottom: 2px solid #edf1f2;
        }
        :deep .el-input--prefix .el-input__inner {
          padding-left: 34px;
          font-size: 16px;
        }
        :deep .el-input__prefix span {
          height: 48px;
          line-height: 48px;
          font-size: 18px;
        }
      }

      .logo {
        width: 191px;
        height: 50px;
      }
      .title {
        height: 38px;
        line-height: 38px;
        font-size: 28px; //38px
        font-weight: bold;
        margin: 20px 0 17px 0;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .error-info {
        text-align: center;
        color: #e2000c;
        font-size: 14px;
      }
      .login-btn-submit {
        width: 100%;
      }
      .theme-change :deep input.el-input__inner{
        border: none;
      }
    }
  }
  footer {
    margin-top: 40px;
    font-size: 16px;
    line-height: 16px;
    color: #b4e8ff;
  }
}
</style>
