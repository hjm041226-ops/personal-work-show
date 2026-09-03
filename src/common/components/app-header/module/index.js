/**
 * AppHeader —— 组件方法
 * 约定：每个方法第一个参数固定为 payload（由 usePayload 自动注入），不使用 this。
 */
export default {
  /**
   * 判断导航项是否为激活态
   * @param {object} payload 组件独立 payload
   * @param {string} key      导航项 key（works / contact）
   */
  isActive(payload, key) {
    const path = payload.route.path
    if (key === 'works') {
      return path === '/' || path.startsWith('/work')
    }
    if (key === 'contact') {
      return path.startsWith('/contact')
    }
    return false
  },
}
