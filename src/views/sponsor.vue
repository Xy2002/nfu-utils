<template>
  <div>
    <el-dialog
        title="作者说"
        :visible.sync="centerDialogVisible"
        :width="windowWidth>850?'50%':'80%'"
        center>
      <span>
        因开发者对其他专业也不是很了解，
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
