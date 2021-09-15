<template>
  <el-table
      :data="tableData"
      style="width: 100%"
      stripe
      max-height="650">
    <el-table-column
        prop="name"
        label="课程名称">
    </el-table-column>
    <el-table-column
        prop="schoolYear"
        label="开课学年">
    </el-table-column>
    <el-table-column
        prop="schoolTerm"
        label="学年学期">
    </el-table-column>
    <el-table-column
        prop="unit"
        label="开课单位">
    </el-table-column>
    <el-table-column
        prop="date"
        label="考试日期">
    </el-table-column>
    <el-table-column
        prop="time"
        label="考试时间">
    </el-table-column>
    <el-table-column
        prop="address"
        label="考试场地">
    </el-table-column>
    <el-table-column
        prop="teacher"
        label="监考老师">
    </el-table-column>
  </el-table>
</template>

<script>
import examSpider from '../utils/examSpider'
import {checkLoginStatus} from "@/utils/getInfo";

export default {
  name: "examList",
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    async getExamList() {
      let jwloginToken = this.$store.getters.getToken
      let loginStatus = await checkLoginStatus(jwloginToken)
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      try {
        loginStatus = await checkLoginStatus(jwloginToken)
      } catch (e) {
        this.$notify.error({
          title: 'Error',
          message: '教务系统抽风，请稍后再试'
        });
        loading.close();
      }
      console.log(loginStatus)
      if (loginStatus === true) {
        let obj = await examSpider(jwloginToken)
        let result = []
        for (let i = 0; i < obj.length; i++) {
          let data = obj[i]
          let formatObj = {}
          formatObj.schoolYear = data.kkxn
          formatObj.date = data.ksrq
          formatObj.teacher = data.jkls
          formatObj.schoolTerm = data.xnxq
          formatObj.address = data.kscd
          formatObj.name = data.kcName
          formatObj.time = data.kssj
          formatObj.unit = data.xymc
          result.push(formatObj)
        }
        this.tableData = result
      } else {
        this.$notify.error({
          title: 'Error',
          message: '登录状态已过期，请重新登录'
        });
        this.$router.push("./login");
      }
      loading.close();
    }
  },
  created() {
    this.getExamList()
  }
}
</script>

<style scoped>

</style>
