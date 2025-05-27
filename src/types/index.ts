// 全局类型定义
export interface User {
  id: number
  name: string
  email: string
  avatar?: string
}

export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

export interface PaginationParams {
  page: number
  pageSize: number
}

export interface PaginationResponse<T = unknown> {
  list: T[]
  total: number
  page: number
  pageSize: number
}
