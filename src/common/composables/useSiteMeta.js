/**
 * 公共变量：站点元信息
 * 品牌 / 导航项 / 社交链接 / 版权文案，供 AppHeader、AppFooter 与各页面使用。
 */
export function useSiteMeta() {
  return {
    brand: '林晨 — 开发与设计',
    navItems: [
      { key: 'works', label: '作品集', to: '/' },
      { key: 'contact', label: '联系我', to: '/contact' },
    ],
    socials: [
      { label: 'GitHub', href: '#' },
      { label: 'Twitter', href: '#' },
      { label: 'LinkedIn', href: '#' },
    ],
    footerText: '© 2024 林晨. 保留所有权利。',
  }
}
