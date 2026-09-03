# 林晨 — 开发与设计 · 个人作品网站（Vue3 展示站）

个人作品展示站前端：Vue 3（组合式 API / `<script setup>`）+ Vue Router + ant-design-vue + Sass，数据来自 Go 后端公开组接口。

## 目录结构

```
src/
├─ common/                  # 公共层
│  ├─ components/           # 公共组件（app-header / app-footer，均五件套目录）
│  ├─ composables/          # 公共组合式函数（usePayload / useLifecycle / useRequest / …）
│  └─ scss/                 # 设计令牌 / mixin / 全局样式
└─ pages/                   # 页面（home / work-detail / contact，均五件套目录）
```

每个组件/页面的五件套目录：`module/`（方法 + lifecycle）、`state/`、`api-request/`、`asserblem/`、`css/`，详见方法内注释与 `docs/` 下的契约文档。

## 接口对接

- 契约文档：`docs/前端对接契约(展示站).md`（公开组对接依据）、`docs/整合接口契约.md`（含后台组全貌）。
- 请求封装：`src/common/composables/useRequest.js`。
  - baseURL 默认 `/api/v1`（同源 / 网关代理部署零配置）；
  - 可通过环境变量 `VITE_API_BASE_URL` 覆盖（跨域直连时填完整地址，含 `/api/v1`）。
- 开发环境已配置直连后端（见 `.env.development`），复制 `.env.example` 可自定义。

## 开发命令

```bash
npm install
npm run dev      # 本地开发（默认 http://127.0.0.1:5173）
npm run build    # 生产构建
npm run preview  # 预览构建产物
```
