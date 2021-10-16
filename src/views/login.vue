<template>
  <div id="app">
    <div :style="topDivStyle">

      <div class="grid-content">
        <h2>{{ $t('index.title') }}</h2>
      </div>

      <div :style="bodyStyle">
        <div :style="loginBlockStyle" >
          <p id="loginTitle">
            {{ $t('index.loginTitle') }}
          </p>
          <el-divider></el-divider>
          <div
              id="loginForm"
              class="grid-content">
            <el-form
                id="loginForm2"
                ref="LoginForm"
                :model="LoginForm"
                :rules="rules"
                status-icon>
              <el-form-item
                  prop="username">
                <el-input
                    v-model="LoginForm.username"
                    :placeholder="$t('login.username')"
                    size="large">
                </el-input>
              </el-form-item>
              <el-form-item prop="pass">
                <el-input
                    v-model="LoginForm.pass"
                    :placeholder="$t('login.password')"
                    type="password">
                </el-input>
              </el-form-item>
              <div id="rememberPass">
                <el-checkbox
                    v-model="isChecked">
                  {{ $t('login.rememberPass') }}
                </el-checkbox>
              </div>
              <div>
                <el-button
                    class="loginButton"
                    icon="el-icon-check"
                    round
                    type="primary"
                    @click="submitForm('LoginForm')">
                  {{ $t('login.submit') }}
                </el-button>
              </div>
            </el-form>
          </div>
        </div>
        <div :style="dividerStyle">
          <el-divider :direction="direction"></el-divider>
        </div>
        <div :style="loginBlockStyle" style="text-align: initial">
          <h3>{{ $t('login.noUsername') }}</h3>
          <p>{{ $t('login.registerTip') }}</p>
          <el-button
              class="loginButton"
              icon="el-icon-arrow-right"
              round
              type="primary"
              @click="openNotify">
            {{ $t('login.goRegister') }}
          </el-button>
        </div>
      </div>


    </div>
  </div>
</template>

<script>

const ecampusLogin = require("../utils/ecampusLogin");
const {getMyself} = require('../utils/getMyself')
export default {
  name: "login",
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      isChecked: false,
      activeIndex: "1",
      isLogin: false,
      LoginForm: {
        username: "",
        pass: "",
      },
      rules: {
        pass: [{validator: validatePass, trigger: "blur"}],
        username: [{validator: validateUsername, trigger: "blur"}],
      },
      windowWidth: window.innerWidth,
      topDivStyle: {},
      bodyStyle: {},
      loginBlockStyle: {},
      dividerStyle:{},
      direction:''
    };
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth
      if (this.windowWidth < 850) {
        this.topDivStyle = {
          width: '100vw',
          margin: 'auto'
        }
        this.bodyStyle = {
          display: 'block',
          width: '100%',
          margin: 'auto'
        }
        this.loginBlockStyle = {
          width: '75%',
          margin: 'auto'
        }
        this.dividerStyle={
          width: '75%',
          'margin-top': '15px',
          'margin-left': '12.5%',
          'margin-right': '12.5%'
        }
        this.direction='horizontal'
      } else {
        this.topDivStyle = {
          width: '70vw',
          margin: 'auto'
        }
        this.bodyStyle = {
          display: 'flex'
        }
        this.loginBlockStyle = {
          width: '45%'
        }
        this.dividerStyle={
          width: '10%'
        }
        this.direction='vertical'
      }
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    submitForm(formName) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let user = {};
          user.username = this.LoginForm.username;
          user.password = this.LoginForm.pass;
          if (this.isChecked) {
            this.$store.commit("incrementUser", user)
          } else {
            this.$store.commit("incrementUser", {username: "", password: ""})
          }
          ecampusLogin(user)
              .then(async (res) => {
                //console.log("path:/login , ecampuseLogin.then(res)",res)
                this.$store.commit("increment", res)
                let userInfo = await getMyself(res)
                let acc = userInfo.username
                let name = userInfo.name
                let id = userInfo.actualId
                this.$store.commit("incrementAccount", acc)
                this.$store.commit("incrementId", id)
                this.$store.commit("incrementName", name)
                document.cookie = `jwLoginToken=${res}`;
                this.$notify({
                  title: '成功',
                  message: `登录成功`,
                  type: 'success'
                });
                loading.close();
                location.reload()
              })
              .catch((err) => {
                this.$alert(err, "Tips", {
                  confirmButtonText: "确定",
                });
                loading.close();
              });
        } else {
          this.$notify.error({
            title: '错误',
            message: '请输入账号密码'
          });
          loading.close();
          return false;
        }
      });

    },
    openNotify(){
      this.$notify({
        title: '提示',
        message: '网站正在逐步升级，该按钮暂时没有用处',
      });
    }
  },
  watch: {
    windowWidth(newWidth, oldWidth) {
      this.txt = `it changed to ${newWidth} from ${oldWidth}`;
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
      if (this.windowWidth < 850) {
        this.topDivStyle = {
          width: '100vw',
          margin: 'auto'
        }
        this.bodyStyle = {
          display: 'block',
          width: '100%',
          margin: 'auto'
        }
        this.loginBlockStyle = {
          width: '75%',
          margin: 'auto'
        }
        this.dividerStyle={
          width: '75%',
          'margin-top': '15px',
          'margin-left': '12.5%',
          'margin-right': '12.5%'
        }
        this.direction='horizontal'
      } else {
        this.topDivStyle = {
          width: '70vw',
          margin: 'auto'
        }
        this.bodyStyle = {
          display: 'flex'
        }
        this.loginBlockStyle = {
          width: '45%'
        }
        this.dividerStyle={
          width: '10%'
        }
        this.direction='vertical'
      }
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  created() {
    let obj = this.$store.getters.getUser
    if (obj.username && obj.password) {
      this.LoginForm.username = obj.username;
      this.LoginForm.pass = obj.password;
      this.isChecked = true
    }
  }
};
</script>

<style scoped>
#loginTitle {
  text-align: initial;
  margin-bottom: 0;
  color: #666;
  font-size: 14px
}

#rememberPass {
  margin-bottom: 15px;
  text-align: initial;
}

.loginButton {
  width: 100%;
  border-radius: 12px
}

.el-divider--horizontal {
  margin-top: 0;
}

.el-divider--vertical {
  height: 100%;
}
.el-button--primary {
  color: #FFF;
  background-color: #0071e3;
  border-color: #0071e3;
}
</style>
