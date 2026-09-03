/**
 * 公共请求封装（对接 Go 后端公开组 /api/v1）
 *
 * 契约来源：docs/前端对接契约(展示站).md（整合契约拆分版）
 *  - baseURL：默认 '/api/v1'（同源 / 网关代理）；可用环境变量 VITE_API_BASE_URL 覆盖（如开发期直连远程后端）
 *  - 统一包裹：{ code, message, data }
 *      code === 0   → resolve 完整包裹（调用方取 res.data / res.message）
 *      code !== 0   → reject ApiError（携带后端中文 message，前端直接提示）
 *  - 业务失败 HTTP 仍为 200，成败只认 body.code；HTTP 非 200 亦尝试解析包裹
 *  - 公开组匿名，不携带任何 token
 */

const DEFAULT_BASE = '/api/v1'
const DEFAULT_TIMEOUT = 15000

/** 去除末尾斜杠后的 baseURL */
function resolveBase() {
  const raw = (import.meta.env.VITE_API_BASE_URL || '').trim()
  const base = raw || DEFAULT_BASE
  return base.endsWith('/') ? base.slice(0, -1) : base
}

/** 拼接路径与 Query（跳过 null/undefined/空串），返回最终 URL */
function buildUrl(path, params) {
  const base = resolveBase()
  const p = path.startsWith('/') ? path : `/${path}`
  let url = `${base}${p}`
  if (params && typeof params === 'object') {
    const qs = new URLSearchParams()
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== '') {
        qs.set(key, String(value))
      }
    }
    const query = qs.toString()
    if (query) {
      url += (url.includes('?') ? '&' : '?') + query
    }
  }
  return url
}

/** 业务/请求错误：携带后端 code 与中文 message */
export class ApiError extends Error {
  constructor(code, message, httpStatus = 200) {
    super(message || '请求失败，请稍后再试')
    this.name = 'ApiError'
    this.code = code
    this.httpStatus = httpStatus
  }
}

async function doRequest(method, path, { params, data } = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT)

  let res
  try {
    res = await fetch(buildUrl(path, params), {
      method,
      headers: data !== undefined ? { 'Content-Type': 'application/json; charset=utf-8' } : {},
      body: data !== undefined ? JSON.stringify(data) : undefined,
      signal: controller.signal,
    })
  } catch (err) {
    clearTimeout(timer)
    if (err && err.name === 'AbortError') {
      throw new ApiError(-1, '请求超时，请稍后再试', 0)
    }
    throw new ApiError(-1, '网络连接失败，请检查网络后重试', 0)
  }
  clearTimeout(timer)

  let body = null
  try {
    body = await res.json()
  } catch {
    body = null
  }

  // 统一包裹：以 body.code 为准（业务失败 HTTP 可能为 200）
  if (body && typeof body.code === 'number') {
    if (body.code === 0) {
      return body
    }
    throw new ApiError(body.code, body.message || '请求失败，请稍后再试', res.status)
  }

  // 兜底：非包裹响应
  if (!res.ok) {
    throw new ApiError(res.status, `请求失败(HTTP ${res.status})`, res.status)
  }
  return body
}

/** 对外 HTTP 对象（匿名公开组） */
export const http = {
  get(path, options = {}) {
    return doRequest('GET', path, options)
  },
  post(path, data) {
    return doRequest('POST', path, { data })
  },
}

/** 组合式入口：公共请求能力（可按需并入组件 payload） */
export function useRequest() {
  return { http }
}
