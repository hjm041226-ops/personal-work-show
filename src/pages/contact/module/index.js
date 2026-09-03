// 邮箱格式校验：与后端契约完全一致
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

/**
 * 联系我页 —— 组件方法
 * 约定：每个方法第一个参数固定为 payload（由 usePayload 自动注入），不使用 this。
 */
export default {
  /**
   * 提交联系表单（P4）
   * 先做与后端同规则的前端校验（省一次无效请求）；成功展示后端 message 原文并清空表单。
   * @param {object} payload
   */
  async submit(payload) {
    if (payload.submitting) {
      return
    }

    const name = (payload.form.name || '').trim()
    const email = (payload.form.email || '').trim()
    const message = (payload.form.message || '').trim()

    // 与后端一致的校验文案（docs/前端对接契约(展示站).md P4）
    if (name.length < 1 || name.length > 50) {
      payload.message.error('姓名长度需为 1–50 个字符')
      return
    }
    if (!EMAIL_RE.test(email)) {
      payload.message.error('请检查：邮箱格式不正确')
      return
    }
    if (message.length < 1 || message.length > 2000) {
      payload.message.error('留言长度需为 1–2000 个字符')
      return
    }

    payload.submitting = true
    try {
      const res = await payload.api.submitMessage({ name, email, message })
      // 成功时展示后端自定义 message（如「留言已收到,感谢联系」）
      payload.message.success((res && res.message) || '留言已收到，感谢联系')
      payload.form = { name: '', email: '', message: '' }
    } catch (err) {
      payload.message.error(err.message)
    } finally {
      payload.submitting = false
    }
  },
}
