<template>
  <div class="no-data-box display-flex box-center box-column">
    <div class="img-box">
      <slot name="no-data-img">
        <img src="../assets/image/no_data_n.png" alt="">
      </slot>
    </div>
    <div class="txt"><slot name="no-data-txt">{{$lang.no_data_text}}</slot></div>
  </div>
</template>

<script>
export default {
  name: 'noData'
}
</script>

<style scoped lang="scss">
  @import "../assets/css/fun";
  .no-data-box{
    height: 100%;
    .img-box{
      width: 330px;
      height: auto;
      margin: 0 auto;
    }
    .txt{
      color: $color333;
      font-size: 28px;
      text-align: center;
      padding-top: 60px;
    }
  }
</style>
