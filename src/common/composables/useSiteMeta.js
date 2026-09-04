/**
 * 公共变量：站点元信息
 * 品牌 / 导航项 / 社交链接 / 版权文案，供 AppHeader、AppFooter 与各页面使用。
 */
export function useSiteMeta() {
  return {
    brand: '个人作品集',
    navItems: [
      { key: 'works', label: '作品集', to: '/' },
      { key: 'contact', label: '联系我', to: '/contact' },
    ],
    socials: [
      { label: 'GitHub', href: 'https://github.com/hjm041226-ops' },
    ],
    footerText: '© 2026 ordinary 保留所有权利。',
  }
}
