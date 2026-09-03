import { http } from '@/common/composables/useRequest'

/**
 * 首页 —— API 请求函数（公开组契约 docs/前端对接契约(展示站).md）
 * 约定：每个方法第一个参数固定为 payload。
 *  - P1 GET /works            作品列表（可带 categoryKey/keyword/limit/offset）
 *  - P2 GET /works/categories 公开分类字典
 */
export default {
  /**
   * 获取作品列表（P1）
   * @param {object} payload
   * @param {object} [params] { categoryKey?, keyword?, limit?, offset? }
   */
  fetchWorks(payload, params = {}) {
    return http.get('/works', { params })
  },

  /**
   * 获取公开分类字典（P2）
   * @param {object} payload
   */
  fetchCategories(payload) {
    return http.get('/works/categories')
  },
}
