import { useAppContext } from '@/common/composables/useAppContext'
import { useLifecycle } from '@/common/composables/useLifecycle'
import { usePayload } from '@/common/composables/usePayload'
import { useSiteMeta } from '@/common/composables/useSiteMeta'

import apiRequest from '../api-request/index.js'
import lifecycle from '../module/lifecycle.js'
import module from '../module/index.js'
import { createState } from '../state/index.js'

/**
 * AppFooter —— 装配器
 */
export function useAppFooterAssemble() {
  const payload = usePayload({
    state: createState,
    module,
    apiRequest,
    commons: [useSiteMeta(), useAppContext()],
  })
  useLifecycle(payload, lifecycle)
  return payload
}
