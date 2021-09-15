<template>
  <div>
    <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        :width="windowWidth>850?'50%':'80%'"
        center>
      <span>因今年的教务系统更新，新增了一个学分结构的功能，该功能将一门课程的<span style="color: red">性质分为三级</span>
        ，相比于人才培养方案，这个分级会比人才培养方案更将详细，因此会出现学分
        结构细分的课程有部分是与人才培养方案<span style="color: red">不匹配</span>的，
        本系统的学分结构功能是基于教务系统的功能进行<span style="color: red">二次修改</span>
        ，目前已知问题就是课程三级性质不匹配导致无法正确显
        示部分数据。但是能保证总分是正确的，目前正在想办法完善该功能，数据仅供参考，
        谢谢大家的支持！下个版本将推出详细的课程列表信息，敬请期待。</span>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>

    <h1>基本学分信息</h1>
    <div class="table1">
      <el-table
          :data="tableData1"
          border
          style="width: 100%">
        <el-table-column
            prop="sumCredits"
            label="已选学分">
        </el-table-column>
        <el-table-column
            prop="getCredits"
            label="已获得学分">
        </el-table-column>
        <el-table-column
            prop="noCredits"
            label="未获得学分">
        </el-table-column>
        <el-table-column
            prop="failed"
            label="不及格课数">
        </el-table-column>
      </el-table>
    </div>

    <div style="height: 20px"></div>

<!--    <div>-->
<!--      <h1>详细学分信息</h1>-->
<!--      <div class="table2">-->
<!--        <el-table-->
<!--            :data="tableData2"-->
<!--            border-->
<!--            style="width: 100%">-->
<!--          <template v-for='(col) in tableData4'>-->
<!--            <el-table-column-->
<!--                :prop="col.score"-->
<!--                :label="col.name"-->
<!--                :key="col.score">-->
<!--            </el-table-column>-->
<!--          </template>-->
<!--        </el-table>-->
<!--      </div>-->
<!--    </div>-->

    <div style="height: 20px"></div>

    <div v-show="isNineteen">
      <h1>人才培养方案</h1>
      <div class="table3">
        <el-table
            :data="tableData3"
            border
            style="width: 100%">
          <el-table-column
              prop="description"
              label="">
          </el-table-column>
          <el-table-column
              prop="proCredits"
              label="专业课平均绩点">
          </el-table-column>
          <el-table-column
              prop="pubCompulsory"
              label="公共必修">
          </el-table-column>
          <el-table-column
              prop="genElective"
              label="通识选修">
          </el-table-column>
          <el-table-column
              prop="comGrowth"
              label="成长教育必修">
          </el-table-column>
          <el-table-column
              prop="phy"
              label="自然与学科基础">
          </el-table-column>
          <el-table-column
              prop="proEdu"
              label="专业教育">
          </el-table-column>
          <el-table-column
              prop="divProElective"
              label="多元化专业选修">
          </el-table-column>
          <el-table-column
              prop="sum"
              label="总计">
          </el-table-column>
          <el-table-column
              prop="undefinedScore"
              label="未匹配学分">
          </el-table-column>
        </el-table>
      </div>
    </div>

    <h1>学分结构</h1>
    <div class="table5">
      <el-table border style="width: 100%" :data="Data">
        <!--一级表头-->
        <el-table-column label="描述" align="center" prop="description"></el-table-column>
        <el-table-column label="总学分" align="center" prop="count"></el-table-column>
        <div v-for="l1item in l1Arr" :key="l1item.l1id">
          <el-table-column :label="l1item.l1label" align="center">
            <!--二级表头-->
            <div v-for="l2item in l2Arr" :key="l2item.l2id">
              <el-table-column v-if="l2item.l1id===l1item.l1id" :label="l2item.l2label" align="center">
                <!--三级表头-->
                <div v-for="l3item in l3Arr" :key="l3item.l3id">
                  <el-table-column v-if="l3item.l2id===l2item.l2id" :label="l3item.l3label" align="center"
                                   v-bind:prop="l3item.l3id+''">
                  </el-table-column>
                </div>
              </el-table-column>
            </div>
          </el-table-column>
        </div>

      </el-table>

    </div>
  </div>
</template>

<script>
import scoreStatistics from '../utils/scoreStatistics'
import transcriptSpider from "../utils/transcriptSpider";
import {getInfo, checkLoginStatus} from "@/utils/getInfo"
import {getL1List, getL2List, getL3List, getDetailList} from "@/utils/scoreConstruct"
import planArray from "../utils/plan";

export default {
  name: "creditManage",
  data() {
    return {
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      tableData5: [],
      jwLoginToken: '',
      id: '',
      centerDialogVisible: true,
      Data: [],
      l1Arr: [],
      l2Arr: [],
      l3Arr: [],
      windowWidth: window.innerWidth,
      isNineteen: false,
      isDev:process.env.NODE_ENV
    }
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth
      this.calendarOptions.displayEventTime = this.windowWidth > 875
    },
    async getCreditConstructor() {
      let jwloginToken = this.$store.getters.getToken
      // l1-l3List -> 教务系统对l1-l3对各个id的详细信息
      let l1List = await getL1List(jwloginToken)
      let l2List = await getL2List(jwloginToken)
      let l3List = await getL3List(jwloginToken)

      //提取user的id
      let actualId = this.$store.getters.getId

      //DetailListData包含：学期信息，需要学分互认的课程，学生所在专业的1-3级课程的需修学分信息(creditConstruct)，已修课程信息，在修课程信息
      let DetailListData = await getDetailList(actualId, jwloginToken)
      // creditConstruct 一级二级三级结构都从此提取
      let creditConstruct = DetailListData.msg.xfjg

      let tempTakingCreditObj = {}
      let tempAlreadyGetCreditObj = {}
      //临时数组 检测相应级别的课程是否已存入数组
      let tempL1Arr = []
      let tempL2Arr = []
      let tempL3Arr = []
      let tempCreditObj = {}
      let sumCount = 0
      for (const creditConstructElement of creditConstruct) {
        sumCount += creditConstructElement.xf
        tempCreditObj[creditConstructElement.l3id + ""] = creditConstructElement.xf


        tempAlreadyGetCreditObj[creditConstructElement.l3id + ""] = 0
        tempTakingCreditObj[creditConstructElement.l3id + ""] = 0
        if (!tempL1Arr.includes(creditConstructElement.l1id)) {
          for (const l1ListElment of l1List) {
            if (l1ListElment.id === creditConstructElement.l1id) {
              let tempObj = {}
              tempObj.l1id = l1ListElment.id
              tempObj.l1label = l1ListElment.kcz1lbqmc
              this.l1Arr.push(tempObj)
              tempL1Arr.push(l1ListElment.id)
            }
          }
        }
        if (!tempL2Arr.includes(creditConstructElement.l2id)) {
          for (const l2ListElment of l2List) {
            if (l2ListElment.id === creditConstructElement.l2id) {
              let tempObj = {}
              tempObj.l1id = creditConstructElement.l1id
              tempObj.l2id = l2ListElment.id
              tempObj.l2label = l2ListElment.kcz2lbqmc
              this.l2Arr.push(tempObj)
              tempL2Arr.push(creditConstructElement.l2id)
            }
          }
        }
        if (!tempL3Arr.includes(creditConstructElement.l3id)) {
          for (const l3ListElment of l3List) {
            if (l3ListElment.id === creditConstructElement.l3id) {
              let tempObj = {}
              tempObj.l2id = creditConstructElement.l2id
              tempObj.l3id = l3ListElment.id
              tempObj.l3label = l3ListElment.kcz3lbqmc
              tempObj.xf = creditConstructElement.xf
              this.l3Arr.push(tempObj)
              tempL3Arr.push(creditConstructElement.l3id)
            }
          }
        }
      }
      tempCreditObj.count = sumCount
      tempCreditObj.description = "应修学分"

      this.Data.push(tempCreditObj)


      let alreadyGetCredit = DetailListData.msg.yxKccjs
      let getSumCount = 0
      for (const alreadyGetCreditElement of alreadyGetCredit) {
        if(alreadyGetCreditElement.jdVal !== 0){
          getSumCount += alreadyGetCreditElement.kcxf
          tempAlreadyGetCreditObj[alreadyGetCreditElement.l3id + ""] += alreadyGetCreditElement.kcxf
        }
      }
      tempAlreadyGetCreditObj.count = getSumCount
      tempAlreadyGetCreditObj.description = "已修学分"
      this.Data.push(tempAlreadyGetCreditObj)

      let takingSumCount = 0
      let takingCreditObj = DetailListData.msg.zxKczkcs
      for (const takingCreditObjElement of takingCreditObj) {
        takingSumCount += takingCreditObjElement.kcxf
        tempTakingCreditObj[takingCreditObjElement.cmsKcz.cmsKcz3lbq.id + ""] += takingCreditObjElement.kcxf
      }
      tempTakingCreditObj.count = takingSumCount
      tempTakingCreditObj.description = "在修学分"
      this.Data.push(tempTakingCreditObj)
    },
    async getBaseData() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let jwloginToken = this.$store.getters.getToken
      this.jwLoginToken = jwloginToken
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
        let obj = await transcriptSpider(jwloginToken, {xn: '2021', xq: '1'})
        let actualId = obj.user.actualId
        let statistics = await scoreStatistics(jwloginToken, actualId)
        let obj1 = {}
        obj1.sumCredits = statistics.yxxf
        obj1.getCredits = statistics.yhdxf
        obj1.noCredits = statistics.yxxf - statistics.yhdxf
        obj1.failed = statistics.bjgmc
        this.tableData1.push(obj1)
      } else {
        this.$notify.error({
          title: 'Error',
          message: '登录状态已过期，请重新登录'
        });
        this.$router.push("./login");
      }
      loading.close()
    },
    // 获取tableData2的数据

    async getDetailData() {
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
        let obj = await transcriptSpider(jwloginToken, {xn: "", xq: ""})
        obj = obj.msg.list
        let tempObj = {}
        tempObj['count']=0
        for (const objElement of obj) {
          tempObj[objElement.kcxz+"score"]=0
        }
        for (const objElement of obj) {
          if(objElement.pass === true){
            tempObj[objElement.kcxz+"score"]+=parseInt(objElement.kcxf)
            tempObj['count']+=parseInt(objElement.kcxf)
          }
        }
        // let obj2 = {}
        // let english = 0
        // let pe = 0
        // let phy = 0
        // let proEdu = 0
        // let proElective = 0
        // let divElective = 0
        // let comGeneral = 0
        // let pubElective = 0
        // let ideCompulsory = 0
        // let comGrowth = 0
        // let undefinedScore = 0
        // obj.forEach(function (element) {
        //   switch (element.kcxz) {
        //     case "大学英语课":
        //       english += parseInt(element.kcxf);
        //       break;
        //     case "大学体育课":
        //       pe += parseInt(element.kcxf)
        //       break;
        //     case "自然与学科基础课":
        //       phy += parseInt(element.kcxf);
        //       break;
        //     case "专业教育课":
        //       proEdu += parseInt(element.kcxf);
        //       break;
        //     case "专业选修课":
        //       proElective += parseInt(element.kcxf);
        //       break;
        //     case "多元化专业选修课":
        //       divElective += parseInt(element.kcxf);
        //       break;
        //     case "通识必修课":
        //       comGeneral += parseInt(element.kcxf);
        //       break;
        //     case "公共选修课":
        //       pubElective += parseInt(element.kcxf);
        //       break;
        //     case "思政必修课":
        //       ideCompulsory += parseInt(element.kcxf);
        //       break;
        //     case "成长必修课":
        //       comGrowth += parseInt(element.kcxf);
        //       break;
        //     default:
        //       undefinedScore += parseInt(element.kcxf);
        //       break;
        //   }
        // })
        // obj2.english = english
        // obj2.pe = pe
        // obj2.phy = phy
        // obj2.proEdu = proEdu
        // obj2.proElective = proElective
        // obj2.divElective = divElective
        // obj2.comGeneral = comGeneral
        // obj2.pubElective = pubElective
        // obj2.ideCompulsory = ideCompulsory
        // obj2.comGrowth = comGrowth
        // obj2.undefinedScore = undefinedScore
        this.tableData2.push(tempObj)
      } else {
        this.$notify.error({
          title: 'Error',
          message: '登录状态已过期，请重新登录'
        });
        this.$router.push("./login");
      }
      loading.close()
    },

    async getPlan() {
      let self = this
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let jwloginToken = this.$store.getters.getToken
      // let id = this.$store.getters.getId
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
        let obj = await transcriptSpider(jwloginToken, {xn: "", xq: ""})
        let infoForm = await getInfo(jwloginToken)
        obj = obj.msg.list
        let obj2 = {}
        let pubCompulsory = 0
        let genElective = 0
        let comGrowth = 0
        let phy = 0
        let proEdu = 0
        let divProElective = 0
        let undefinedScore = 0
        let avg = 0
        let avgCount = 0
        planArray.forEach(function (element) {
          if (infoForm.major === element.name) {
            // element is plan's object
            obj.forEach(function (e) {
              // e is spider's object
              element.data.forEach(function (eData) {
                //eData is element's data
                // eslint-disable-next-line no-prototype-builtins
                if (eData.hasOwnProperty("include")) {
                  if (eData.name === e.kcxz || eData.include.includes(e.kcxz)) {
                    self.isNineteen = true
                    switch (eData.name) {
                      case "公共必修课":
                        pubCompulsory += parseFloat(e.kcxf);
                        break;
                      case "通识选修课":
                        genElective += parseFloat(e.kcxf);
                        break;
                      case "成长教育必修课":
                        comGrowth += parseFloat(e.kcxf);
                        break;
                      case "自然与学科基础课":
                        phy += parseFloat(e.kcxf);
                        avg += parseFloat(e.jdVal);
                        avgCount++
                        break;
                      case "专业教育课":
                        proEdu += parseFloat(e.kcxf);
                        avg += parseFloat(e.jdVal);
                        avgCount++
                        break;
                      case "多元化专业选修课":
                        divProElective += parseFloat(e.kcxf);
                        avg += parseFloat(e.jdVal);
                        avgCount++
                        break;
                      default:
                        undefinedScore += parseFloat(e.kcxf);
                        break;
                    }
                  }
                } else {
                  if (eData.name === e.kcxz) {
                    switch (eData.name) {
                      case "公共必修课":
                        pubCompulsory += parseFloat(e.kcxf);
                        break;
                      case "通识选修课":
                        genElective += parseFloat(e.kcxf);
                        break;
                      case "成长教育必修课":
                        comGrowth += parseFloat(e.kcxf);
                        break;
                      case "自然与学科基础课":
                        phy += parseFloat(e.kcxf);
                        avg += parseFloat(e.jdVal);
                        avgCount++
                        break;
                      case "专业教育课":
                        proEdu += parseFloat(e.kcxf);
                        avg += parseFloat(e.jdVal);
                        avgCount++
                        break;
                      case "多元化专业选修课":
                        divProElective += parseFloat(e.kcxf);
                        avg += parseFloat(e.jdVal);
                        avgCount++
                        break;
                      default:
                        undefinedScore += parseFloat(e.kcxf);
                        break;
                    }
                  }
                }
              })
            })
          }
        })
        obj2.description = "已获得学分"
        obj2.proCredits = (avg / avgCount).toFixed(3)
        obj2.sum = pubCompulsory + genElective + comGrowth + phy + proEdu + divProElective
        obj2.pubCompulsory = pubCompulsory
        obj2.genElective = genElective
        obj2.comGrowth = comGrowth
        obj2.phy = phy
        obj2.proEdu = proEdu
        obj2.divProElective = divProElective
        obj2.undefinedScore = undefinedScore
        let obj3 = {}
        obj3.description = "培养方案"
        let flag = false
        for (let i = 0; i < planArray.length; i++) {
          if (infoForm.major === planArray[i].name && "20" + infoForm.id.substr(0, 2) === planArray[i].level + "") {
            flag = true
            let tempObj = planArray[i]
            obj3.sum = tempObj.total
            planArray[i].data.forEach(function (element) {
              switch (element.name) {
                case "公共必修课":
                  obj3.pubCompulsory = element.num;
                  break;
                case "通识选修课":
                  obj3.genElective = element.num;
                  break;
                case "成长教育必修课":
                  obj3.comGrowth = element.num;
                  break;
                case "自然与学科基础课":
                  obj3.phy = element.num;
                  break;
                case "专业教育课":
                  obj3.proEdu = element.num;
                  break;
                case "多元化专业选修课":
                  obj3.divProElective = element.num;
                  break;
              }
            })
          }
        }
        if (flag === false) {
          obj3.pubCompulsory = "暂未适配！"
          obj3.genElective = "暂未适配！"
          obj3.comGrowth = "暂未适配！"
          obj3.phy = "暂未适配！"
          obj3.proEdu = "暂未适配！"
          obj3.divProElective = "暂未适配！"
        }
        obj3.undefinedScore = "-"
        obj3.proCredits = "2.0"

        this.tableData3.push(obj3)
        this.tableData3.push(obj2)
      } else {
        this.$notify.error({
          title: 'Error',
          message: '登录状态已过期，请重新登录'
        });
        this.$router.push("./login");
      }
      loading.close()
    },

    // 动态生成tableData2

    async getTable2() {
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
        let obj = await transcriptSpider(jwloginToken, {xn: "", xq: ""})
        obj = obj.msg.list
        let obj2 = []
        obj.forEach(function (element) {
          let flag = false
          let tempObj = {}
          obj2.forEach(function (ele2) {
            if (ele2.name === element.kcxz) {
              flag = true
            }
          })
          if (flag === false) {
            tempObj.name = element.kcxz
            tempObj.score = element.kcxz+"score"
            obj2.push(tempObj)
          }
        })
        obj2.push({
          name:'总和',
          score:'count'
        })
        this.tableData4 = obj2

      } else {
        this.$notify.error({
          title: 'Error',
          message: '登录状态已过期，请重新登录'
        });
        this.$router.push("./login");
      }
      loading.close()
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
    })

  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  created() {
    this.getBaseData()
    this.getDetailData()
    this.getPlan()
    this.getTable2()
    this.getCreditConstructor()
  }
}
</script>

<style scoped>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
