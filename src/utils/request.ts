import type { ApiResponse } from '@/types'

// HTTP请求配置
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  body?: unknown
}

class Request {
  private baseURL: string

  constructor(baseURL: string = BASE_URL) {
    this.baseURL = baseURL
  }

  private async request<T = unknown>(
    url: string,
    options: RequestOptions = {},
  ): Promise<ApiResponse<T>> {
    const { method = 'GET', headers = {}, body } = options

    const config: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    }

    if (body && method !== 'GET') {
      config.body = JSON.stringify(body)
    }

    try {
      const response = await fetch(`${this.baseURL}${url}`, config)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Request failed:', error)
      throw error
    }
  }

  get<T = unknown>(url: string, headers?: Record<string, string>) {
    return this.request<T>(url, { method: 'GET', headers })
  }

  post<T = unknown>(url: string, body?: unknown, headers?: Record<string, string>) {
    return this.request<T>(url, { method: 'POST', body, headers })
  }

  put<T = unknown>(url: string, body?: unknown, headers?: Record<string, string>) {
    return this.request<T>(url, { method: 'PUT', body, headers })
  }

  delete<T = unknown>(url: string, headers?: Record<string, string>) {
    return this.request<T>(url, { method: 'DELETE', headers })
  }
}

export const request = new Request()
export default request
