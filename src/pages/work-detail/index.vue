<script setup>
import { computed } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { useWorkDetailAssemble } from './asserblem/index.js'

const payload = useWorkDetailAssemble()

/**
 * 详情正文(公开契约 desc = Markdown 原文,DB desc_md):
 * 渲染成 HTML 前先用 DOMPurify 净化,避免 README 中的危险 HTML/事件属性。
 * intro(引言,纯文本)不走这里,直接用插值输出。
 */
const articleHtml = computed(() => {
  const md = payload.work && payload.work.desc
  if (!md) return ''
  const raw = marked.parse(md, { gfm: true, breaks: true })
  return DOMPurify.sanitize(typeof raw === 'string' ? raw : '')
})
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

      <!-- 加载中 -->
      <template v-if="payload.loading">
        <div class="pf-container">
          <p class="page-detail__loading">正在加载作品…</p>
        </div>
      </template>

      <!-- 未找到作品（后端 code 40401） -->
      <template v-else-if="payload.notFound">
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
        <!-- GitHub 查看源码：右上角固定胶囊（不遮挡正文）；repo 为空则不显示 -->
        <a
          v-if="payload.work.repo"
          class="page-detail__source"
          :href="payload.work.repo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="material-symbols-outlined page-detail__source-icon">code</span>
          <span>在 GitHub 上查看源码</span>
        </a>

        <!-- 分类与名称 -->
        <section class="pf-container page-detail__section">
          <div class="page-detail__crumb">
            <span class="page-detail__crumb-cat">作品详情</span>
            <template v-if="payload.work.category">
              <span class="page-detail__crumb-sep">/</span>
              <span class="page-detail__crumb-sub">{{ payload.work.category }}</span>
            </template>
          </div>
          <h1 class="page-detail__title">{{ payload.work.title }}</h1>
        </section>

        <!-- 技术栈标签 -->
        <section
          v-if="payload.work.tags && payload.work.tags.length"
          class="pf-container page-detail__section"
        >
          <div class="page-detail__tags">
            <span v-for="tag in payload.work.tags" :key="tag" class="page-detail__tag">
              {{ tag }}
            </span>
          </div>
        </section>

        <!-- 功能介绍引言与核心大图 -->
        <section class="pf-container page-detail__section">
          <p v-if="payload.work.intro" class="page-detail__intro">{{ payload.work.intro }}</p>
          <div class="page-detail__hero">
            <div
              class="page-detail__hero-bg"
              :style="
                payload.work.image ? { backgroundImage: `url('${payload.work.image}')` } : null
              "
            ></div>
            <div class="page-detail__hero-veil"></div>
            <div
              v-if="
                payload.work.overlayLabel ||
                (payload.work.stats && payload.work.stats.length)
              "
              class="page-detail__hero-bar"
            >
              <div v-if="payload.work.overlayLabel" class="page-detail__hero-status">
                <span class="page-detail__hero-dot"></span>
                <span class="page-detail__hero-label">{{ payload.work.overlayLabel }}</span>
              </div>
              <div v-if="payload.work.stats && payload.work.stats.length" class="page-detail__hero-stats">
                <template v-for="(stat, index) in payload.work.stats || []" :key="stat.label">
                  <span v-if="index > 0" class="page-detail__hero-sep">|</span>
                  <span class="page-detail__hero-stat">
                    {{ stat.label }}：{{ stat.value }}
                  </span>
                </template>
              </div>
            </div>
          </div>
        </section>

        <!-- 作品正文（desc = Markdown，渲染为富文本） -->
        <section
          v-if="articleHtml"
          class="pf-container page-detail__section page-detail__section--article"
        >
          <article class="page-detail__article markdown-body" v-html="articleHtml"></article>
        </section>
      </template>
    </div>
  </main>
</template>

<style lang="scss" src="./css/index.scss" scoped></style>
