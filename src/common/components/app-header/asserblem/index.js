import { useAppContext } from '@/common/composables/useAppContext'
import { useLifecycle } from '@/common/composables/useLifecycle'
import { usePayload } from '@/common/composables/usePayload'
import { useSiteMeta } from '@/common/composables/useSiteMeta'

import apiRequest from '../api-request/index.js'
import lifecycle from '../module/lifecycle.js'
import module from '../module/index.js'
import { createState } from '../state/index.js'

/**
 * AppHeader —— 装配器
 * 在组件 setup 中调用：集成公共变量/方法与组件自身的变量/方法到独立 payload。
 */
export function useAppHeaderAssemble() {
  const payload = usePayload({
    state: createState,
    module,
    apiRequest,
    commons: [useSiteMeta(), useAppContext()],
  })
  useLifecycle(payload, lifecycle)
  return payload
}
