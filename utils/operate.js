/* 提示框 */
function hintToast(text) {
  wx.showToast({
    title: text,
    icon: 'none',
    duration: 1500
  })
}
module.exports = {
  hintToast,
}