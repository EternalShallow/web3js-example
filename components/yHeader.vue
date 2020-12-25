<template>
  <div class="header-box display-flex box-center-Y">
    <div class="left" @click="goBack"></div>
    <div class="head-title box-flex1">
      <slot></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
import { goBack } from '../utils/function'

export default {
  name: 'my-header',
  components: {},
  props: ['close_web', 'callback'],
  data () {
    return {}
  },
  methods: {
    goBack () {
      if (this.callback) {
        console.log('callback')
        this.callback()
      } else {
        if (this.close_web) {
          window.android.closeActivity()
        } else {
          goBack()
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/fun";
  .header-box {
    position: relative;
    height: 90px;
    width: 100%;
    z-index: 88;
    min-width: 640px;
    max-width: 1360px;
    background-size: 7.5rem 0.88rem;
    padding: 0 .56rem;
    .head-title {
      font-size: 42px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: $color333;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      &.withe{
        color: $colorFFF;
      }
    }

    .left {
      position: absolute;
      width: 42px;
      height: 42px;
      background-image: url("../assets/image/arrow_back_black.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: 42px 42px;
      &.withe{
        background-image: url("../assets/image/arrow_back.png");
      }
    }
    .right {
      position: absolute;
      height: 42px;
      line-height: 42px;
      right: 42px;
      text-align: center;
      width: auto;
    }

  }
</style>
