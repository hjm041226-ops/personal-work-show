import { http } from '@/common/composables/useRequest'

/**
 * 联系我页 —— API 请求函数（公开组契约）
 * 约定：每个方法第一个参数固定为 payload。
 *  - P4 POST /contact/messages 提交联系表单
 */
export default {
  /**
   * 提交联系表单（P4）
   * @param {object} payload
   * @param {{name: string, email: string, message: string}} data 表单数据（已 trim）
   */
  submitMessage(payload, data) {
    return http.post('/contact/messages', data)
  },
}
