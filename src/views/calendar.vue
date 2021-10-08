<template>
  <div>

    <el-dialog center title="详细信息" :visible.sync="dialogTableVisible"  :width="windowWidth>850?'50%':'80%'" :height="windowWidth>850?'50%':'80%'">
      <el-descriptions border size="mini" :column="parseInt('1')">
        <el-descriptions-item label="课程名称">{{courseName}}</el-descriptions-item>
        <el-descriptions-item label="任课老师">{{courseTeacher}}</el-descriptions-item>
        <el-descriptions-item label="上课地点">{{description}}</el-descriptions-item>
        <el-descriptions-item label="上课时间">{{startTime}}</el-descriptions-item>
        <el-descriptions-item label="下课时间">{{endTime}}</el-descriptions-item>
        <el-descriptions-item label="课程性质">{{courseNature}}</el-descriptions-item>
      </el-descriptions>

      <el-table :data="gridData" stripe size="mini" :max-height="windowWidth>850?'350':'250'">
        <el-table-column property="xsxm" label="姓名"></el-table-column>
        <el-table-column property="bJMC" label="班级名称"></el-table-column>
      </el-table>
    </el-dialog>

    <FullCalendar id="calendar" :options="calendarOptions" ref="fullCalendar"/>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import timeGridPlugin from '@fullcalendar/timegrid';
import {courseDetailSpider, courseSpider} from '@/utils/courseSpider';
import {checkLoginStatus, getClassmateList} from "@/utils/getInfo";

export default {
  name: "calendar",
  components: {
    FullCalendar
  },
  data() {
    const jwloginToken = this.$store.getters.getToken
    let self = this
    return {
      dialogTableVisible: false,
      gridData:[],
      courseName:'',
      courseTeacher:'',
      startTime:'',
      description:'',
      endTime:'',
      windowWidth: window.innerWidth,
      courseNature:"",
      calendarOptions: {
        plugins: [timeGridPlugin],
        initialView: 'timeGridWeek',
        headerToolbar: {
          left: 'prev,next,today',
          center: 'title',
          right: 'timeGridWeek,timeGridDay'
        },
        titleFormat:{ month: 'long',day:'numeric' },
        buttonText: {
          today: '今天',
          week: '周视图',
          day: '日视图',
          list: '列表'
        },
        allDaySlot: false,
        locale: 'zh-cn',
        firstDay: 1,
        nowIndicator: true,
        contentHeight: 1250,
        handleWindowResize: true,
        displayEventTime: true,
        slotMinTime: "08:00:00",
        slotMaxTime: "22:00:00",
        slotDuration: "01:00:00",
        expandRows: true,
        // eventDidMount: function (info) {
        //   let eve = info.event.extendedProps
        //   let desN1 = eve.desName.split(":")[0]
        //   let desN2 = eve.desName.split(":")[1]
        //   let desName1 = desN1 + ":&nbsp&nbsp" + desN2
        //   let desS1 = eve.description.split(":")[0]
        //   let desS2 = eve.description.split(":")[1]
        //   let desS = desS1 + ":&nbsp&nbsp" + desS2
        //   tippy(info.el, {
        //     content: "<div>" +
        //         "<div >" + desName1 + "</div>" +
        //         "<div style='color: #666666'>" + desS + "</div>" +
        //         "<div style='color: #666666'>上课时间：" + eve.startTimeTitle + "</div>" +
        //         "<div style='color: #666666'>下课时间：" + eve.endTimeTitle + "</div>" +
        //         "<div style='color: #666666'>本课教师：" + eve.teacher + "</div>" +
        //         "</div>",
        //     allowHTML: true
        //   })
        // },
        eventClick: async function(info) {
          await self.eClick(info)
        },
        events: async function (info, successCallback, failureCallback) {
          let courseData = await courseSpider(jwloginToken)
          let courseDetailData = await courseDetailSpider(jwloginToken)
          console.log("courseDetailData",courseDetailData)
          let courseFormatData = []
          for (let i = 0; i < courseData.length; i++) {
            let data = courseData[i]
            let start = data.start
            let end = data.end
            let title = data.title
            let obj = {}
            for (const detailElement of courseDetailData) {
              if (title === detailElement.name) {
                obj.kbdm = detailElement.pkbdm
                obj.courseNature = detailElement.l3mc
                obj.teacher = detailElement.kbMergeList[0].teacherList[0].xm
              }
            }
            obj.start = start
            obj.end = end
            obj.title = title + '\n@' + data.place
            let colorNum = Math.floor(Math.random() * 10);
            let colorArr = ['#FFEE00', '#BEFF00', '#01FFA7', '#00FFF4', '#FCB575', '#D7FDDF', '#BDFEB5', '#FCB575', '#FFA8F9', '#FFE69F']
            obj.description = "上课地点:" + data.place
            obj.desName = "课程名称:" + data.title
            obj.textColor = "black"
            obj.backgroundColor = colorArr[colorNum]
            obj.startTimeTitle = start.split(" ")[1]
            obj.endTimeTitle = end.split(" ")[1]
            courseFormatData.push(obj)
          }
          //console.log(info)
          //console.log(courseFormatData[0].start.split(" ")[1])
          if (courseFormatData) {
            // console.log("courseFormatData",courseFormatData)
            successCallback(courseFormatData)
          } else {
            failureCallback("获取课程表失败!");
          }
        },
      },
    }
  },
  methods: {
    async checkStatus() {
      let jwloginToken = this.$store.getters.getToken
      let loginStatus = await checkLoginStatus(jwloginToken)
      try {
        loginStatus = await checkLoginStatus(jwloginToken)
      } catch (e) {
        //console.log(e)
        this.$notify.error({
          title: 'Error',
          message: '教务系统抽风，请稍后再试'
        });
      }
      //console.log(loginStatus)
      if (loginStatus !== true) {
        this.$notify.error({
          title: 'Error',
          message: '登录状态已过期，请重新登录'
        });
        this.$router.push("./login");
      }
    },
    onResize() {
      this.windowWidth = window.innerWidth
      this.calendarOptions.displayEventTime = this.windowWidth > 875
    },
    async eClick(info){
      let name = this.$store.getters.getName
      let id = this.$store.getters.getId
      let acc = this.$store.getters.getAccount
      try{
        this.gridData = await getClassmateList(info.event.extendedProps.kbdm,id,name,acc)
      }catch (e) {
        this.$notify.error({
          title: 'Error',
          message: e
        })
      }
      this.dialogTableVisible=true
      this.courseName=info.event.extendedProps.desName.split(":")[1]
      // console.log(info.event.extendedProps)
      this.courseTeacher=info.event.extendedProps.teacher
      this.startTime=info.event.extendedProps.startTimeTitle
      this.endTime=info.event.extendedProps.endTimeTitle
      this.courseNature=info.event.extendedProps.courseNature
      this.description=info.event.extendedProps.description.split(":")[1]
    }

  },
  async created() {
    const loading = this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
    });
    await this.checkStatus()

    this.calendarOptions.displayEventTime = this.windowWidth > 875
    loading.close()
  },
  watch: {
    windowWidth(newWidth, oldWidth) {
      this.txt = `it changed to ${newWidth} from ${oldWidth}`;
    },
  },
  mounted() {
    // console.log(this.$refs.fullCalendar)
    // console.log("event",calendarApi.eventDidMount)
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })

  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
}
</script>

<style>
/*.tooltip {*/
/*  position: absolute;*/
/*  z-index: 9999;*/
/*  background: #409EFF;*/
/*  color: white;*/
/*  width: 150px;*/
/*  border-radius: 5px;*/
/*  padding: 10px;*/
/*  text-align: center;*/
/*}*/
.fc-event-title {
  font-size: 12px;
  line-height: 1.3;
}
</style>
