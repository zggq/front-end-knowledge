import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types'

export const useUserStore = defineStore('user', () => {
  // 状态
  const user = ref<User | null>(null)
  const token = ref<string>('')

  // 计算属性
  const isLoggedIn = computed(() => !!token.value && !!user.value)
  const userName = computed(() => user.value?.name || '')

  // 方法
  const setUser = (userData: User) => {
    user.value = userData
  }

  const setToken = (tokenValue: string) => {
    token.value = tokenValue
    // 可以在这里添加本地存储逻辑
    if (tokenValue) {
      localStorage.setItem('token', tokenValue)
    } else {
      localStorage.removeItem('token')
    }
  }

  const login = async (userData: User, tokenValue: string) => {
    setUser(userData)
    setToken(tokenValue)
  }

  const logout = () => {
    user.value = null
    setToken('')
    // 清除其他相关数据
  }

  const initAuth = () => {
    // 从本地存储恢复token
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      token.value = savedToken
      // 这里可以添加验证token有效性的逻辑
    }
  }

  return {
    user,
    token,
    isLoggedIn,
    userName,
    setUser,
    setToken,
    login,
    logout,
    initAuth,
  }
})
