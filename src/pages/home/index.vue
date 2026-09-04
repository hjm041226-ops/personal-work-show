<script setup>
import { useHomeAssemble } from './asserblem/index.js'

const payload = useHomeAssemble()
</script>

<template>
  <main class="page-home">
    <!-- ================= Hero ================= -->
    <section class="hero">
      <div class="pf-container hero__inner">
        <p class="hero__kicker">
          <span class="hero__kicker-dot"></span>
          Developer × Designer
        </p>
        <h1 class="hero__title">
          把 <em>想法</em> 做出来，<br />
          再让它们自己说话。
        </h1>
        <p class="hero__desc">
          我写前端、后端与算法，也在意像素、节奏与手感——这里的每个作品都开源在 GitHub，源码与实现思路都欢迎点进去看。
        </p>
        <div class="hero__actions">
          <a-button class="hero__btn" type="primary" @click="payload.scrollToWorks()">
            <span>浏览作品</span>
          </a-button>
          <RouterLink class="hero__ghost" to="/contact">
            <span>联系我</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ================= 作品区 ================= -->
    <section id="pf-works" class="pf-works">
      <div class="pf-container">
        <div class="pf-works__head">
          <div>
            <p class="pf-works__kicker">Open Source · GitHub</p>
            <h2 class="pf-works__title">全部作品</h2>
          </div>
          <p v-if="!payload.loading && payload.works.length" class="pf-works__count">
            共 {{ payload.works.length }} 件
          </p>
        </div>

        <!-- 分类过滤（P2 字典 + 全部） -->
        <nav class="filter" aria-label="作品分类筛选">
          <button
            v-for="option in payload.categories"
            :key="option.key || '__all__'"
            type="button"
            class="filter__pill"
            :class="{ 'filter__pill--active': payload.activeCategoryKey === option.key }"
            @click="payload.chooseCategory(option.key)"
          >
            {{ option.label }}
          </button>
        </nav>

        <!-- 首屏加载骨架 -->
        <div v-if="payload.loading && payload.works.length === 0" class="skeleton" aria-label="正在加载作品">
          <div class="skeleton__featured"></div>
          <div class="skeleton__row"></div>
          <div class="skeleton__row"></div>
        </div>

        <!-- 空态 -->
        <div v-else-if="!payload.loading && payload.works.length === 0" class="empty">
          <p class="empty__title">{{ payload.activeCategoryKey ? '该分类下暂无作品' : '作品整理中，稍后再来' }}</p>
          <p class="empty__text">{{ payload.activeCategoryKey ? '看看其他分类吧。' : '数据还在路上，稍后刷新即可。' }}</p>
          <a-button
            v-if="payload.activeCategoryKey"
            class="empty__btn"
            type="primary"
            @click="payload.chooseCategory('')"
          >
            查看全部作品
          </a-button>
        </div>

        <!-- 列表：精选 + 其余编号行 -->
        <div v-else class="pf-works__list" :class="{ 'pf-works__list--busy': payload.loading }">
          <!-- 精选（当前列表首条） -->
          <article v-if="payload.works[0]" class="featured" @click="payload.openDetail(payload.works[0])">
            <div class="featured__media">
              <div
                class="featured__media-bg"
                :style="
                  payload.works[0].image
                    ? { backgroundImage: `url('${payload.works[0].image}')` }
                    : null
                "
              ></div>
              <span v-if="payload.works[0].badge" class="featured__badge">{{ payload.works[0].badge }}</span>
              <span class="featured__num" aria-hidden="true">01</span>
            </div>

            <div class="featured__body">
              <p class="featured__meta">
                <span v-if="payload.works[0].category" class="featured__cat">{{ payload.works[0].category }}</span>
                <span class="featured__id">{{ payload.works[0].id }}</span>
              </p>
              <h3 class="featured__title">{{ payload.works[0].title }}</h3>
              <p v-if="payload.works[0].summary" class="featured__summary">{{ payload.works[0].summary }}</p>
              <div v-if="payload.works[0].tags && payload.works[0].tags.length" class="featured__tags">
                <span v-for="tag in payload.works[0].tags" :key="tag" class="featured__tag">{{ tag }}</span>
              </div>
              <span class="featured__cta">
                <span>查看作品详情</span>
                <span class="material-symbols-outlined featured__cta-icon">arrow_forward</span>
              </span>
            </div>
          </article>

          <!-- 其余作品 -->
          <div v-if="payload.restWorks().length" class="rows">
            <article
              v-for="(work, index) in payload.restWorks()"
              :key="work.id"
              class="row"
              @click="payload.openDetail(work)"
            >
              <span class="row__index">{{ String(index + 2).padStart(2, '0') }}</span>

              <div class="row__media">
                <div
                  class="row__media-bg"
                  :style="work.image ? { backgroundImage: `url('${work.image}')` } : null"
                ></div>
              </div>

              <div class="row__body">
                <h3 class="row__title">{{ work.title }}</h3>
                <div v-if="work.tags && work.tags.length" class="row__tags">
                  <span v-for="tag in work.tags.slice(0, 3)" :key="tag" class="row__tag">{{ tag }}</span>
                </div>
              </div>

              <span class="row__arrow" aria-hidden="true">
                <span class="material-symbols-outlined row__arrow-icon">arrow_forward</span>
              </span>
            </article>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" src="./css/index.scss" scoped></style>
