<script setup>
import { useHomeAssemble } from './asserblem/index.js'

const payload = useHomeAssemble()
</script>

<template>
  <main class="page-home">
    <div class="page-home__layout">
      <!-- 分类导航（数据来自 P2 字典 + 首项「全部」，lg 下吸顶） -->
      <aside class="page-home__sidebar">
        <div class="cat-card">
          <span class="cat-card__title">分类导航</span>
          <nav class="cat-card__nav">
            <button
              v-for="option in payload.categories"
              :key="option.key || '__all__'"
              type="button"
              class="cat-card__item"
              :class="{ 'cat-card__item--active': payload.activeCategoryKey === option.key }"
              @click="payload.chooseCategory(option.key)"
            >
              {{ option.label }}
            </button>
          </nav>
        </div>
      </aside>

      <!-- 主内容区 -->
      <div class="page-home__main">
        <!-- 精选作品（数据来自 P1 列表接口） -->
        <section class="works">
          <div class="works__top">
            <span class="works__eyebrow">精选作品</span>
            <h1 class="works__title">打造数字工具、Web应用与算法实验。</h1>
          </div>

          <p v-if="payload.loading && payload.works.length === 0" class="works__state">
            正在加载作品…
          </p>
          <p v-else-if="!payload.loading && payload.works.length === 0" class="works__state">
            暂无作品
          </p>

          <div v-else class="works__list">
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
                  :style="work.image ? { backgroundImage: `url('${work.image}')` } : null"
                ></div>
                <span v-if="work.badge" class="work-card__badge">{{ work.badge }}</span>
              </div>

              <div class="work-card__body">
                <div class="work-card__copy">
                  <h2 class="work-card__title">{{ work.title }}</h2>
                  <p v-if="work.summary" class="work-card__summary">{{ work.summary }}</p>
                  <div v-if="work.tags && work.tags.length" class="work-card__tags">
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
      </div>
    </div>
  </main>
</template>

<style lang="scss" src="./css/index.scss" scoped></style>
