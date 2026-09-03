/**
 * 作品详情页 —— 组件变量（工厂函数，每实例独立）
 */
export function createState() {
  return {
    work: null, // 当前展示的作品（含详情字段）
    notFound: false, // 路由 id 无对应作品时为 true
  }
}
