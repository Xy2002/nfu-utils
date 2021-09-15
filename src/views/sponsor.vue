<template>
  <div>
    <el-dialog
        title="作者说"
        :visible.sync="centerDialogVisible"
        :width="windowWidth>850?'50%':'80%'"
        center>
      <span>
        开发这个网站，
        只是因为NFCA这学期总是出错，
        因为以前对NFCA产生习惯和依赖，
        好几次想看一些信息都加载不出来。
        无奈之下只好自己开发一个用，
        后来在旁边的人鼓励下就将这个网站上线了。
        这个网站的本意就只是为了帮助大家，
        所以不会主动的去收费，
        但是不要脸的我还想要一些些赞助XD，
        因为支撑这个网站也是需要一些钱的，
        但是我还能负担得起，
        在此保证，无论有多少人用，
        我都会支撑到毕业。
        还有就是，
        鄙人只是一个刚升大三的小辣鸡，
        对自己极度不自信，
        也很怕和陌生人打交道，
        是一个非常非常内向的人。
        因此，
        我对其他专业也不是很了解，
        所有的功能都是基于我自己去开发的，
        不保证能兼容其他专业。
        因此，如果有什么功能用不了，
        或者有任何提议，
        需要什么功能，
        或者页面哪里需要美化，
        都希望你们能发送一封邮件(我的邮箱Marsh@88.com)给我，
        24h内一定会回复你们！
        希望大家能把这个网站推荐给有需要的人，谢谢！
        </span>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <div class="img">
      <p>点击小图可以展示大图</p>
      <el-image v-for="url in urls" :key="url" :src="url" style="height: 100px;width: 100px" lazy :preview-src-list="urls"></el-image>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      centerDialogVisible:true,
      windowWidth: window.innerWidth,
      urls: process.env.NODE_ENV === 'development'?
          [
              'WechatIMG27.jpeg',
              'WechatIMG28.jpeg'
          ] :
          [
        'https://marshall-1301067880.cos.ap-guangzhou.myqcloud.com/images/WechatIMG27.jpeg',
        'https://marshall-1301067880.cos.ap-guangzhou.myqcloud.com/images/WechatIMG28.jpeg',
      ]
    }
  },
  methods:{
    onResize() {
      this.windowWidth = window.innerWidth
      this.calendarOptions.displayEventTime = this.windowWidth > 875
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
    })

  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
}
</script>

<style scoped>
</style>
