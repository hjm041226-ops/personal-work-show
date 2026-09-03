<script setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { useRoute } from 'vue-router'

import AppFooter from '@/common/components/app-footer/index.vue'
import AppHeader from '@/common/components/app-header/index.vue'

const route = useRoute()

// antd 主题令牌：与 demo 暖色编辑风格对齐（精确尺寸由各组件 css 覆盖）
const theme = {
  token: {
    colorPrimary: '#9d3e1a',
    colorPrimaryHover: '#bd5630',
    colorPrimaryActive: '#9d3e1a',
    colorText: '#231916',
    colorTextSecondary: '#56423c',
    colorTextTertiary: '#8a726a',
    colorBorder: '#ddc0b7',
    colorBgContainer: '#fff8f6',
    colorBgLayout: '#fff8f6',
    colorLink: '#9d3e1a',
    colorLinkHover: '#bd5630',
    borderRadius: 2,
    borderRadiusLG: 4,
    borderRadiusSM: 2,
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
