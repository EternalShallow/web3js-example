<template>
  <transition name="fade">
    <div class="modal-mask" v-show="isShowMessageBox" @touchmove.prevent>
      <div class="modal-wrapper box center">
        <div class="modal-container" :class="list.length !== 0 ? 'mt1100px' : ''">
          <div class="modal-header fs32">
            <slot name="header">
              <div v-text="title || $lang.confirm_title_default"></div>
            </slot>
          </div>
          <div class="modal-body" v-if="bodyshow">
            <slot name="body">
              <div v-html="content"></div>
            </slot>
          </div>
          <div class="modal-body1 fs28" v-if="body1show">
            <slot name="body1">
              <div v-for="item in list" :key="item.id">
                <div v-html="item" class="ellipsis"></div>
              </div>
            </slot>
          </div>
          <div class="modal-footer display-flex box-center-Y fs30 fw4">
            <slot name="footer">
              <y-btn v-show="cancelBtn" class="modal-default-button" :color="'select'" @submitAction="cancel">
                {{cancelBtnText || $lang.cancel_btn}}
              </y-btn>
              <div class="box-flex1"></div>
              <y-btn class="modal-primary-button" :class="'primary'" @submitAction="confirm">
                {{sureBtnText || $lang.sure_btn}}
              </y-btn>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'confirm',
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: () => []
    },
    bodyshow: {
      type: Boolean,
      default: true
    },
    noTip: {
      type: Boolean,
      default: false
    },
    body1show: {
      type: Boolean,
      default: false
    },
    cancelBtn: {
      type: Boolean,
      default: true
    },
    sureBtnText: {
      type: String,
      default: ''
    },
    cancelBtnText: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isSelect: false,
      isShowMessageBox: false,
      resolve: '',
      reject: '',
      promise: '', // 保存promise对象
      mt100px: 'mt100px'
    }
  },
  methods: {
    selectTip () {
      this.isSelect = !this.isSelect
    },
    confirm () {
      this.isShowMessageBox = false
      let data
      if (this.noTip) {
        data = {
          isNoTip: this.isSelect
        }
      }
      this.resolve(data)
      this.remove()
    },
    cancel () {
      this.isShowMessageBox = false
      this.reject('cancel')
      this.remove()
    },
    showMsgBox () {
      console.log('0999')
      this.isShowMessageBox = true
      this.promise = new Promise((resolve, reject) => {
        this.reject = reject
        this.resolve = resolve
      })
      return this.promise
    },
    remove () {
      setTimeout(() => {
        this.destory()
      }, 300)
    },
    destory () {
      this.$destroy()
      document.body.removeChild(this.$el)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/css/fun';
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;
  }
  .modal-wrapper {
    width: 100%;
    height:100%;
    -webkit-user-select: none;
  }
  .modal-container {
    width: 510px;
    margin: 0 auto;
    border-radius: 17px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
    overflow: hidden;
    background-color: $bgColor;
    padding: 0 24px 32px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .mt100px {
    margin-top: 200px;
  }
  .modal-header{
    text-align: center;
    line-height: 1;
    background-color: $bgColor;
    color: $emColor;
    padding-top: 64px;
    font-weight: 600;
  }
  .modal-body {
    min-height: 80px;
    font-size: .389rem;
    word-wrap: break-word;
    word-break: break-all;
    color: $color333;
    background-color: $bgColor;
    font-weight: 400;
    padding: 32px 0;
    line-height:42px;
  }
  .modal-body:first-child{
    padding: 2.7em 20px 1.7em;
    color: $color333;
  }
  .modal-body1 {
    min-height: 80px;
    line-height: 1.8;
    word-wrap: break-word;
    word-break: break-all;
    color: $color333;
    text-align: left;
    background-color: $bgColor;
    padding: 20px 40px 30px;
  }
  .modal-body1:first-child{
    padding: 2.7em 20px 1.7em;
    color: $color333;
  }
  .modal-footer{
    position: relative;
    border-bottom-right-radius: .22rem;
    border-bottom-left-radius: 0.22rem;
    /*line-height: 66px;*/
  }
  .modal-footer{
    .modal-default-button, .modal-primary-button{
      width: 170px;
      height: 80px;
      text-align: center;
      line-height: 80px;
      border-radius: 8px;
    }
    .modal-default-button:active, .modal-primary-button:active{
      opacity: .85;
    }
  }
  .fade-enter .modal-container,
  .fade-leave-active .modal-container {
    top: 120%;
  }
  .modal-input-dialog{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 200;
    input[type='text']{
      width:100%;
      background: #f3f4f5;
      border: none;
      padding: 10px;
    }
  }
</style>
