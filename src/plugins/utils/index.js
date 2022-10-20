/**
 * 日期格式化
 * @param {*} date1
 * @param {*} type 可以返回只有年月日 或年月日时分秒
 */
export function getFormatDate (date1, type) {
  const date = new Date(date1)
  let bool = true
  const y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  let H = date.getHours()
  let mm = date.getMinutes()
  let s = date.getSeconds()
  m = m < 10 ? `0${m}` : m
  d = d < 10 ? `0${d}` : d
  H = H < 10 ? `0${H}` : H
  mm = mm < 10 ? `0${mm}` : mm
  s = s < 10 ? `0${s}` : s
  bool = type === 'ymd' || type === 'YMD' || type === 'YYMMDD' || type === 'yymmdd'
  return bool ? `${y}-${m}-${d}` : `${y}-${m}-${d} ${H}:${mm}:${s}`
}
