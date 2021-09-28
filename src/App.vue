<template>
  <div id="app">
    <div>
      <el-menu
          :default-active="$route.path"
          class="el-menu-demo"
          mode="horizontal"
          router
          @select="handleSelect"
          v-show="isLogin"
      >
        <el-menu-item route="./info" index="/info"> 个人中心</el-menu-item>
        <el-menu-item route="./calendar" index="/calendar">课程表</el-menu-item>
        <el-menu-item route="./examList" index="/examList">考试信息列表</el-menu-item>
        <el-menu-item route="./transcriptList" index="/transcriptList">成绩查询</el-menu-item>
        <el-menu-item route="./creditManage" index="/creditManage">学分管理</el-menu-item>
        <el-menu-item route="./sponsor" index="/sponsor">赞助作者</el-menu-item>
        <el-menu-item v-show="isLogin" @click="clearCookie">退出登录</el-menu-item>
      </el-menu>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import {checkLoginStatus} from "@/utils/getInfo";

export default {
  data() {
    return {
      isLogin: false
    };
  },
  methods: {
    handleSelect(index) {
      console.log(index);
    },
    async initLoginState() {
      if (this.$store.getters.getToken) {
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
        this.isLogin = loginStatus
        if (loginStatus !== true) {
          this.$notify.error({
            title: 'Error',
            message: '登录状态已过期，请重新登录'
          });
          this.isLogin = false
        }
        loading.close()
      } else {
        this.isLogin = false;
      }
      if (this.isLogin === true) {
        if (this.$route.fullPath !== "/info") {
          this.$router.push("./info");
        }
      }
      console.log("isLogin",this.isLogin);
      if(this.isLogin === false){
        this.$router.push("./login")
      }
    },
    clearCookie(){
      this.$store.commit('resetState')
      function clearAllCookie() {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if(keys) {
          for(var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        }
      }
      clearAllCookie()
      console.log("reset!")
      location.reload()
      // this.$alert('请点击确认按钮以刷新页面状态','Tips',{
      //   confirmButtonText:'确定',
      //   callback:() => {
      //     location.reload();
      //   }
      // })
    },
  },
  created() {
    //从sessionStorage获取刷新前保存的vuex信息
    console.log("path: /App.vue, created!")
    if (localStorage.getItem("store") ) {
      this.$store.replaceState(Object.assign({},
          this.$store.state,JSON.parse(localStorage.getItem("store"))))
    }
    this.initLoginState();
    this.$notify({
      title: 'Version 0.4.1',
      message: '当前版本号为0.4.1。更新电费信息，成绩管理功能添加查看本课排名功能以及本专业排名功能，所有表格都可以左右滑动查看，课程表的课程方块可以点击查看详细信息。如有需求定制或对本工具有合理建议,可以向邮箱Marsh@88.com发送email',
      type: 'info',
      position: 'bottom-right',
      duration: 15000
    });
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    // window.addEventListener("beforeunload",()=>{
    //   sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    // })
    var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isiOS) {
      //在页面刷新时将vuex里的信息保存到缓存里
      window.addEventListener("pagehide", () => {
        localStorage.setItem("store", JSON.stringify(this.$store.state))
      })
    } else {
      //在页面刷新时将vuex里的信息保存到缓存里
      window.addEventListener("beforeunload", () => {
        localStorage.setItem("store", JSON.stringify(this.$store.state))
      })
    }
  }
};
</script>

<style scoped>
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
a {
  text-decoration: none;
}
</style>
