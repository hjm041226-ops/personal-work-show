<script setup>
import { useHomeAssemble } from './asserblem/index.js'

const payload = useHomeAssemble()
</script>

<template>
  <main class="page-home">
    <div class="page-home__layout">
      <!-- 分类导航（lg 下吸顶） -->
      <aside class="page-home__sidebar">
        <div class="cat-card">
          <span class="cat-card__title">分类导航</span>
          <nav class="cat-card__nav">
            <button
              v-for="category in payload.categories"
              :key="category"
              type="button"
              class="cat-card__item"
              :class="{ 'cat-card__item--active': payload.activeCategory === category }"
              @click="payload.chooseCategory(category)"
            >
              {{ category }}
            </button>
          </nav>
        </div>
      </aside>

      <!-- 主内容区 -->
      <div class="page-home__main">
        <!-- 精选作品 -->
        <section class="works">
          <div class="works__top">
            <span class="works__eyebrow">精选作品 / 2023-2024</span>
            <h1 class="works__title">打造数字工具、Web应用与算法实验。</h1>
          </div>

          <div class="works__list">
            <article
              v-for="(work, index) in payload.works"
              :key="work.id"
              class="work-card"
              :class="{ 'work-card--reverse': index % 2 === 1 }"
              @click="payload.openDetail(work)"
            >
              <div class="work-card__media">
                <div
                  class="work-card__media-bg"
                  :style="{ backgroundImage: `url('${work.image}')` }"
                ></div>
                <span class="work-card__badge">{{ work.badge }}</span>
              </div>

              <div class="work-card__body">
                <div class="work-card__copy">
                  <h2 class="work-card__title">{{ work.title }}</h2>
                  <p class="work-card__summary">{{ work.summary }}</p>
                  <div class="work-card__tags">
                    <span v-for="tag in work.tags" :key="tag" class="work-card__tag">
                      {{ tag }}
                    </span>
                  </div>
                </div>

                <a-button
                  class="work-card__btn"
                  type="primary"
                  @click.stop="payload.openDetail(work)"
                >
                  <span>查看详情</span>
                  <span class="material-symbols-outlined work-card__btn-icon">arrow_forward</span>
                </a-button>
              </div>
            </article>
          </div>
        </section>

        <!-- 技术方法 / 简介 -->
        <section class="philosophy">
          <div class="philosophy__grid">
            <div class="philosophy__copy">
              <span class="philosophy__eyebrow">技术方法</span>
              <h2 class="philosophy__title">将严谨的工程与无妥协的视觉韵律完美融合。</h2>
              <p class="philosophy__text">
                每个项目都从底层构建，专注于优化的包体积、可访问的键盘导航，以及作为核心结构元素的排版设计。
              </p>
              <div class="philosophy__stack">
                <div>
                  <h4 class="philosophy__stack-title">前端</h4>
                  <p class="philosophy__stack-text">
                    React, Next.js, Vue 3, Tailwind CSS, TypeScript, Three.js, WebGL
                  </p>
                </div>
                <div>
                  <h4 class="philosophy__stack-title">后端</h4>
                  <p class="philosophy__stack-text">
                    Node.js, PostgreSQL, Redis, IndexedDB, REST &amp; GraphQL APIs
                  </p>
                </div>
              </div>
            </div>

            <div class="philosophy__card">
              <div class="philosophy__card-item">
                <span class="philosophy__card-label">当前探索</span>
                <h3 class="philosophy__card-value">空间计算与本地优先架构</h3>
              </div>
              <div class="philosophy__card-item">
                <span class="philosophy__card-label">教育背景</span>
                <h3 class="philosophy__card-value">计算机科学学士 • 预计 2025 年毕业</h3>
              </div>
              <div class="philosophy__card-item philosophy__card-item--last">
                <span class="philosophy__card-label">联系方式</span>
                <h3 class="philosophy__card-value">lin.chen.dev@university.edu</h3>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<style lang="scss" src="./css/index.scss" scoped></style>
