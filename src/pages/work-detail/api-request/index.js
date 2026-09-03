import { getProjectById } from '@/common/composables/useProjectData'

/**
 * 作品详情页 —— API 请求函数
 * 约定：每个方法第一个参数固定为 payload。
 * 本轮未接真实接口：getWorkDetail 仅演示桩（返回本地数据），接入后替换为真实请求。
 */
export default {
  /**
   * 获取作品详情
   * @param {object} payload
   * @param {string} id 作品 id
   */
  getWorkDetail(payload, id) {
    // TODO 接入真实接口：return request.get(`/works/${id}`)
    return Promise.resolve(getProjectById(id))
  },
}
