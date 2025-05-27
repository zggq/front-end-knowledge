import { ref } from 'vue'

/**
 * Loading状态管理
 */
export function useLoading(initialState = false) {
  const loading = ref(initialState)

  const setLoading = (state: boolean) => {
    loading.value = state
  }

  const withLoading = async <T>(fn: () => Promise<T>): Promise<T> => {
    try {
      setLoading(true)
      return await fn()
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    setLoading,
    withLoading,
  }
}
