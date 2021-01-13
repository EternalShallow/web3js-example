/* eslint-disable */
export function nowTime () {
  return Math.floor(new Date().getTime() / 1000)
}

/**
 * Returns whether a transaction happened in the last day (86400 seconds * 1000 milliseconds / second)
 * @param tx to check for recency
 */
export function isTransactionRecent(tx) {
  return (new Date().getTime() / 1000 - tx.addedTime) < 86400
}


// we want the latest one to come first, so return negative if a is after b
export function newTransactionsFirst(a, b) {
  return b.addedTime - a.addedTime
}

/**
 * 数组对象去重
 * @param attr
 * @param arr
 * @returns {*}
 */
export function arrayDeDuplication(attr, arr){
  const obj = {}
  const peon = arr.reduce((cur, next) => {
    obj[next[attr]] ? '' : obj[next[attr]] = true && cur.push(next)
    return cur
  }, []) // 设置cur默认类型为数组，并且初始值为空的数组
  return peon
}

export function messageError(err) {
  alert(err)
}

/**
 * 数组分割
 * @param array
 * @param subGroupLength
 * @returns {[]}
 */
export function groupArray(array, subGroupLength) {
  let index = 0;
  let newArray = [];
  while(index < array.length) {
    newArray.push(array.slice(index, index += subGroupLength));
  }
  return newArray;
}

/**
 * 保留小数 默认保留两位小数
 * @param num
 * @param point
 * @param isRound 是否四舍五入 默认不四舍五入
 * @returns {string}
 */
export function keepPoint (num, point, isRound = false) {
  point = parseInt(point + '')
  if (isRound) {
    return parseFloat(num).toFixed(point || 2)
  } else {
    return parseFloat(num).toFixed(point + 1 || 3).slice(0, -1)
  }
}
//避开代码检测
/**
 * 解决小数相加精度丢失
 * @param num1
 * @param num2
 * @returns {number}
 */
export function numAdd (num1, num2) { //
  num1 = parseFloat(num1 + '')
  num2 = parseFloat(num2 + '')
  let baseNum, baseNum1, baseNum2
  try {
    baseNum1 = parseFloat(num1 + '').toString().split('.')[1].length
  } catch (e) {
    baseNum1 = 0
  }
  try {
    baseNum2 = parseFloat(num2 + '').toString().split('.')[1].length
  } catch (e) {
    baseNum2 = 0
  }
  // console.log(baseNum1, baseNum2)
  baseNum = Math.pow(10, Math.max(baseNum1, baseNum2))
  return (num1 * baseNum + num2 * baseNum) / baseNum
}

/**
 * 解决小数相减精度丢失问题
 * @param num1
 * @param num2
 * @returns {string}
 */
export function numSub (num1, num2) {
  num1 = parseFloat(num1 + '')
  num2 = parseFloat(num2 + '')
  let baseNum, baseNum1, baseNum2
  let precision // 精度
  try {
    baseNum1 = num1.toString().split('.')[1].length
  } catch (e) {
    baseNum1 = 0
  }
  try {
    baseNum2 = num2.toString().split('.')[1].length
  } catch (e) {
    baseNum2 = 0
  }
  baseNum = Math.pow(10, Math.max(baseNum1, baseNum2))
  precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2
  return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision)
}

/**
 * 乘法精度
 * @param num1
 * @param num2
 * @returns {number}
 */
export function numMulti (num1, num2) { //
  num1 = parseFloat(num1 + '')
  num2 = parseFloat(num2 + '')
  let baseNum = 0
  try {
    baseNum += num1.toString().split('.')[1].length
  } catch (e) {
  }
  try {
    baseNum += num2.toString().split('.')[1].length
  } catch (e) {
  }
  return Number(num1.toString().replace('.', '')) * Number(num2.toString().replace('.', '')) / Math.pow(10, baseNum)
}
/**
 * 除法精度
 * @param num1
 * @param num2
 * @returns {number}
 */
export function numDiv (num1, num2) {
  num1 = parseFloat(num1 + '')
  num2 = parseFloat(num2 + '')
  if (num2 === 0 || num1 === 0) {
    return 0
  }
  let baseNum1 = 0
  let baseNum2 = 0
  let baseNum3, baseNum4
  try {
    baseNum1 = num1.toString().split('.')[1].length
  } catch (e) {
    baseNum1 = 0
  }
  try {
    baseNum2 = num2.toString().split('.')[1].length
  } catch (e) {
    baseNum2 = 0
  }
  baseNum3 = Number(num1.toString().replace('.', ''))
  baseNum4 = Number(num2.toString().replace('.', ''))
  return (baseNum3 / baseNum4) * Math.pow(10, baseNum2 - baseNum1)
}

/**
 * 为数字添加千位分隔符
 * @param num
 * @returns {*|string}
 */
export function milliFormat (num) {
  return num && num.toString()
    .replace(/\d+/, function (s) {
      return s.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
    })
}

/**
 * 返回上一级
 */
export function goBack () {
  window.history.go(-1)
}

export function timeToDate(time) {
  let d = new Date(time * 1000)
  return d.getFullYear() + '/' + numZero(d.getMonth() + 1) + '/' + numZero(d.getDate())
    + ' ' + numZero(d.getHours()) + ':' + numZero(d.getMinutes()) + ':' + numZero(d.getSeconds())
}


/**
 * 保留两位整数补零
 * @param n
 * @returns {string}
 */
export function numZero (n) {
  return n < 10 ? '0' + n : '' + n
}

/**
 * 与APP交互 暴露给APP的返回上一级
 */
// window['goBack'] = function () {
//   window.history.go(-1)
// }

