<template>
  <div class="Page display-flex box-column">
    <y-header>transaction</y-header>
    <div class="box-flex1 content no-scroller">
      <y-btn class="mt24" :color="'select'" @submitAction="approve">approve</y-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  methods: {
    approve () {}
  }
}
</script>

<style scoped lang="scss">

</style>
