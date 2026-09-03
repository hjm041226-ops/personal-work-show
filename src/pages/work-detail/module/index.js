/**
 * 作品详情页 —— 组件方法
 * 约定：每个方法第一个参数固定为 payload（由 usePayload 自动注入），不使用 this。
 */
export default {
  /**
   * 依据路由参数 /work/:id 请求详情（P3）
   * - 成功：payload.work = 详情对象
   * - code 40401（不存在/未发布）：payload.notFound = true → 展示未找到空态（勿按网络错误处理）
   * - 其它错误：toast 后端 message
   * @param {object} payload
   */
  async init(payload) {
    const { id } = payload.route.params
    payload.loading = true
    payload.notFound = false
    payload.work = null
    try {
      const res = await payload.api.getWorkDetail(id)
      payload.work = (res && res.data) || null
    } catch (err) {
      if (err && err.code === 40401) {
        payload.notFound = true
      } else {
        payload.message.error(err.message)
      }
    } finally {
      payload.loading = false
    }
  },

  /**
   * 返回作品列表：有上一页历史则后退，否则回首页
   * @param {object} payload
   */
  goBack(payload) {
    const historyState = payload.router.options.history.state
    if (historyState && historyState.back) {
      payload.router.back()
    } else {
      payload.router.replace('/')
    }
  },
}
