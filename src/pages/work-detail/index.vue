<script setup>
import { useWorkDetailAssemble } from './asserblem/index.js'

const payload = useWorkDetailAssemble()
</script>

<template>
  <main class="page-detail">
    <div class="page-detail__column">
      <!-- 返回作品列表 -->
      <div class="pf-container page-detail__back-row">
        <button type="button" class="page-detail__back" @click="payload.goBack()">
          <span class="material-symbols-outlined page-detail__back-icon">arrow_back</span>
          <span>返回作品列表</span>
        </button>
      </div>

      <!-- 未找到作品 -->
      <template v-if="payload.notFound">
        <div class="pf-container">
          <div class="page-detail__missing">
            <h1 class="page-detail__missing-title">未找到该作品</h1>
            <p class="page-detail__missing-text">
              没有找到与当前地址对应的作品，可能链接有误或作品已被移除。
            </p>
            <a-button class="page-detail__missing-btn" type="primary" @click="payload.goBack()">
              <span>返回作品列表</span>
            </a-button>
          </div>
        </div>
      </template>

      <!-- 作品详情 -->
      <template v-else-if="payload.work">
        <!-- 分类与名称 -->
        <section class="pf-container page-detail__section">
          <div class="page-detail__crumb">
            <span class="page-detail__crumb-cat">案例研究</span>
            <span class="page-detail__crumb-sep">/</span>
            <span class="page-detail__crumb-sub">{{ payload.work.category }}</span>
          </div>
          <h1 class="page-detail__title">{{ payload.work.title }}</h1>
        </section>

        <!-- 技术栈标签 -->
        <section class="pf-container page-detail__section">
          <div class="page-detail__tags">
            <span v-for="tag in payload.work.tags" :key="tag" class="page-detail__tag">
              {{ tag }}
            </span>
          </div>
        </section>

        <!-- 功能介绍与核心大图 -->
        <section class="pf-container page-detail__section">
          <p class="page-detail__desc">{{ payload.work.desc }}</p>
          <div class="page-detail__hero">
            <div
              class="page-detail__hero-bg"
              :style="{ backgroundImage: `url('${payload.work.image}')` }"
            ></div>
            <div class="page-detail__hero-veil"></div>
            <div class="page-detail__hero-bar">
              <div class="page-detail__hero-status">
                <span class="page-detail__hero-dot"></span>
                <span class="page-detail__hero-label">{{ payload.work.overlayLabel }}</span>
              </div>
              <div class="page-detail__hero-stats">
                <template v-for="(stat, index) in payload.work.stats" :key="stat.label">
                  <span v-if="index > 0" class="page-detail__hero-sep">|</span>
                  <span class="page-detail__hero-stat">
                    {{ stat.label }}：{{ stat.value }}
                  </span>
                </template>
              </div>
            </div>
          </div>
        </section>

        <!-- GitHub 查看源码 -->
        <section class="pf-container page-detail__section page-detail__section--bottom">
          <div class="page-detail__cta">
            <span class="page-detail__cta-text">想要深入了解源码？</span>
            <a-button class="page-detail__cta-btn" :href="payload.work.githubUrl || '#'">
              <span>在 GitHub 上查看源码</span>
              <span class="material-symbols-outlined page-detail__cta-icon">code</span>
            </a-button>
          </div>
        </section>
      </template>
    </div>
  </main>
</template>

<style lang="scss" src="./css/index.scss" scoped></style>
