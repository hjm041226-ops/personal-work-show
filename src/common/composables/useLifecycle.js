import {
  onActivated,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onDeactivated,
  onErrorCaptured,
  onMounted,
  onRenderTracked,
  onRenderTriggered,
  onUnmounted,
  onUpdated,
} from 'vue'

// Vue 组合式生命周期钩子名映射
const HOOK_MAP = {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered,
}

/**
 * 【公共方法】把 module/lifecycle.js 中按钩子名导出的对象注册为真实 Vue 生命周期。
 * 必须在组件 setup 作用域内调用（由各组件/页面的 asserblem 调用）。
 *
 * module/lifecycle.js 形态：
 *   export default {
 *     onMounted(payload) { payload.init() },
 *     onBeforeUnmount(payload) { /* 清理 *\/ },
 *   }
 *
 * @param {object} payload   组件独立 payload
 * @param {object} lifecycle 钩子名 -> (payload, ...args) => void
 */
export function useLifecycle(payload, lifecycle = {}) {
  for (const key of Object.keys(lifecycle)) {
    const vueHook = HOOK_MAP[key]
    if (!vueHook) {
      console.warn(`[useLifecycle] 未知的生命周期钩子：${key}`)
      continue
    }
    vueHook((...args) => lifecycle[key](payload, ...args))
  }
}
