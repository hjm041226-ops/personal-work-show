import { reactive } from 'vue'

/**
 * 【公共方法】把一个组件的 变量 + 方法 + API 函数 + 公共能力 集成为一个独立 payload。
 *
 * 约定：
 *  - state 传入工厂函数 createState()，每次装配生成一份独立变量（组件实例互不共享）；
 *  - module / apiRequest 中的每个方法第一个参数固定为 payload，这里统一做自动注入封装，
 *    因此组件代码无需 bind this、也无需手动传 payload：
 *        模板中      payload.openDetail(work)
 *        方法内部    payload.router.push(...) / payload.api.fetchWorks(params)
 *  - apiRequest 统一收进 payload.api 命名空间，避免与组件方法同名冲突；
 *  - commons 为公共 composable 的返回值（变量/方法/实例），扁平并入 payload。
 *
 * @param {{ state?: Function|Object, module?: Object, apiRequest?: Object, commons?: Object[] }} config
 * @returns {object} reactive payload
 */
export function usePayload({ state, module = {}, apiRequest = null, commons = [] } = {}) {
  // 1. 实例私有变量
  const initialState = typeof state === 'function' ? state() : { ...(state || {}) }
  const payload = reactive({ ...initialState })

  // 2. 公共变量 / 方法扁平并入（按传入顺序，后者覆盖前者）
  for (const item of commons) {
    if (item && typeof item === 'object') {
      Object.assign(payload, item)
    }
  }

  // 3. 组件方法并入（方法覆盖公共内容中的同名键，保证业务优先）
  Object.assign(payload, wrapSource(payload, module))

  // 4. API 函数收进 payload.api 命名空间
  if (apiRequest) {
    payload.api = wrapSource(payload, apiRequest)
  }

  return payload
}

/** 把源对象里的每个函数包装成「自动注入 payload 作为第一个参数」的可调用形式 */
function wrapSource(payload, source) {
  const wrapped = {}
  for (const key of Object.keys(source)) {
    const value = source[key]
    wrapped[key] = typeof value === 'function' ? (...args) => value(payload, ...args) : value
  }
  return wrapped
}
