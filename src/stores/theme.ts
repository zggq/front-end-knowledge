import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export type Theme = 'light' | 'dark'

export const useThemeStore = defineStore('theme', () => {
  // 从localStorage获取保存的主题，默认为light
  const theme = ref<Theme>((localStorage.getItem('theme') as Theme) || 'light')

  // 计算属性：是否为暗色主题
  const isDark = computed(() => theme.value === 'dark')

  // 切换主题
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.value)
    updateDocumentClass()
  }

  // 设置主题
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    updateDocumentClass()
  }

  // 更新document的class
  const updateDocumentClass = () => {
    if (theme.value === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // 初始化主题
  const initTheme = () => {
    updateDocumentClass()
  }

  return {
    theme,
    isDark,
    toggleTheme,
    setTheme,
    initTheme
  }
}) 