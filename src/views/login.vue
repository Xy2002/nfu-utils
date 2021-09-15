<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="4">
            <div class="grid-content"></div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content"><h1>广州南方学院-教务小助手</h1></div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content"></div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="4">
            <div class="grid-content"></div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content"><h3>请先登录！</h3></div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content"></div>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="4">
            <div class="grid-content"></div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content" id="loginForm">
              <el-form
                  :label-position="labelPosition"
                  status-icon
                  :rules="rules"
                  ref="loginFormS"
                  label-width="80px"
                  :model="loginFormS"
                  id="loginForm2"
              >
                <el-form-item prop="username" label="教务账号">
                  <el-input v-model="loginFormS.username"></el-input>
                </el-form-item>
                <el-form-item prop="pass" label="教务密码">
                  <el-input
                      type="password"
                      v-model="loginFormS.pass"
                  ></el-input>
                </el-form-item>
                <div style="margin-bottom: 15px">
                  <el-checkbox v-model="checked1" label="记住密码">记住密码</el-checkbox>
                </div>
                <div class="buttonGroup">
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('loginFormS')"
                    >提交
                    </el-button
                    >
                    <el-button @click="resetForm('loginFormS')">重置</el-button>
                  </el-form-item>
                </div>
              </el-form>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content"></div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
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
      checked1: false,
      activeIndex: "1",
      isLogin: false,
      labelPosition: "right",
      loginFormS: {
        username: "",
        pass: "",
      },
      rules: {
        pass: [{validator: validatePass, trigger: "blur"}],
        username: [{validator: validateUsername, trigger: "blur"}],
      },
    };
  },
  methods: {
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
          user.username = this.loginFormS.username;
          user.password = this.loginFormS.pass;
          if (this.checked1) {
            this.$store.commit("incrementUser", user)
          }else{
            this.$store.commit("incrementUser",{username:"",password:""})
          }
          ecampusLogin(user)
              .then(async (res) => {
                //console.log("path:/login , ecampuseLogin.then(res)",res)
                this.$store.commit("increment", res)
                let userInfo = await getMyself(res)
                let acc = userInfo.username
                let name = userInfo.name
                let id = userInfo.actualId
                this.$store.commit("incrementAccount",acc)
                this.$store.commit("incrementId",id)
                this.$store.commit("incrementName",name)
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() {
    let obj = this.$store.getters.getUser
    if(obj.username&&obj.password){
      this.loginFormS.username=obj.username;
      this.loginFormS.pass=obj.password;
      this.checked1=true
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}

#loginForm {
  border-radius: 4px;
  border: 1px solid gray;
}

#loginForm2 {
  margin-top: 20px;
  margin-right: 20px;
  margin-left: 20px;
}

.buttonGroup {
  margin-left: -80px;
}
</style>
