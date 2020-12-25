<template>
  <transition name="op">
    <div class="toast display-flex box-center" :class="{
      opacity0: type=='none',
      opacity5: type=='msg'
    }" v-if="is_show_toast_box==true" @touchmove.prevent>
      <div v-if="type=='none'" class="rectangleBox" v-text="text"></div>
      <div v-if="type== 'msg'" class="msgBox squareBox display-flex box-center box-column">
        <div class="title" v-html="title || $lang.confirm_title_default"></div>
        <div class="box-flex1 display-flex box-center msg-txt" v-html="text"></div>
        <y-btn class="btn-know" :class="'primary'" v-text="btn_txt || $lang.toast_btn_text_default" @submitAction="knowFn"></y-btn>
      </div>
    </div>
  </transition>
</template>
<script>
let t1
export default {
  props: {
    isShow: {
      type: Boolean,
      default: true
    },
    text: {
      default: 'loading'
    },
    type: {
      default: 'success',
      require: true
    },
    opacity: {
      default: 'opacity5'
    },
    time: {
      default: 1500
    },
    btn_txt: {
      default: ''
    },
    title: {
      default: ''
    },
    done: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      is_show_toast_box: false
    }
  },
  watch: {
    is_show_toast_box: {
      handler (newVal, oldVal) {
        newVal && clearTimeout(t1)
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true,
      deep: true
    }
  },
  methods: {
    knowFn () {
      this.is_show_toast_box = false
      this.done && this.done()
    },
    showToastBox: function (time) {
      this.is_show_toast_box = true
      this.downToast(time)
    },
    destroy: function () {
      this.$destroy()
      document.body.removeChild(this.$el)
    },
    downToast (time) { // 定时器 time=0 永久展示
      const that = this
      if (that.type === 'none' && Number(time) !== 0) {
        setTimeout(function () {
          that.is_show_toast_box = false
          that.done && that.done()
          clearTimeout(t1) // 去掉定时器
        }, time)
      } else {
        that.is_show_toast_box = true
      }
    }
  }
}
</script>
<style scoped lang="scss">
  @import "../../assets/css/fun";
  .msgBox{
    .title{
      font-size: 34px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color: $color333;
      line-height: 1;
    }
    .msg-txt{
      margin-top: 24px;
      font-size: 28px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color: $color333;
      text-align: left;
      line-height: 42px;
    }
    .btn-know{
      width: 334px;
      height: 83px;
      margin-top: 43px;
    }
  }
  .toast{
    width: 100%;
    height: 100%;
    position: fixed;
    top:0;
    left: 0;
    z-index: 9999900;
    background-color: rgba(0, 0, 0, 0.5);
    .rectangleBox{
      min-width: 150px;
      max-width: 600px;
      padding: 30px 60px;
      background: rgba(0,0,0,.6);
      border-radius: 10px;
      text-align: center;
      color:  $colorFFF;
      font-size: 26px;
    }
    .squareBox{
      width: 510px;
      min-height: 380px;
      background: $colorFFF;
      border-radius: 16px;
      padding: 48px 30px;
    }
    .fs60{
      font-size: 80px;
    }
  }
  .opacity3{
    background: rgba(0,0,0,.3);
  }
  .opacity5{
    background: rgba(0,0,0,.5);
  }
  .opacity0{
    background-color: transparent;
  }
</style>
