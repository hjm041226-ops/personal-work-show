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
          <h1 class="page-contact__title">对哪个作品好奇，或想一起做点什么？</h1>
          <p class="page-contact__intro">
            每个作品都开源在 GitHub。如果对实现细节、实习机会或合作想法感兴趣，欢迎通过下面的表单或直接邮件联系我，通常会尽快回复。
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
                :disabled="payload.submitting"
              >
                <span>发送消息</span>
              </a-button>
            </form>
          </div>

          <!-- 联系信息卡 -->
          <div class="page-contact__info">
            <div class="page-contact__info-card">
              <span class="page-contact__info-label">直接邮件</span>
              <h3 class="page-contact__info-value">hjm041226@gmail.com</h3>
              <p class="page-contact__info-desc">通常在 24 小时内回复。</p>
            </div>

            <div class="page-contact__info-card">
              <span class="page-contact__info-label">个人仓库</span>
              <div class="page-contact__socials">
                <a class="page-contact__social" href="https://github.com/hjm041226-ops">GitHub — @hjm041226-ops</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" src="./css/index.scss" scoped></style>
