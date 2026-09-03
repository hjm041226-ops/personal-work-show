/**
 * 联系我页 —— 组件变量（工厂函数，每实例独立）
 */
export function createState() {
  return {
    // 联系表单内容（v-model 双向绑定）
    form: {
      name: '',
      email: '',
      message: '',
    },
    submitting: false, // 提交中防重复
  }
}
