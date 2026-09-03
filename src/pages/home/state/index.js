/**
 * 首页 —— 组件变量（工厂函数，每实例独立）
 * works 与分类字典来自后端（P1/P2），初始为空；进入页面由生命周期拉取。
 */
export function createState() {
  return {
    works: [],
    // 分类侧边栏选项：默认含「全部」；拉取 P2 字典后在其后追加
    categories: [{ key: '', label: '全部' }],
    // 当前选中分类枚举键（'' = 全部，不传 categoryKey）
    activeCategoryKey: '',
    loading: false,
  }
}
