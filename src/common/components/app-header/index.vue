<script setup>
import { useAppHeaderAssemble } from './asserblem/index.js'

const payload = useAppHeaderAssemble()
</script>

<template>
  <header class="pf-header">
    <div class="pf-header__container">
      <RouterLink class="pf-header__brand" to="/">
        {{ payload.brand }}
      </RouterLink>
      <nav class="pf-header__nav">
        <RouterLink
          v-for="item in payload.navItems"
          :key="item.key"
          class="pf-header__link"
          :class="{ 'pf-header__link--active': payload.isActive(item.key) }"
          :to="item.to"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" src="./css/index.scss" scoped></style>
