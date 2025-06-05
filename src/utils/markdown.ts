import { marked } from 'marked'
import hljs from 'highlight.js'

interface CodeToken {
  text: string
  lang?: string
}

// 配置marked
marked.setOptions({
  breaks: true,
  gfm: true,
})

// 设置代码高亮
marked.use({
  renderer: {
    code(token: CodeToken) {
      const code = token.text
      const lang = token.lang
      if (lang && hljs.getLanguage(lang)) {
        try {
          return `<pre><code class="hljs language-${lang}">${hljs.highlight(code, { language: lang }).value}</code></pre>`
        } catch (err) {
          console.error('代码高亮失败:', err)
        }
      }
      return `<pre><code class="hljs">${hljs.highlightAuto(code).value}</code></pre>`
    },
  },
})

/**
 * 渲染Markdown文本为HTML
 */
export function renderMarkdown(markdown: string): string {
  return marked.parse(markdown) as string
}

/**
 * 获取文件列表
 */
export async function getFileList(directory: string): Promise<string[]> {
  try {
    // 这里我们需要手动维护文件列表，因为浏览器无法直接读取文件系统
    const fileMap: Record<string, string[]> = {
      interview: [
        '前言.md',
        '美团二面(4.22).md',
        '淘天二面(4.24).md',
        '淘天hr面(5.7).md',
        '美团一面(5.7).md',
        '美团二面(5.8).md',
      ],
      knowledge: [
        '前言.md',
        'CSS.md',
        'JS.md',
        'Vue.md',
        '浏览器.md',
        '计网.md',
        '面试题.md',
        'js手写.md',
        '字符串操作.md',
      ],
    }

    return fileMap[directory] || []
  } catch (error) {
    console.error('获取文件列表失败:', error)
    return []
  }
}

/**
 * 获取Markdown文件内容
 */
export async function getMarkdownContent(directory: string, filename: string): Promise<string> {
  try {
    const response = await fetch(`/content/${directory}/${filename}`, {
      headers: {
        Accept: 'text/plain; charset=utf-8',
      },
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // 确保以 UTF-8 编码读取
    const arrayBuffer = await response.arrayBuffer()
    const decoder = new TextDecoder('utf-8')
    return decoder.decode(arrayBuffer)
  } catch (error) {
    console.error('获取文件内容失败:', error)
    return '# 文件加载失败\n\n无法加载指定的文件内容。'
  }
}

/**
 * 从文件名提取标题（去掉.md后缀）
 */
export function extractTitle(filename: string): string {
  return filename.replace(/\.md$/, '')
}
