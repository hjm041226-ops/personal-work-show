import { getProjectById } from '@/common/composables/useProjectData'

/**
 * 作品详情页 —— 组件方法
 * 约定：每个方法第一个参数固定为 payload（由 usePayload 自动注入），不使用 this。
 */
export default {
  /**
   * 依据路由参数 /work/:id 加载对应作品；找不到则置 notFound。
   * @param {object} payload
   */
  init(payload) {
    const { id } = payload.route.params
    const work = getProjectById(id)
    payload.work = work
    payload.notFound = !work
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
