/**
 * 作品详情页 —— 组件变量（工厂函数，每实例独立）
 */
export function createState() {
  return {
    work: null, // 当前展示的作品（P3 返回的详情对象）
    notFound: false, // 路由 id 无对应可见作品（code 40401）时为 true
    loading: false,
  }
}
