import { App } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'

/**
 * 公共能力：路由实例、当前路由、antd message
 * 在组件 setup 作用域内调用（由各 asserblem 调用），随后并入该组件 payload。
 */
export function useAppContext() {
  const router = useRouter()
  const route = useRoute()
  const { message } = App.useApp()
  return { router, route, message }
}
