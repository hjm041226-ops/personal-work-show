import { getWorks } from '@/common/composables/useProjectData'

/**
 * 首页 —— 组件变量（工厂函数，每实例独立）
 * 静态期数据直接由本地数据源灌入；接真实接口后由 module/api-request 在生命周期中获取。
 */
export function createState() {
  return {
    works: getWorks(),
    categories: ['全部', 'Web', 'App', 'Desktop', 'Others'],
    activeCategory: '全部',
  }
}
