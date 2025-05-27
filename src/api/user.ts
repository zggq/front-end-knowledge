import request from '@/utils/request'
import type { User, ApiResponse } from '@/types'

// 用户相关API接口

export interface LoginParams {
  username: string
  password: string
}

export interface LoginResponse {
  user: User
  token: string
}

/**
 * 用户登录
 */
export const login = (params: LoginParams): Promise<ApiResponse<LoginResponse>> => {
  return request.post('/auth/login', params)
}

/**
 * 用户注册
 */
export const register = (params: LoginParams): Promise<ApiResponse<User>> => {
  return request.post('/auth/register', params)
}

/**
 * 获取用户信息
 */
export const getUserInfo = (): Promise<ApiResponse<User>> => {
  return request.get('/user/info')
}

/**
 * 更新用户信息
 */
export const updateUserInfo = (params: Partial<User>): Promise<ApiResponse<User>> => {
  return request.put('/user/info', params)
}

/**
 * 用户登出
 */
export const logout = (): Promise<ApiResponse<null>> => {
  return request.post('/auth/logout')
}
