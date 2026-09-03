import { useAppContext } from '@/common/composables/useAppContext'
import { useLifecycle } from '@/common/composables/useLifecycle'
import { usePayload } from '@/common/composables/usePayload'

import apiRequest from '../api-request/index.js'
import lifecycle from '../module/lifecycle.js'
import module from '../module/index.js'
import { createState } from '../state/index.js'

/**
 * 作品详情页 —— 装配器
 */
export function useWorkDetailAssemble() {
  const payload = usePayload({
    state: createState,
    module,
    apiRequest,
    commons: [useAppContext()],
  })
  useLifecycle(payload, lifecycle)
  return payload
}
