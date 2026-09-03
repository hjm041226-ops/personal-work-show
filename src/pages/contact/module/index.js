/**
 * 联系我页 —— 组件方法
 * 约定：每个方法第一个参数固定为 payload（由 usePayload 自动注入），不使用 this。
 */
export default {
  /**
   * 提交联系表单（静态演示）
   * 校验非空后给出 antd message 提示；接入真实接口后改调 payload.api.submitMessage。
   * @param {object} payload
   */
  submit(payload) {
    const { name, email, message } = payload.form

    if (!name.trim() || !email.trim() || !message.trim()) {
      payload.message.warning('请完整填写姓名、邮箱与留言内容。')
      return
    }

    // TODO 接入真实接口：await payload.api.submitMessage({ name, email, message })
    payload.message.success('（演示）信息已接收，接口接入后将正式发送。')
  },
}
