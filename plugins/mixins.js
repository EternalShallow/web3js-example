export default {
  computed: {
  },
  watch: {
  },
  methods: {
    closeLoading () {
      this.$store.dispatch('updateLoading', false)
    },
    openLoading () {
      const that = this
      this.$store.dispatch('updateLoading', true)
      setTimeout(function () {
        that.closeLoading()
      }, 2000)
    }
  }
}
