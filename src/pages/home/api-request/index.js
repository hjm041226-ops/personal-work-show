import { getWorks } from '@/common/composables/useProjectData'

/**
 * 首页 —— API 请求函数
 * 约定：每个方法第一个参数固定为 payload。
 * 本轮未接真实接口：fetchWorks 仅演示桩（返回本地数据），接入后替换为真实请求。
 */
export default {
  /**
   * 获取作品列表
   * @param {object} payload
   * @param {object} [params] 查询参数（分类等）
   */
  fetchWorks(payload, params = {}) {
    // TODO 接入真实接口：return request.get('/works', { params })
    return Promise.resolve(getWorks())
  },
}
