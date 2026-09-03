/**
 * 首页 —— 组件方法
 * 约定：每个方法第一个参数固定为 payload（由 usePayload 自动注入），不使用 this。
 */
export default {
  /**
   * 进入作品详情页（路由 /work/{id}，id 为后端 PRJ-xxxx）
   * @param {object} payload
   * @param {object} work 作品对象
   */
  openDetail(payload, work) {
    payload.router.push({ name: 'work-detail', params: { id: work.id } })
  },

  /** 初始化：并发拉取分类字典与作品列表 */
  init(payload) {
    payload.loadCategories()
    payload.loadWorks()
  },

  /**
   * 拉取公开分类字典（P2），并把「全部」置为首项
   * @param {object} payload
   */
  async loadCategories(payload) {
    try {
      const res = await payload.api.fetchCategories()
      const list = (res && res.data) || []
      payload.categories = [{ key: '', label: '全部' }, ...list]
    } catch (err) {
      payload.message.error(err.message)
    }
  },

  /**
   * 拉取作品列表（P1）；选中分类时携带 categoryKey
   * @param {object} payload
   */
  async loadWorks(payload) {
    payload.loading = true
    try {
      const params = payload.activeCategoryKey ? { categoryKey: payload.activeCategoryKey } : {}
      const res = await payload.api.fetchWorks(params)
      payload.works = (res && res.data && res.data.list) || []
    } catch (err) {
      payload.message.error(err.message)
    } finally {
      payload.loading = false
    }
  },

  /**
   * 切换分类并重新拉取列表（key 为空串 = 全部）
   * @param {object} payload
   * @param {string} key 分类枚举键 web/app/desktop/others 或 ''
   */
  async chooseCategory(payload, key) {
    if (payload.activeCategoryKey === key) {
      return
    }
    payload.activeCategoryKey = key
    await payload.loadWorks()
  },
}
