<template>
  <div class="garen-loadmore" @scroll.passive="handleScroll" :style="{overflow:bottomOverflow}">
    <div class="garen-loadmore-content" ref="content">
      <slot name="top">
        <div class="garen-loadmore-header" :class="{no: disableTop}">
          <div>{{topText}}</div>
        </div>
      </slot>
      <slot></slot>
      <slot name="bottom">
        <div class="garen-loadmore-footer" v-if="!disableBottom" @click="onBottomErrorClick">
          <div>{{bottomText}}</div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
// const TOPSTATUS = {
//   wait: 'wait', // 等待
//   pulling: 'pulling', // 下拉
//   limit: 'limit', // 超过触发值
//   loading: 'loading', // 正在加载
//   complete: 'complete' // 刷新完成
// }
// const BOTTOMSTATUS = {
//   wait: 'wait', // 等待
//   loading: 'loading', // 正在加载
//   nodata: 'nodata', // 暂无数据
//   error: 'error' // 错误
// }
export default {
  name: 'Loadmore',
  props: {
    // 禁止下拉刷新
    disableTop: {
      type: Boolean,
      default: false
    },
    // 下拉移动比例
    distanceIndex: {
      type: Number,
      default: 2
    },
    // loading时与顶端距离
    topLoadingDistance: {
      type: Number,
      default: 50
    },
    // 下拉距离触发值
    topDistance: {
      type: Number,
      default: 100
    },
    // 下拉刷新状态提示
    topChangeText: {
      type: Object,
      default () {
        return {}
      }
    },

    // 禁止上拉加载
    disableBottom: {
      type: Boolean,
      default: false
    },
    // 触发上拉无限滚动距离
    bottomDistance: {
      type: Number,
      default: 100
    },
    // 上拉加载状态提示
    bottomChangeText: {
      type: Object,
      default () {
        return {}
      }
    },
    // scroll事件
    eventScroll: {
      type: Function
    }
  },
  data () {
    return {
      startPositionTop: null,
      startScreenY: 0,
      endScreenY: 0,
      TOPSTATUS: {},
      BOTTOMSTATUS: {},
      topStatus: '',
      bottomOverflow: 'auto',
      bottomStatus: ''
    }
  },
  components: {},
  computed: {
    topText () {
      switch (this.topStatus) {
        case this.TOPSTATUS.pulling:
          return this.topChangeText.pulling || this.$lang.load_more.top_text.pulling
        case this.TOPSTATUS.limit:
          return this.topChangeText.limit || this.$lang.load_more.top_text.limit
        case this.TOPSTATUS.loading:
          return this.topChangeText.loading || this.$lang.load_more.top_text.loading
        case this.TOPSTATUS.complete:
          return this.topChangeText.complete || ''
        default:
          return ''
      }
    },
    bottomText () {
      switch (this.bottomStatus) {
        case this.BOTTOMSTATUS.loading:
          return this.bottomChangeText.loading || this.$lang.load_more.bottom_ext.loading
        case this.BOTTOMSTATUS.nodata:
          return this.bottomChangeText.nodata || this.$lang.load_more.bottom_ext.nodata
        case this.BOTTOMSTATUS.error:
          return this.bottomChangeText.error || this.$lang.load_more.bottom_ext.error
        default:
          return ''
      }
    }
  },
  watch: {
    topStatus (next) {
      // 下拉刷新状态改变
      this.$emit('top-status-change', next)
    },
    bottomStatus (next) {
      // 上拉加载状态改变
      this.$emit('bottom-status-change', next)
    }
  },
  mounted () {
    this.TOPSTATUS = this.$lang.load_more.TOPSTATUS
    this.topStatus = this.TOPSTATUS.wait
    this.BOTTOMSTATUS = this.$lang.load_more.BOTTOMSTATUS
    this.bottomStatus = this.BOTTOMSTATUS.wait
    this.init()
  },
  methods: {
    handleScroll () {
      this.eventScroll && this.eventScroll()
      if (this.disableBottom) {
        return
      }
      if (this.bottomStatus !== this.BOTTOMSTATUS.wait) {
        return
      }
      const bDistance =
          this.$el.scrollHeight - this.$el.scrollTop - this.$el.clientHeight
      if (bDistance <= this.bottomDistance) {
        this.bottomStatus = this.BOTTOMSTATUS.loading
        this.$nextTick(() => {
          // 移动端某些浏览器初始化控制台报错，不影响使用
          try {
            this.$el.scrollTo(0, this.$el.scrollHeight)
          } catch (e) {
            console.log(e)
          }
          // this.$el.scrollTop = this.$el.scrollHeight
        })
        this.$emit('bottom-method')
      }
    },
    // 获得滚动距离
    getScrollTop () {
      return this.$el.scrollTop
    },
    // 设置滚动距离
    setScrollTop (y) {
      this.$nextTick(() => {
        this.$el.scrollTop = parseFloat(y)
      })
    },
    init () {
      this.startPositionTop = this.$refs.content.getBoundingClientRect().top
      if (!this.disableTop) {
        this.bindTouchEvents()
      }
    },
    bindTouchEvents () {
      this.$refs.content.addEventListener('touchstart', this.handleTouchStart)
      this.$refs.content.addEventListener('touchmove', this.handleTouchMove)
      this.$refs.content.addEventListener('touchend', this.handleTouchEnd)
    },
    handleTouchStart (e) {
      // 只有没滚动时才触发事件
      if (
        this.$refs.content.getBoundingClientRect().top < this.startPositionTop
      ) {
        return
      }
      if (this.topStatus === this.TOPSTATUS.loading) {
        return
      }
      this.startScreenY = e.touches[0].screenY
    },
    handleTouchMove (e) {
      // 只有没滚动时才触发事件
      if (
        this.$refs.content.getBoundingClientRect().top < this.startPositionTop
      ) {
        return
      }
      if (this.topStatus === 'loading') {
        return
      }
      const screenY = e.touches[0].screenY
      const moveDistance = (screenY - this.startScreenY) / this.distanceIndex
      if (
        this.$refs.content.getBoundingClientRect().top > this.startPositionTop
      ) {
        this.topStatus = this.TOPSTATUS.pulling
      }
      if (moveDistance >= this.topDistance) {
        this.topStatus = this.TOPSTATUS.limit
      }
      if (moveDistance > 0) {
        e.preventDefault()
        e.stopPropagation()
        this.transformStyle(this.$refs.content, moveDistance)
      }
    },
    handleTouchEnd (e) {
      // 只有没滚动时才触发事件
      if (
        this.$refs.content.getBoundingClientRect().top < this.startPositionTop
      ) {
        return
      }
      if (
        this.topStatus === this.TOPSTATUS.pulling ||
          this.topStatus === this.TOPSTATUS.limit
      ) {
        e.stopPropagation()
        e.preventDefault()
      }
      if (this.topStatus === 'loading') {
        return
      }

      const screenY = e.changedTouches[0].screenY

      if (
        (screenY - this.startScreenY) / this.distanceIndex >=
          this.topDistance
      ) {
        this.transformStyle(this.$refs.content, this.topLoadingDistance, true)
        this.topStatus = this.TOPSTATUS.loading
        // 下拉刷新触发方法
        this.$emit('top-method')
        if (!this.disableBottom) {
          this.bottomStatus = this.BOTTOMSTATUS.wait
        }
      } else {
        this.topStatus = this.TOPSTATUS.wait
        this.transformStyle(this.$refs.content, 0)
        this.startScreenY = 0
      }
    },
    // TODO 完成时间1s
    // 下拉数据加载完
    onTopLoaded (time = 0) {
      setTimeout(() => {
        this.transformStyle(this.$refs.content, 0, true)
        this.startScreenY = 0
      }, time)
      this.topStatus = this.TOPSTATUS.complete
    },
    // 上拉数据加载完
    onBottomLoaded (flag = true) {
      if (flag) {
        this.bottomStatus = this.BOTTOMSTATUS.wait
      } else {
        this.bottomStatus = this.BOTTOMSTATUS.nodata
      }
    },
    // 上拉数据出错
    onBottomError () {
      this.bottomStatus = this.BOTTOMSTATUS.error
    },
    // 出错时，点击重新加载数据
    onBottomErrorClick () {
      if (this.bottomStatus === this.BOTTOMSTATUS.error) {
        this.bottomStatus = this.BOTTOMSTATUS.loading
        this.$emit('bottom-error-click')
      }
    },
    // 动画
    transformStyle (target, moveDistance, transition, timer = 200) {
      target.style['-webkit-transform'] =
          'translate3d(0,' + moveDistance + 'px,0)'
      target.style.transform = 'translate3d(0,' + moveDistance + 'px,0)'
      target.style.transitionDuration = '0ms'
      if (transition) {
        target.style.transitionDuration = timer + 'ms'
      }
    }
  }
}
</script>
<style scoped lang="scss">
  @import "../../assets/css/fun.scss";
  .garen-loadmore {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .garen-loadmore-header {
    padding: 20px;
    text-align: center;
    font-size: 28px;
    color: $color999;
    letter-spacing: -0.31px;
    &.no{
      display: none;
    }
  }
  .garen-loadmore-footer {
    padding: 20px;
    text-align: center;
    font-size: 28px;
    color: $color999;
    letter-spacing: -0.31px;
  }
</style>
