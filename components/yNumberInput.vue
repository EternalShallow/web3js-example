<template>
  <input class="my-number-input" @focus="focus" type="text" :placeholder="placeholder" v-model="inputModel">
</template>
<script>
let that
export default {
  components: {},
  props: {
    point: {
      default: 0
    },
    is_disabled: {
      default: false
    },
    max: Number,
    min: Number,
    placeholder: String,
    value: {
      default: ''
    }
  },
  computed: {
    inputModel: {
      get: function () {
        // 父组件==>子组件 发消息
        return this.value
      },
      set: function (value) {
        if (this.is_disabled) {
          this.$el.value = ''
          this.setParentModeVal('')
          return
        }
        // 子组件==>父组件 发消息
        let val
        if (this.point === 0) {
          val = this.$el.value.replace(/[^1-9]{0,1}(\d*(?:\.\d{0})?).*$/g, '$1')
        }
        if (this.point === 1) {
          val = this.$el.value.replace(/^\D*(\d*(?:\.\d{0,1})?).*$/g, '$1')
        }
        if (this.point === 2) {
          val = this.$el.value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')
        }
        if (this.point === 3) {
          val = this.$el.value.replace(/^\D*(\d*(?:\.\d{0,3})?).*$/g, '$1')
        }
        if (this.point === 4) {
          val = this.$el.value.replace(/^\D*(\d*(?:\.\d{0,4})?).*$/g, '$1')
        }
        if (this.point === 5) {
          val = this.$el.value.replace(/^\D*(\d*(?:\.\d{0,5})?).*$/g, '$1')
        }
        if (this.point === 6) {
          val = this.$el.value.replace(/^\D*(\d*(?:\.\d{0,6})?).*$/g, '$1')
        }
        if (this.point === 7) {
          val = this.$el.value.replace(/^\D*(\d*(?:\.\d{0,7})?).*$/g, '$1')
        }
        if (this.point === 8) {
          val = this.$el.value.replace(/^\D*(\d*(?:\.\d{0,8})?).*$/g, '$1')
        }
        // console.log(this.point, val, this.$el.value, this.max)
        this.$el.value = val
        // this.$el.value = val.replace(/[^1-9]{0,1}(\d*(?:\.\d{0,2})?).*$/g, '$1')
        // console.log(' 子组件==>父组件 发消息' + val)
        if (val === '.') {
          this.$el.value = ''
          this.setParentModeVal('')
          return
        }
        console.log(val)
        const len = val.length
        if (this.min && this.min > parseFloat(val)) {
          this.$el.value = this.min
          this.setParentModeVal(this.$el.value)
          return
        }
        if (this.max === 0) {
          this.$el.value = 0
          this.setParentModeVal('')
          return
        }
        if (this.point === 0) {
          if (val.indexOf('0') === 0) {
            this.$el.value = ''
            this.setParentModeVal('')
            return
          }
          // 解决首位直接输入 '0开头的数字'问题
          if (len === 2 && val.charAt(0) === 0 && val.charAt(1) !== '.') {
            this.$el.value = val.charAt(1)
            this.setParentModeVal(this.$el.value)
            return
          }
        }
        // 解决数字键盘可以输入输入多个小数点问题
        // if (Math.abs(this.value) > 0 && val === '' && value === '') {
        //   if (this.keyDownDel) {
        //     this.$el.value = ''// 正常删除
        //     // console.log('---正常删除---' + this.value)
        //   } else {
        //     this.$el.value = this.value// 多次输入小数点时
        //     // console.log('---多次输入小数点---' + this.value)
        //   }
        //   this.setParentModeVal(this.$el.value)
        //   return
        // }
        // 解决开始就输入点问题
        if (this.value === '.' && val === '.' && value === '.') {
          // console.log('---22aa---' + this.value)
          this.$el.value = ''
          this.setParentModeVal('')
          return
        }
        // 解决保留两位小数问题
        if (val) {
          const pointIndex = val.indexOf('.')
          if (this.point === 0 && len === 2 && val.charAt(pointIndex) === '.') {
            // console.log('只能输入整数')
            this.$el.value = val.substr(0, pointIndex)
            this.setParentModeVal(this.$el.value)
            return
          }
          if (this.point === 0) {
            // console.log('this.point === 0')
            const v = val ? parseInt(val.replace(/[^0-9]/ig, '')) : ''
            if (v && this.max > 0 && v > this.max) {
              this.$el.value = this.max
            } else {
              this.$el.value = v
            }
            this.setParentModeVal(this.$el.value)
            return
          } else {
            if (pointIndex > 0 && (len - pointIndex) > (this.point + 1)) {
              // console.log('只能输入' + this.point + '位小数')
              this.$el.value = val.substr(0, pointIndex + this.point + 1)
              this.setParentModeVal(this.$el.value)
              return
            } else {
              // 解决输入最大值问题
              if (this.max > 0 && parseFloat(val + '') > this.max) {
                // console.log('---4---')
                // this.$el.value = val.substr(0, len - 1)
                this.$el.value = this.max
              }
              this.setParentModeVal(this.$el.value)
              return
            }
          }
        }
        if (this.point === 0) {
          const v = val ? parseInt(val.replace(/[^0-9]/ig, '')) : ''
          // console.log(v)
          if (v && this.max > 0 && v > this.max) {
            this.$el.value = this.max
          } else {
            this.$el.value = v
          }
          this.setParentModeVal(this.$el.value)
          return
        }
        // 解决输入最大值问题
        if (this.max > 0 && parseFloat(val + '') > this.max) {
          // console.log('---4---')
          // this.$el.value = val.substr(0, len - 1)
          this.$el.value = this.max
          this.setParentModeVal(this.$el.value)
          return
        }
        this.$el.value = val
        this.setParentModeVal(this.$el.value)
      }
    }
  },
  data () {
    return {
      keyDownDel: false// 判断键盘输入值
    }
  },
  mounted () {
    // 判断键盘是否是删除动作
    that = this
    window.document.onkeydown = function (event) {
      /* eslint-disable */ //避开代码检测
      let e = event || window.event || arguments.callee.caller.arguments[0]
      if (e.keyCode === 8 || e.keyCode === 46) {
        that.keyDownDel = true
      } else {
        that.keyDownDel = false
      }
    }
  },
  methods: {
    setParentModeVal (value) {
      // this.value = value
      this.$emit('input', value)
    },
    focus () {
      this.$emit('focus', event.target.value)
    }
  }
}
</script>

<style scoped lang="scss">
  .my-number-input{
    user-select: auto;
    border: 1px solid transparent;  // 去除默认未选中状态边框
    outline: none; // 去除默认选中状态边框
    background-color: rgba(0, 0, 0, 0);// 透明背景
    text-align: right;
    height: 44px;
    width: 100%;
  }
</style>
