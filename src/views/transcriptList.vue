<template>
  <el-container>
    <el-header style="height: initial">
      <div>
        <el-alert
            :title="alertTitle"
            type="info"
            show-icon
            :closable="false"
            style="margin-top: 10px">
        </el-alert>
        <div class="header">
          <el-row style="margin-top: 10px;margin-bottom: 10px;">
            <el-col :span="8">
              <div class="grid-content">开课学年:
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">开课学期:
                <el-select v-model="value2" placeholder="请选择">
                  <el-option
                      v-for="item in options2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content">点击查询:
                <br v-show="windowWidth<850"/>
                <el-button type="primary" @click="getTranscript" plain>查询</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <el-dialog title="课程排名数据" :visible.sync="dialog2FormVisible" :width="windowWidth>850?'50%':'80%'">
        <el-descriptions border size="mini" :column="parseInt('1')">
          <el-descriptions-item label="课程名称">{{dialogData.courseName}}</el-descriptions-item>
          <el-descriptions-item label="本课人数">{{dialogData.courseCount}}</el-descriptions-item>
          <el-descriptions-item label="本课排名">{{dialogData.courseRank}}</el-descriptions-item>
          <el-descriptions-item label="课程性质">{{dialogData.courseNature}}</el-descriptions-item>
          <el-descriptions-item label="课程学分">{{dialogData.courseCredit}}</el-descriptions-item>
        </el-descriptions>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialog2FormVisible = false">确 定</el-button>
        </div>
      </el-dialog>

    </el-header>
    <el-main>
      <el-table
          :data="tableData"
          style="width: 100%"
          stripe
          max-height="490">
        <el-table-column
            prop="schoolYear"
            label="开课学年">
        </el-table-column>
        <el-table-column
            prop="schoolTerm"
            label="学年学期">
        </el-table-column>
        <el-table-column
            prop="name"
            label="课程名称">
        </el-table-column>
        <el-table-column
            prop="nature"
            label="课程性质">
        </el-table-column>
        <el-table-column
            prop="credit"
            label="课程学分">
        </el-table-column>
        <el-table-column
            prop="usualGrades"
            label="平时成绩">
        </el-table-column>
        <el-table-column
            prop="midTermGrades"
            label="期中成绩">
        </el-table-column>
        <el-table-column
            prop="finalGrades"
            label="期末成绩">
        </el-table-column>
        <el-table-column
            prop="practiceResults"
            label="实践成绩">
        </el-table-column>
        <el-table-column
            prop="overallRating"
            label="总评成绩">
        </el-table-column>
        <el-table-column
            prop="retakeGrades"
            label="重考成绩">
        </el-table-column>
        <el-table-column
            prop="minorMark"
            label="辅修标记">
        </el-table-column>
        <el-table-column
            prop="reworkMark"
            label="重修标记">
        </el-table-column>
        <el-table-column
            prop="gradePoint"
            label="最终绩点">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="50">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import transcriptSpider from '../utils/transcriptSpider'
import scoreStatistics from '../utils/scoreStatistics'
import {checkLoginStatus} from "@/utils/getInfo";
import {getMajorRank,getMajorCount} from "@/utils/getRank";
import {getCourseRank} from "@/utils/getCourseRank";

export default {
  name: "transcriptList",
  data() {
    return {
      tableData: [],
      value: '',
      value2: '',
      windowWidth: window.innerWidth,
      dialog2FormVisible:false,
      options: [{value: '2021', label: '2021'}, {value: '2020', label: '2020'}, {
        value: '2019',
        label: '2019'
      }, {value: '2018', label: '2018'}, {value: '2017', label: '2017'}],
      options2: [{value: '1', label: '1'}, {value: '2', label: '2'}],
      alertTitle: '',
      dialogData:{
        courseName:'',
        courseCount:'',
        courseRank:'',
        courseNature:'',
        courseCredit:''
      }
    }
  },
  methods: {
    async handleClick(row){
      try{
        let jwloginToken = this.$store.getters.getToken
        let name = this.$store.getters.getName
        let id = row.jxbid
        let info = await getCourseRank(name,id,jwloginToken)
        console.log(info)
        let data = {}
        data.courseCredit = row.credit
        data.courseNature = row.nature
        data.courseName = row.name
        data.courseCount = info.count
        data.courseRank = info.rank
        this.dialogData = data
        this.dialog2FormVisible=true
      }catch (e) {
        console.error(e)
      }

    },
    async getAlerTitle() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let jwloginToken = this.$store.getters.getToken
      let loginStatus = await checkLoginStatus(jwloginToken)
      try {
        loginStatus = await checkLoginStatus(jwloginToken)
      } catch (e) {
        this.$notify.error({
          title: 'Error',
          message: '教务系统抽风，请稍后再试'
        });
      }
      if (loginStatus === true) {
        let obj = await transcriptSpider(jwloginToken, {xn: '2020', xq: '2'})
        let actualId = obj.user.actualId
        let name = this.$store.getters.getName
        let acc = this.$store.getters.getAccount
        let statistics = await scoreStatistics(jwloginToken, actualId)
        let majorRank,majorCount
        try{
          majorRank = await getMajorRank(actualId,name,acc)
          majorCount = await getMajorCount(actualId,name,acc)
        }catch (e) {
          this.$notify.error({
            title:"Error",
            message:e
          })
        }
        let avgScore = statistics.avg
        let avgPoint = statistics.avgJd
        let sumScore = statistics.yxxf
        let havenScore = statistics.yhdxf
        this.alertTitle = `已获得学分:${havenScore},当前已选学分:${sumScore},历年平均成绩为:${avgScore},历年平均绩点为:${avgPoint},在本年级本专业的排名为:${majorRank},本年级本专业总人数为:${majorCount}`
      } else {
        this.$notify.error({
          title: 'Error',
          message: '登录状态已过期，请重新登录'
        });
        this.$router.push("./login");
      }
      loading.close()
    },
    async getTranscript() {
      let jwloginToken = this.$store.getters.getToken
      let _options = {
        xn: this.value,
        xq: this.value2
      }
      let obj = await transcriptSpider(jwloginToken, _options)
      obj = obj.msg.list
      let result = []
      var sum = 0;
      for (let i = 0; i < obj.length; i++) {
        let temp = obj[i]
        let tempObj = {}
        tempObj.schoolYear = temp.kkxn
        tempObj.schoolTerm = temp.xnxq
        tempObj.name = temp.yjkcmc
        tempObj.nature = temp.kcxz
        tempObj.credit = temp.kcxf
        tempObj.usualGrades = temp.pscj
        tempObj.midTermGrades = temp.qzcj
        tempObj.finalGrades = temp.qmcj
        tempObj.practiceResults = temp.sjcj
        tempObj.overallRating = temp.zpcj
        tempObj.jxbid = temp.yjxbId
        if (temp.ckcj) {
          tempObj.retakeGrades = temp.ckcj
        } else {
          tempObj.retakeGrades = ""
        }
        if (temp.fxbj === 0) {
          tempObj.minorMark = "否"
        } else {
          tempObj.minorMark = "是"
        }
        if (temp.cxbj === 0) {
          tempObj.reworkMark = "否"
        } else {
          tempObj.reworkMark = "是"
        }
        tempObj.gradePoint = temp.jdVal
        sum += tempObj.gradePoint
        result.push(tempObj)
      }
      // sum = sum.toFixed(2)
      let _avgPoint = ((sum.toFixed(2)) / result.length).toFixed(2)
      this.$notify({
        title: '提示',
        message: `该学期的平均绩点为${_avgPoint}
          注:计算平均绩点的公式太复杂，我懒得弄，此数据不准，仅供参考，以教务系统为准`,
        duration: 5000
      });

      this.tableData = result
    },
    onResize() {
      this.windowWidth = window.innerWidth
    }
  },
  created() {
    this.getAlerTitle()
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

}
</script>

<style scoped>
.header {
  margin-top: 10px;
  /*margin-bottom: 10px;*/
  border-radius: 4px;
  border: 1px solid gray;
}
</style>

<style scoped>
 /deep/ .demo-table-expand {
  font-size: 0;
}
 /deep/ .demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
 /deep/ .demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>
