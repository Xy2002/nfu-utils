<template>
  <div id="app">
    <!--    菜单下面的第一行 姓名+学号 -->
    <el-row :style="infoBlockStyle">
      <el-col :offset="4" :span="16" :style="infoTitleStyle">
        <p :style="infoTitleNameStyle">
          {{ infoForm.name }}</p>
        <p :style="infoTitleIDStyle">
          你的学号是 {{ infoForm.id }}</p>
      </el-col>
    </el-row>

    <el-row type="flex" v-show="pcShow">
      <el-col :offset="4" :span="4" style="text-align: left">
        <p style="font-size: 32px;line-height: 1.25;font-weight: 400;letter-spacing: .004em;">
          Information
        </p>
      </el-col>
      <el-col :span="5" style="text-align: left">
        <div style="margin-bottom: 29px;">
          <p style="color: #666;padding-bottom: 2px;margin-bottom: 0;margin-top:40px;font-weight: 600;font-size: 14px;line-height: 1.42861;letter-spacing: -.016em;">
            ACCOUNT
          </p>
          <p style="color: #333;margin-top: 0;font-size: 18px;line-height: 1.47059;font-weight: 400;letter-spacing: -.022em;font-style: normal">
            {{infoForm.id}}
          </p>
        </div>
        <div style="margin-bottom: 29px;">
          <p style="color: #666;padding-bottom: 2px;margin-bottom: 0;margin-top:40px;font-weight: 600;font-size: 14px;line-height: 1.42861;letter-spacing: -.016em;">
            FACULTY
          </p>
          <p style="color: #333;margin-top: 0;font-size: 18px;line-height: 1.47059;font-weight: 400;letter-spacing: -.022em;font-style: normal">
            {{infoForm.faculty}}
          </p>
        </div>
        <div style="margin-bottom: 29px;">
          <p style="color: #666;padding-bottom: 2px;margin-bottom: 0;margin-top:40px;font-weight: 600;font-size: 14px;line-height: 1.42861;letter-spacing: -.016em;">
            MAJOR
          </p>
          <p style="color: #333;margin-top: 0;font-size: 18px;line-height: 1.47059;font-weight: 400;letter-spacing: -.022em;font-style: normal">
            {{infoForm.major}}
          </p>
        </div>
        <div style="margin-bottom: 29px;">
          <p style="color: #666;padding-bottom: 2px;margin-bottom: 0;margin-top:40px;font-weight: 600;font-size: 14px;line-height: 1.42861;letter-spacing: -.016em;">
            REACHABLE AT
          </p>
          <p style="color: #333;margin-top: 0;font-size: 18px;line-height: 1.47059;font-weight: 400;letter-spacing: -.022em;font-style: normal">
            {{infoForm.email}}
            <br>
            {{infoForm.phone}}
          </p>
        </div>
      </el-col>
      <el-col :span="5" style="text-align: left">

        <div style="margin-bottom: 29px;">
          <p style="color: #666;padding-bottom: 2px;margin-bottom: 0;margin-top:40px;font-weight: 600;font-size: 14px;line-height: 1.42861;letter-spacing: -.016em;">
            BUILDING NO.
          </p>
          <p style="color: #333;margin-top: 0;font-size: 18px;line-height: 1.47059;font-weight: 400;letter-spacing: -.022em;font-style: normal">
            {{infoForm.architectures}}
          </p>
        </div>

        <div style="margin-bottom: 29px;">
          <p style="color: #666;padding-bottom: 2px;margin-bottom: 0;margin-top:40px;font-weight: 600;font-size: 14px;line-height: 1.42861;letter-spacing: -.016em;">
            ROOM NO.
          </p>
          <p style="color: #333;margin-top: 0;font-size: 18px;line-height: 1.47059;font-weight: 400;letter-spacing: -.022em;font-style: normal">
            {{infoForm.room}}
          </p>
        </div>

        <div style="margin-bottom: 29px;">
          <p style="color: #666;padding-bottom: 2px;margin-bottom: 0;margin-top:40px;font-weight: 600;font-size: 14px;line-height: 1.42861;letter-spacing: -.016em;">
            ELECTRICITY
          </p>
          <p style="color: #333;margin-top: 0;font-size: 18px;line-height: 1.47059;font-weight: 400;letter-spacing: -.022em;font-style: normal">
            {{infoForm.electricity}}
          </p>
        </div>
      </el-col>
    </el-row>

    <div style="margin-left: 25px" v-show="mobileShow">
      <div style="text-align: left">
        <h3 style="color:#666;margin-bottom: 5px;font-size: 14px;line-height: 1.42861;font-weight: 600;letter-spacing: -.016em;">
          ACCOUNT
        </h3>
        <p style="color: #333;margin-top: 0;font-size: 18px;line-height: 1.47059;font-weight: 400;letter-spacing: -.022em;font-style: normal">
          {{infoForm.id}}
        </p>

        <el-divider></el-divider>

        <h3 style="color:#666;margin-bottom: 5px;font-size: 14px;line-height: 1.42861;font-weight: 600;letter-spacing: -.016em;">
          FACULTY
        </h3>
        <p style="color: #333;margin-top: 0;font-size: 18px;line-height: 1.47059;font-weight: 400;letter-spacing: -.022em;font-style: normal">
          {{infoForm.faculty}}
        </p>

        <h3 style="color:#666;margin-bottom: 5px;font-size: 14px;line-height: 1.42861;font-weight: 600;letter-spacing: -.016em;">
          MAJOR
        </h3>
        <p style="color: #333;margin-top: 0;font-size: 18px;line-height: 1.47059;font-weight: 400;letter-spacing: -.022em;font-style: normal">
          {{infoForm.major}}
        </p>
        <h3 style="color:#666;margin-bottom: 5px;font-size: 14px;line-height: 1.42861;font-weight: 600;letter-spacing: -.016em;">
          REACHABLE AT
        </h3>
        <p style="color: #333;margin-top: 0;font-size: 18px;line-height: 1.47059;font-weight: 400;letter-spacing: -.022em;font-style: normal">
          {{infoForm.email}}
          <br>
          {{infoForm.phone}}
        </p>

        <el-divider></el-divider>

        <h3 style="color:#666;margin-bottom: 5px;font-size: 14px;line-height: 1.42861;font-weight: 600;letter-spacing: -.016em;">
          BUILDING NO.
        </h3>
        <p style="color: #333;margin-top: 0;font-size: 18px;line-height: 1.47059;font-weight: 400;letter-spacing: -.022em;font-style: normal">
          {{infoForm.architectures}}
        </p>
        <h3 style="color:#666;margin-bottom: 5px;font-size: 14px;line-height: 1.42861;font-weight: 600;letter-spacing: -.016em;">
          ROOM NO.
        </h3>
        <p style="color: #333;margin-top: 0;font-size: 18px;line-height: 1.47059;font-weight: 400;letter-spacing: -.022em;font-style: normal">
          {{infoForm.room}}
        </p>
        <h3 style="color:#666;margin-bottom: 5px;font-size: 14px;line-height: 1.42861;font-weight: 600;letter-spacing: -.016em;">
          ELECTRICITY
        </h3>
        <p style="color: #333;margin-top: 0;font-size: 18px;line-height: 1.47059;font-weight: 400;letter-spacing: -.022em;font-style: normal">
          {{infoForm.electricity}}
        </p>
      </div>
    </div>
<!--    <el-row class="row-bg" justify="center" type="flex">-->
<!--      <el-col :span="4">-->
<!--        <div class="grid-content bg-purple"></div>-->
<!--      </el-col>-->
<!--      <el-col :span="16">-->
<!--        <div class="grid-content">-->
<!--          <el-descriptions :column="windowWidth<850?1:3" title="用户信息">-->
<!--            <el-descriptions-item label="姓名">-->
<!--              <el-tag size="small" type="info">{{ infoForm.name }}</el-tag>-->
<!--            </el-descriptions-item>-->
<!--            <el-descriptions-item label="学号">-->
<!--              <el-tag size="small" type="info">{{ infoForm.id }}</el-tag>-->
<!--            </el-descriptions-item>-->
<!--            <el-descriptions-item label="院系">-->
<!--              <el-tag size="small">{{ infoForm.faculty }}</el-tag>-->
<!--            </el-descriptions-item>-->
<!--            <el-descriptions-item label="专业">-->
<!--              <el-tag size="small">{{ infoForm.major }}</el-tag>-->
<!--            </el-descriptions-item>-->
<!--            <el-descriptions-item label="所在楼栋">-->
<!--              <el-tag size="small">{{ infoForm.architectures }}</el-tag>-->
<!--            </el-descriptions-item>-->
<!--            <el-descriptions-item label="所在房间">-->
<!--              <el-tag size="small">{{ infoForm.room }}</el-tag>-->
<!--            </el-descriptions-item>-->
<!--            <el-descriptions-item label="宿舍电费">-->
<!--              <el-tag size="small">{{ infoForm.electricity }}</el-tag>-->
<!--            </el-descriptions-item>-->
<!--            <el-descriptions-item label="手机">-->
<!--              <el-tag size="small" type="success">{{ infoForm.phone ? infoForm.phone : "暂未填写" }}</el-tag>-->
<!--            </el-descriptions-item>-->
<!--            <el-descriptions-item label="邮箱">-->
<!--              <el-tag size="small" type="success">{{ infoForm.email ? infoForm.email : "暂未填写" }}</el-tag>-->
<!--            </el-descriptions-item>-->
<!--            <el-descriptions-item label="修改">-->
<!--              <el-link icon="el-icon-edit" type="primary" @click="link">点击这里</el-link>-->
<!--            </el-descriptions-item>-->
<!--          </el-descriptions>-->
<!--          <el-dialog :visible.sync="dialogTableVisible" :width="windowWidth>850?'50%':'80%'" title="修改信息">-->
<!--            <el-form ref="infoForm" :model="infoForm" :rules="rules" class="demo-ruleForm" label-width="auto"-->
<!--                     status-icon>-->
<!--              <el-form-item prop="name">-->
<!--                <el-input v-model="infoForm.name" :disabled="true" autocomplete="off">-->
<!--                  <template slot="prepend">姓名</template>-->
<!--                </el-input>-->
<!--              </el-form-item>-->
<!--              <el-form-item prop="id">-->
<!--                <el-input v-model="infoForm.id" :disabled="true">-->
<!--                  <template slot="prepend">学号</template>-->
<!--                </el-input>-->
<!--              </el-form-item>-->
<!--              <el-form-item prop="faculty">-->
<!--                <el-input v-model="infoForm.faculty" :disabled="true">-->
<!--                  <template slot="prepend">院系</template>-->
<!--                </el-input>-->
<!--              </el-form-item>-->
<!--              <el-form-item prop="major">-->
<!--                <el-input v-model="infoForm.major" :disabled="true">-->
<!--                  <template slot="prepend">专业</template>-->
<!--                </el-input>-->
<!--              </el-form-item>-->
<!--              <el-form-item prop="phone">-->
<!--                <el-input v-model="infoForm.phone">-->
<!--                  <template slot="prepend">手机</template>-->
<!--                </el-input>-->
<!--              </el-form-item>-->
<!--              <el-form-item prop="email">-->
<!--                <el-input v-model="infoForm.email">-->
<!--                  <template slot="prepend">邮箱</template>-->
<!--                </el-input>-->
<!--              </el-form-item>-->
<!--              &lt;!&ndash;              <el-form-item style="">&ndash;&gt;-->
<!--              &lt;!&ndash;                <el-button type="primary" @click="openConfirm('infoForm')">提交</el-button>&ndash;&gt;-->
<!--              &lt;!&ndash;              </el-form-item>&ndash;&gt;-->
<!--            </el-form>-->
<!--            <div slot="footer" class="dialog-footer">-->
<!--              <el-button @click="dialogTableVisible = false">取 消</el-button>-->
<!--              <el-button type="primary" @click="openConfirm('infoForm');">确 定</el-button>-->
<!--            </div>-->
<!--          </el-dialog>-->
<!--        </div>-->
<!--      </el-col>-->
<!--      <el-col :span="4">-->
<!--        <div class="grid-content bg-purple"></div>-->
<!--      </el-col>-->
<!--    </el-row>-->
  </div>
</template>

<script>
import {getInfo, checkLoginStatus} from '@/utils/getInfo'
import updateContact from '../utils/updateContact'
import getElectricity from '@/utils/getElectricity'

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
      dialogTableVisible: false,
      infoForm: {
        name: "",
        id: "",
        faculty: "",
        major: "",
        phone: "",
        email: "",
        architectures: "",
        room: "",
        electricity: ""
      },
      rules: {
        phone: [{validator: validatorPhone, trigger: 'blur'}],
        email: [{validator: validatorEmail, trigger: 'blur'}]
      },
      infoBlockStyle: {},
      infoTitleStyle: {},
      infoTitleNameStyle: {},
      infoTitleIDStyle: {},
      pcShow:true,
      mobileShow:false
    }
  },
  methods: {
    link() {
      this.dialogTableVisible = true

    },
    onResize() {
      this.windowWidth = window.innerWidth

      if (this.windowWidth < 767) {
        this.infoTitleNameStyle = {
          'color': 'white',
          'font-size': '28px',
          'line-height': '1.14286',
          'font-weight': '600',
          'letter-spacing': '.007em',
          'margin-bottom': '0'
        }
        this.infoTitleIDStyle = {
          'color': 'white',
          'font-size': '19px',
          'line-height': '1.42115',
          'font-weight': '400',
          'letter-spacing': '.012em',
          'margin-top': '10px'
        }
        this.infoTitleStyle = {
          'text-align': 'center'
        }
        this.infoBlockStyle = {
          'height': '15vh',
          'background': 'linear-gradient(to right, #360033, #0b8793);'
        }
        this.mobileShow=true
        this.pcShow=false
      } else {
        this.infoTitleNameStyle = {
          'color': 'white',
          'font-size': '40px',
          'line-height': '1.1',
          'font-weight': '600',
          'letter-spacing': '0',
          'margin-bottom': '0'
        }
        this.infoTitleIDStyle = {
          'color': 'white',
          'font-size': '21px',
          'line-height': '1.38105',
          'font-weight': '400',
          'letter-spacing': '.011em',
          'margin-top': '20px'
        }
        this.infoTitleStyle = {
          'text-align': 'left'
        }
        this.infoBlockStyle = {
          'height': '25vh',
          'background': 'linear-gradient(to right, #360033, #0b8793)'
        }
        this.pcShow=true
        this.mobileShow=false
      }

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
      console.log("loginStatus", loginStatus)
      if (loginStatus === true) {
        let infoData = await getInfo(jwloginToken)
        this.infoForm.name = infoData.name
        this.infoForm.email = infoData.email
        this.infoForm.phone = infoData.phone
        this.infoForm.faculty = infoData.faculty
        this.infoForm.major = infoData.major
        this.infoForm.id = infoData.id
        let id = this.$store.getters.getId
        let name = this.$store.getters.getName
        let num = this.$store.getters.getAccount
        let electricityInfo = await getElectricity(id, name, num)
        this.infoForm.architectures = electricityInfo.architectures
        this.infoForm.electricity = electricityInfo.electricity
        this.infoForm.room = electricityInfo.room
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
  watch: {
    windowWidth(newWidth, oldWidth) {
      this.txt = `it changed to ${newWidth} from ${oldWidth}`;
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
      if (this.windowWidth < 767) {
        this.infoTitleNameStyle = {
          'color': 'white',
          'font-size': '28px',
          'line-height': '1.14286',
          'font-weight': '600',
          'letter-spacing': '.007em',
          'margin-bottom': '0'
        }
        this.infoTitleIDStyle = {
          'color': 'white',
          'font-size': '19px',
          'line-height': '1.42115',
          'font-weight': '400',
          'letter-spacing': '.012em',
          'margin-top': '10px'
        }
        this.infoTitleStyle = {
          'text-align': 'center'
        }
        this.infoBlockStyle = {
          'height': '15vh',
          'background': 'linear-gradient(to right, #360033, #0b8793)'
        }
        this.mobileShow=true
        this.pcShow=false
      } else {
        this.infoTitleNameStyle = {
          'color': 'white',
          'font-size': '40px',
          'line-height': '1.1',
          'font-weight': '600',
          'letter-spacing': '0',
          'margin-bottom': '0'
        }
        this.infoTitleIDStyle = {
          'color': 'white',
          'font-size': '21px',
          'line-height': '1.38105',
          'font-weight': '400',
          'letter-spacing': '.011em',
          'margin-top': '20px'
        }
        this.infoTitleStyle = {
          'text-align': 'left'
        }
        this.infoBlockStyle = {
          'height': '25vh',
          'background': 'linear-gradient(to right, #360033, #0b8793)'
        }
        this.pcShow=true
        this.mobileShow=false
      }
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  created() {
    this.$emit('default-active', 1)

    this.initInfo()

  },

}
</script>

<style scoped>
.el-divider--horizontal{
  width: 80%;
}
</style>
