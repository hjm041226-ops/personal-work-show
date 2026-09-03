/**
 * 联系我页 —— API 请求函数
 * 约定：每个方法第一个参数固定为 payload。
 * 本轮未接真实接口：submitMessage 仅演示桩，接入后替换为真实请求。
 */
export default {
  /**
   * 提交联系表单
   * @param {object} payload
   * @param {{name: string, email: string, message: string}} data 表单数据
   */
  submitMessage(payload, data) {
    // TODO 接入真实接口：return request.post('/contact', data)
    return Promise.resolve({ ok: true })
  },
}
