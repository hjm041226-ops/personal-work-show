/**
 * 作品详情页 —— 生命周期函数
 * 形态：键为 Vue 组合式生命周期钩子名，值 (payload, ...args) => void。
 * 由 useLifecycle 在 setup 作用域内统一注册。
 * 注：App.vue 的 <router-view :key> 保证参数变化时组件重建，无需额外 watch。
 */
export default {
  onMounted(payload) {
    payload.init()
  },
}
