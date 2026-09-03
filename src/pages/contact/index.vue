<script setup>
import { useContactAssemble } from './asserblem/index.js'

const payload = useContactAssemble()
</script>

<template>
  <main class="page-contact">
    <div class="page-contact__layout">
      <div class="page-contact__column">
        <!-- 标题区 -->
        <div class="page-contact__heading">
          <span class="page-contact__eyebrow">Get in Touch / 联系方式</span>
          <h1 class="page-contact__title">期待与您交流合作、实习机会或技术探讨。</h1>
          <p class="page-contact__intro">
            如果您有任何关于 Web 开发、数字工具或算法项目的问题，或者想探讨潜在的合作机会，欢迎随时通过表单或直接通过邮件与我联系。
          </p>
        </div>

        <div class="page-contact__grid">
          <!-- 联系表单 -->
          <div class="page-contact__form-card">
            <form class="page-contact__form" @submit.prevent="payload.submit()">
              <div class="page-contact__field">
                <label class="page-contact__label" for="contact-name">您的姓名</label>
                <a-input
                  id="contact-name"
                  v-model:value="payload.form.name"
                  class="page-contact__input"
                  placeholder="请输入您的姓名"
                />
              </div>

              <div class="page-contact__field">
                <label class="page-contact__label" for="contact-email">电子邮箱</label>
                <a-input
                  id="contact-email"
                  v-model:value="payload.form.email"
                  class="page-contact__input"
                  placeholder="name@example.com"
                  type="email"
                />
              </div>

              <div class="page-contact__field">
                <label class="page-contact__label" for="contact-message">留言内容</label>
                <a-textarea
                  id="contact-message"
                  v-model:value="payload.form.message"
                  class="page-contact__textarea"
                  placeholder="请在此输入您的留言..."
                />
              </div>

              <a-button
                class="page-contact__submit"
                type="primary"
                html-type="submit"
                block
              >
                <span>发送消息</span>
              </a-button>
            </form>
          </div>

          <!-- 联系信息卡 -->
          <div class="page-contact__info">
            <div class="page-contact__info-card">
              <span class="page-contact__info-label">直接邮件</span>
              <h3 class="page-contact__info-value">lin.chen.dev@university.edu</h3>
              <p class="page-contact__info-desc">通常在 24 小时内回复。</p>
            </div>

            <div class="page-contact__info-card">
              <span class="page-contact__info-label">所在位置</span>
              <h3 class="page-contact__info-value">中国 / 可远程</h3>
              <p class="page-contact__info-desc">接受全球范围的远程协作。</p>
            </div>

            <div class="page-contact__info-card">
              <span class="page-contact__info-label">社交网络</span>
              <div class="page-contact__socials">
                <a class="page-contact__social" href="#">GitHub — @linchen</a>
                <a class="page-contact__social" href="#">Twitter — @linchen_dev</a>
                <a class="page-contact__social" href="#">LinkedIn — Lin Chen</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" src="./css/index.scss" scoped></style>
