<template>
  <div id="app">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="4">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content">
          <h3>注:所有信息都是基于教务系统获取,并且所有操作都是直接调用教务系统接口</h3>
          <el-descriptions title="用户信息" :column="windowWidth<850?1:3">
            <el-descriptions-item label="姓名"><el-tag type="info" size="small">{{infoForm.name}}</el-tag></el-descriptions-item>
            <el-descriptions-item label="学号"><el-tag type="info" size="small">{{infoForm.id}}</el-tag></el-descriptions-item>
            <el-descriptions-item label="院系"><el-tag size="small">{{infoForm.faculty}}</el-tag></el-descriptions-item>
            <el-descriptions-item label="专业"><el-tag size="small">{{infoForm.major}}</el-tag></el-descriptions-item>
            <el-descriptions-item label="手机"><el-tag type="success" size="small">{{infoForm.phone?infoForm.phone:"暂未填写"}}</el-tag></el-descriptions-item>
            <el-descriptions-item label="邮箱"><el-tag type="success" size="small">{{infoForm.email?infoForm.email:"暂未填写"}}</el-tag></el-descriptions-item>
            <el-descriptions-item label="修改"><el-link icon="el-icon-edit" type="primary" @click="link">点击这里</el-link></el-descriptions-item>
          </el-descriptions>
          <el-dialog title="收货地址" :visible.sync="dialogTableVisible" :width="windowWidth>850?'50%':'80%'">
            <el-form :model="infoForm" status-icon :rules="rules" ref="infoForm" label-width="auto"
                     class="demo-ruleForm" >
              <el-form-item prop="name">
                <el-input v-model="infoForm.name" :disabled="true" autocomplete="off">
                  <template slot="prepend">姓名</template>
                </el-input>
              </el-form-item>
              <el-form-item prop="id">
                <el-input v-model="infoForm.id" :disabled="true">
                  <template slot="prepend">学号</template>
                </el-input>
              </el-form-item>
              <el-form-item prop="faculty">
                <el-input v-model="infoForm.faculty" :disabled="true">
                  <template slot="prepend">院系</template>
                </el-input>
              </el-form-item>
              <el-form-item prop="major">
                <el-input v-model="infoForm.major" :disabled="true">
                  <template slot="prepend">专业</template>
                </el-input>
              </el-form-item>
              <el-form-item prop="phone">
                <el-input v-model="infoForm.phone">
                  <template slot="prepend">手机</template>
                </el-input>
              </el-form-item>
              <el-form-item prop="email">
                <el-input v-model="infoForm.email">
                  <template slot="prepend">邮箱</template>
                </el-input>
              </el-form-item>
<!--              <el-form-item style="">-->
<!--                <el-button type="primary" @click="openConfirm('infoForm')">提交</el-button>-->
<!--              </el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="openConfirm('infoForm');">确 定</el-button>
            </div>
          </el-dialog>


        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getInfo, checkLoginStatus} from '../utils/getInfo'
import updateContact from '../utils/updateContact'

export default {
  name: "info",
  data() {
    var validatorPhone = function (rule, value, callback) {
      if (value === '') {
        callback(new Error('手机号不能为空'))
      } else if (!/^1\d{10}$/.test(value)) {
        callback(new Error('手机号格式错误'))
      } else {
        callback()
      }
    }
    var validatorEmail = function (rule, value, callback) {
      if (value === '') {
        callback(new Error('邮箱不能为空'))
      } else if (!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value)) {
        callback(new Error('邮箱格式错误'))
      } else {
        callback()
      }
    }
    return {
      windowWidth: window.innerWidth,
      dialogTableVisible:false,
      infoForm: {
        name: "",
        id: "",
        faculty: "",
        major: "",
        phone: "",
        email: "",
      },
      rules: {
        phone: [{validator: validatorPhone, trigger: 'blur'}],
        email: [{validator: validatorEmail, trigger: 'blur'}]
      }
    }
  },
  methods: {
    link(){
      this.dialogTableVisible=true

    },
    onResize() {
      this.windowWidth = window.innerWidth
    },
    async initInfo() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let jwloginToken = this.$store.getters.getToken
      let loginStatus = false
      try {
        loginStatus = await checkLoginStatus(jwloginToken)
      } catch (e) {
        this.$notify.error({
          title: 'Error',
          message: '教务系统抽风，请稍后再试'
        });
      }
      console.log("loginStatus",loginStatus)
      if (loginStatus === true) {
        this.infoForm = await getInfo(jwloginToken)
      } else {
        this.$notify.error({
          title: 'Error',
          message: '登录状态已过期，请重新登录'
        });
        this.$router.push("./login");
      }
      loading.close()
    },
    submitForm(formName) {
      let jwloginToken = this.$store.getters.getToken
      let newInfo = {}
      newInfo.phone = this.infoForm.phone
      newInfo.id = this.infoForm.id
      newInfo.name = this.infoForm.name
      newInfo.email = this.infoForm.email
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await updateContact(jwloginToken, newInfo)
          console.log(res)
          if (res !== true) {
            this.openError2Notify()
          } else {
            this.openSuccessNotify()
          }
        } else {
          this.openErrorNotify()
          return false;
        }
      });
    },
    openErrorNotify() {
      this.$notify({
        title: 'Error',
        message: '请规范填写相应信息',
        type: 'warning'
      });
    },
    openSuccessNotify() {
      this.$notify({
        title: 'success',
        message: '成功在教务系统更新信息',
        type: 'success'
      });
    },
    openError2Notify() {
      this.$notify.error({
        title: 'Error',
        message: '教务系统未成功响应，更新信息失败'
      });
    },
    openConfirm(formName) {
      this.$confirm('此操作将会更新教务系统上的信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.submitForm(formName)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },

  },
  watch:{
    windowWidth(newWidth, oldWidth) {
      this.txt = `it changed to ${newWidth} from ${oldWidth}`;
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  created() {
    this.$emit('default-active',1)

    this.initInfo()

  },

}
</script>

<style scoped>

</style>
