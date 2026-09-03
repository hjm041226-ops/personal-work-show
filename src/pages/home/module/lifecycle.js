/**
 * 首页 —— 生命周期函数
 * 形态：键为 Vue 组合式生命周期钩子名，值 (payload, ...args) => void。
 * 由 useLifecycle 在 setup 作用域内统一注册。
 */
export default {
  /** 挂载后拉取分类字典与作品列表（P1/P2） */
  onMounted(payload) {
    payload.init()
  },
}
