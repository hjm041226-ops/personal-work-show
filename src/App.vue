<script setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { theme as antdTheme } from 'ant-design-vue'
import { useRoute } from 'vue-router'

import AppFooter from '@/common/components/app-footer/index.vue'
import AppHeader from '@/common/components/app-header/index.vue'

const route = useRoute()

// antd 主题：深色算法 + 暖石墨/琥珀 tokens（精确尺寸由各组件 css 覆盖）
const theme = {
  algorithm: antdTheme.darkAlgorithm,
  token: {
    colorPrimary: '#ff8a50',
    colorPrimaryHover: '#ffa06c',
    colorPrimaryActive: '#e5733c',
    colorText: '#f6ede6',
    colorTextSecondary: '#b3a296',
    colorTextTertiary: '#847468',
    colorBorder: '#3a312a',
    colorBorderSecondary: '#2b211b',
    colorBgContainer: '#1d1713',
    colorBgElevated: '#241c17',
    colorBgLayout: '#161110',
    colorBgSpotlight: '#241c17',
    colorFillAlter: '#241c17',
    colorLink: '#ff8a50',
    colorLinkHover: '#ffa06c',
    colorError: '#ffb4ab',
    borderRadius: 6,
    borderRadiusLG: 12,
    borderRadiusSM: 4,
    fontFamily: "'Plus Jakarta Sans', 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif",
  },
}
</script>

<template>
  <a-config-provider :locale="zhCN" :theme="theme">
    <a-app>
      <AppHeader />
      <!-- :key 保证同一路由组件在参数变化时重建，生命周期函数可重新执行 -->
      <router-view :key="route.fullPath" />
      <AppFooter />
    </a-app>
  </a-config-provider>
</template>
