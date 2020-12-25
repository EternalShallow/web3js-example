<template>
  <div class="Page display-flex box-column">
    <y-header>Demo</y-header>
    <div class="box-flex1 content no-scroller">
      <y-loadmore
        class="no-scroller"
        :disableTop="true"
        ref="loadmore"
        @bottom-method="loadMore"
        @bottom-error-click="handleBottomError"
        @bottom-status-change="handleBottomStatusChange"
      >
        <div class="emColor fw5 fs32 pt40 pb40">button start...</div>
        <y-btn class="mt24" :color="'primary'">primary</y-btn>
        <y-btn class="mt24" :color="'disabled'">disabled</y-btn>
        <y-btn class="mt24" :color="'choice'">choice</y-btn>
        <y-btn class="mt24" :color="'select'">select</y-btn>
        <y-btn class="mt24" :color="'select'"
          v-clipboard:copy="`https://yottascan.io`"
          v-clipboard:success="onCopy"
          v-clipboard:error="onCopyError"
        >copy text</y-btn>
        <div class="emColor fw5 fs32 pt40 pb40">toast start...</div>
        <y-btn class="mt24" :color="'select'" @submitAction="submitAction">toast</y-btn>
        <y-btn class="mt24" :color="'select'" @submitAction="submitActionBox">toastBox</y-btn>
        <div class="emColor fw5 fs32 pt40 pb40">confirm start...</div>
        <y-btn class="mt24" :color="'primary'" @submitAction="confirmBox">confirm</y-btn>
        <div class="emColor fw5 fs32 pt40 pb40">loading start...</div>
        <y-btn class="mt24" :color="'select'" @submitAction="openLoading">open loading after 2s close</y-btn>
        <y-btn class="mt24 pl40" :color="'select'">
          <y-number-input style="text-align: left" :placeholder="'input number, no point default integer'" :max="100"
                          :min="0" :point="2" v-model="value" @change="changeValue"></y-number-input>
        </y-btn>
        <div class="emColor fw5 fs32 pt40 pb40">load more start...</div>
        <div class="display-flex box-center-Y load-more-item" v-for="(v, i) in load_more_data" :key="i">
          <div class="img-box"><img src="../../assets/image/icon_moren_default.png" alt=""></div>
          <div class="box-flex1">
            <div class="title">title{{v}}</div>
            <div class="desc">desc{{v}}{{v}}{{v}}{{v}}</div>
          </div>
        </div>
      </y-loadmore>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      value: '',
      is_loading: false,
      is_loading_end: false,
      load_more_data: 8
    }
  },
  methods: {
    onCopyError () {
      this.$toastBox.showToastBox({
        text: 'copy error',
        type: 'none'
      })
    },
    onCopy () {
      this.$toastBox.showToastBox({
        text: this.$lang.copy_success,
        type: 'none'
      })
    },
    submitAction () {
      this.$toastBox.showToastBox({
        text: this.$lang.market_success_text,
        type: 'none'
      })
    },
    submitActionBox () {
      this.$toastBox.showToastBox({
        title: this.$lang.confirm_title_default,
        text: this.$lang.market_success_text,
        type: 'msg',
        time: 2000,
        done: function () {
          this.$toastBox.showToastBox({
            text: '我是回调',
            type: 'none'
          })
        }
      })
    },
    confirmBox () {
      this.$msgBox.showMsgBox({
        cancelBtnText: this.$lang.cancel_btn_think,
        content: `<p style="text-align: center">${this.$lang.withdraw.btn_text}${this.$lang.withdraw.lp_text1}</p>`
      }).then(async (val) => {
        this.$toastBox.showToastBox({
          text: this.$lang.sure_btn,
          type: 'none'
        })
      }).catch(e => {
        this.$toastBox.showToastBox({
          text: e,
          type: 'none'
        })
      })
    },
    changeValue (val) {
    },
    // 如果是错误状态，点击从新请求数据
    handleBottomError () {
      this.loadMore()
    },
    handleBottomStatusChange (status) {
      // status监控上拉加载状态--等待/加载/没有更多数据/数据请求出错
      console.log(status)
    },
    loadMore () {
      if (this.is_loading_end) {
        return
      }
      if (this.is_loading) {
        return
      }
      this.is_loading = true
      this.getLoadMoreData()
    },
    getLoadMoreData () {
      const that = this
      setTimeout(function () {
        that.load_more_data += 8
        that.is_loading = false
        if (that.load_more_data > 40) {
          // 数据已加载完毕
          that.is_loading_end = true
          that.$refs.loadmore.onBottomLoaded(false)
        } else {
          that.$refs.loadmore.onBottomLoaded()
        }
      }, 1500)
    }
  }
}
</script>

<style scoped lang="scss">
  .content{
    padding-bottom: 0;
  }
  .load-more-item {
    padding: 24px 0;
    .img-box {
      width: 80px;
      height: 80px;
    }
    .box-flex1{
      margin-left: 30px;
      .title{
        text-align: left;
      }
      .desc{
        margin-top: 12px;
      }
    }
  }
</style>
