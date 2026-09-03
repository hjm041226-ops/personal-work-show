<script setup>
import { useAppFooterAssemble } from './asserblem/index.js'

const payload = useAppFooterAssemble()
</script>

<template>
  <footer class="pf-footer">
    <div class="pf-footer__container">
      <p class="pf-footer__copyright">{{ payload.footerText }}</p>
      <div class="pf-footer__socials">
        <a
          v-for="item in payload.socials"
          :key="item.label"
          class="pf-footer__link"
          :href="item.href"
        >
          {{ item.label }}
        </a>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" src="./css/index.scss" scoped></style>
