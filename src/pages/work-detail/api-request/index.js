import { http } from '@/common/composables/useRequest'

/**
 * 作品详情页 —— API 请求函数（公开组契约）
 * 约定：每个方法第一个参数固定为 payload。
 *  - P3 GET /works/{id} 作品详情；不存在/未发布/软删 → code 40401（HTTP 仍 200）
 */
export default {
  /**
   * 获取作品详情（P3）
   * @param {object} payload
   * @param {string} id 作品 id（PRJ-xxxx）
   */
  getWorkDetail(payload, id) {
    return http.get(`/works/${encodeURIComponent(id)}`)
  },
}
