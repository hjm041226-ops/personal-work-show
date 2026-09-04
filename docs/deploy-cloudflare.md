# 部署到 Cloudflare Pages

> 适用于本项目(`个人作品网站-vue3`,Vite 8 / Vue 3 SPA,Vue Router 使用 **history 模式**,API 走环境变量 `VITE_API_BASE_URL`)。

## 一、方案二选一

| | A. Git 接入(推荐) | B. Wrangler CLI |
|---|---|---|
| 触发方式 | 每次 push 到仓库分支自动构建 | 本地 `wrangler pages deploy` 手动上传 |
| 需要 | GitHub/GitLab 仓库 | 本机装 Node + wrangler |
| SPA 刷新配置 | 控制台勾选 | 用配置文件 |

下面 A、B 都讲,选一个即可。两者产物一致,都是把 `dist/` 发布。

---

## 二、共同前提:先本地构建

在本目录终端执行(构建产物在 `dist/`):

```bash
npm install
npm run build
```

构建时注意:生产环境的 `VITE_API_BASE_URL` 默认是 `/api/v1`(见 `.env.example`)。

---

## 三、关键:生产 API 地址怎么配(CORS 注意)

后端跑在 Render:`https://personal-work-backend.onrender.com`。Cloudflare 页面域名是 `https://xxx.pages.dev`,**两者跨域**。

### 方式 1:直连跨域(最简单,需后端放行新域名)
在 Cloudflare 构建环境变量里加(见下),让打包时把 API 指到后端:

```
VITE_API_BASE_URL=https://personal-work-backend.onrender.com/api/v1
```

⚠️ 这时浏览器会从你的 `.pages.dev` 页面跨域请求 Render 后端,**后端 CORS 白名单里必须包含你的 pages.dev 域名**,否则控制台报 CORS 错、作品拉不到。你之前 `ALLOWED_ORIGINS` 只放了 `127.0.0.1:5173` / `localhost:5173`,需追加 `https://你的项目.pages.dev`。若绑定了自定义域,也把它加上。

### 方式 2:同源反向代理(推荐,免 CORS)
若你担心 CORS / 想隐藏内网,可让 Cloudflare 代理 `/api/*` 到 Render(需在 Cloudflare 侧配置 Rules/Worker 重写),此时 `VITE_API_BASE_URL` 保持默认 `/api/v1` 即可,同源无跨域。

> 若后端各环境都能接受 `*.pages.dev`,用方式 1 最快;方式 2 更稳妥但要配 Cloudflare 反向代理,稍复杂。

---

## 四、方案 A:Git 接入 Cloudflare Pages

1. **推代码到 GitHub**(若还没):在本地仓库 `git init` 后
   ```bash
   git add .
   git commit -m "init portfolio"
   git branch -M main
   git remote add origin https://github.com/hjm041226-ops/<你的repo>.git
   git push -u origin main
   ```

2. 打开 Cloudflare 控制台 → 左侧 **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → 授权并选中你的仓库。

3. **构建配置**(Frontend 脚手架选 None,Vite 填):
   - **Framework preset**:`Vite`
   - **Build command**:`npm run build`
   - **Build output directory**:`dist`
   - *(若自动识别不对,手填上面值)*

4. **Environment variables**(Production 下点 **Settings → Environment Variables** 或构建页底部 Add):添加
   ```
   VITE_API_BASE_URL = https://personal-work-backend.onrender.com/api/v1   (若不走同源代理)
   ```
   ⚠️ Vite **构建期内存入**,改动后必须触发一次新部署(redeploy)才生效。

5. 点 **Save and Deploy**,等几分钟看构建日志。完成后得到 `https://<项目名>.pages.dev`。

6. **(重要)开启 SPA 单页回退**,否则刷新 `/work/PRJ-0001` 会 404:
   - 控制台项目 → **Settings → General → SPA or Single-page applications**:勾选 **Enable** → Save。

详情页 GitHub 里跳真实页面时同样走 history 路由,这一步不开通,直接手输深链或刷新非首页会返回 404。

自定义域名(可选):项目 → **Custom domains** → Add,绑个 `xxx.com`,Cloudflare 自动配 DNS。

---

## 五、方案 B:Wrangler CLI 上传

1. 安装并登录(任一终端,装一次即可):
   ```bash
   npm i -g wrangler
   wrangler login
   ```

2. 构建(把 API 指到生产):
   ```bash
   npm run build
   ```
   > CLI 直传默认用 `.env.production`?本项目未建 `.env.production`。要传生产 API,两种做法:
   > - 复制 `.env.development` 为 `.env.production`(内容改成达标的 Render 地址)再 `npm run build`;
   > - 或构建时临时注入生产变量,不放文件。

3. 部署 `dist/` 并附带 SPA 回退配置文件(同目录执行):
   ```bash
   wrangler pages deploy dist
   ```
   - 首次会要求输入项目名,得到 `https://<项目名>.pages.dev`。

4. **SPA 回退**:`wrangler pages deploy` 生成的站点默认会对未命中路由回退到 `200.html` 或目录首页。稳妥起见在 `dist/` 内放一个空的 `_redirects`:
   ```
   /* /index.html 200
   ```
   然后重新 `wrangler pages deploy dist`。项目里每次构建会清空 `dist`,若走 CLI 需把 `_redirects` 纳入(source 里新建再 copy,或构建脚本末尾生成)。

5. 后续更新:
   ```bash
   npm run build && wrangler pages deploy dist
   ```
   或用 `wrangler pages deploy dist --project-name <项目名> --branch production`(可再配 GitHub Action 自动部署)。

---

## 六、构建环境变量速查(两种方案都要)

| 变量 | 本地方发 | 生产 | 说明 |
|---|---|---|---|
| `VITE_API_BASE_URL` | `/api/v1`(默认)| `https://personal-work-backend.onrender.com/api/v1` | 多用于后端跨域直连 |

> 生产务必**不给**未替换的后端连接成 `127.0.0.1`。若走方式 2(同源代理)则给 `/api/v1`,且别泄露旧地址。

---

## 七、部署后自查清单

1. 打开 `https://<项目名>.pages.dev/`:首页作品能加载(说明 API 通)。
2. 点一张卡片进 `/work/PRJ-0001`:正常显示。
3. **直接刷新** `/work/PRJ-0001` 与 `/contact`:不 404(SPA 回退已开)。
4. 打开浏览器 DevTools → Console:无红色 **CORS/403/500** 报错。
5. 若用自定义域名,等 DNS 生效后 `https://域名/work/PRJ-0001` 也测一遍。

---

## 八、一处提醒:`.env` 文件别 git 提交

`.env.development` / `.env.production` 含内网/生产细节,建议加入 `.gitignore`(若要公开仓库)。生产 API 一律放 Cloudflare 的 **环境变量**,不放文件提交。
