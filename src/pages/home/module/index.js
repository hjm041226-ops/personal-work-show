/**
 * 首页 —— 组件方法
 * 约定：每个方法第一个参数固定为 payload（由 usePayload 自动注入），不使用 this。
 */
export default {
  /**
   * 进入作品详情页
   * @param {object} payload
   * @param {object} work 作品对象
   */
  openDetail(payload, work) {
    payload.router.push({ name: 'work-detail', params: { id: work.id } })
  },

  /**
   * 切换分类（静态演示：仅更新激活态，不做过滤；优化轮接入过滤逻辑）
   * @param {object} payload
   * @param {string} category 分类名
   */
  chooseCategory(payload, category) {
    payload.activeCategory = category
  },
}
