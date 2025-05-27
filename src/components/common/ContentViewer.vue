<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getFileList, getMarkdownContent, renderMarkdown, extractTitle } from '@/utils/markdown'
import { useLoading } from '@/composables/useLoading'

interface Props {
  directory: string
  title: string
}

const props = defineProps<Props>()

// 状态管理
const fileList = ref<string[]>([])
const selectedFile = ref<string>('')
const markdownContent = ref<string>('')
const { loading, withLoading } = useLoading()

// 计算属性
const renderedContent = computed(() => {
  if (!markdownContent.value) return ''
  return renderMarkdown(markdownContent.value)
})

const menuItems = computed(() => {
  return fileList.value.map((filename) => ({
    filename,
    title: extractTitle(filename),
    isActive: filename === selectedFile.value,
  }))
})

// 方法
const loadFileList = async () => {
  try {
    const files = await getFileList(props.directory)
    fileList.value = files

    // 默认选择第一个文件
    if (files.length > 0) {
      await selectFile(files[0])
    }
  } catch (error) {
    console.error('加载文件列表失败:', error)
  }
}

const selectFile = async (filename: string) => {
  selectedFile.value = filename

  await withLoading(async () => {
    const content = await getMarkdownContent(props.directory, filename)
    markdownContent.value = content
  })
}

// 生命周期
onMounted(() => {
  loadFileList()
})
</script>

<template>
  <div class="content-viewer">
    <div class="container">
      <h1 class="page-title">{{ title }}</h1>

      <div class="content-layout">
        <!-- 左侧目录 -->
        <aside class="sidebar">
          <div class="menu">
            <h3 class="menu-title">目录</h3>
            <ul class="menu-list">
              <li
                v-for="item in menuItems"
                :key="item.filename"
                class="menu-item"
                :class="{ active: item.isActive }"
                @click="selectFile(item.filename)"
              >
                {{ item.title }}
              </li>
            </ul>
          </div>
        </aside>

        <!-- 右侧内容 -->
        <main class="main-content">
          <div v-if="loading" class="loading">
            <div class="loading-spinner"></div>
            <p>加载中...</p>
          </div>

          <div v-else-if="renderedContent" class="markdown-content" v-html="renderedContent"></div>

          <div v-else class="empty-state">
            <p>请选择一个文档查看内容</p>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-viewer {
  min-height: calc(100vh - 64px);
  background-color: var(--bg-secondary);
  transition: all 0.3s ease;
}

.container {
  max-width: 100vw;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 2rem;
  text-align: center;
}

.content-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
  min-height: 600px;
}

/* 左侧边栏 */
.sidebar {
  background: var(--bg-primary);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: var(--shadow-light);
  height: fit-content;
  position: sticky;
  top: 80px;
}

.menu-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid transparent;
  background: linear-gradient(var(--bg-primary), var(--bg-primary)) padding-box,
              var(--primary-gradient) border-box;
  border-bottom: 2px solid;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-secondary);
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

.menu-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  transition: left 0.3s ease;
  z-index: -1;
}

.menu-item:hover::before {
  left: 0;
}

.menu-item:hover {
  color: var(--primary-color);
  transform: translateX(4px);
}

.menu-item.active {
  background: var(--primary-gradient);
  color: #fff;
  font-weight: 600;
  box-shadow: var(--shadow-heavy);
}

.menu-item.active::before {
  display: none;
}

/* 右侧内容区 */
.main-content {
  background: var(--bg-primary);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: var(--shadow-light);
  min-height: 600px;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  color: var(--text-tertiary);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--bg-tertiary);
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  color: var(--text-tertiary);
  font-size: 1.1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content-layout {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .sidebar {
    position: static;
  }

  .page-title {
    font-size: 2rem;
  }
}
</style>

<!-- 全局样式：Markdown内容样式 -->
<style>
.markdown-content {
  line-height: 1.8;
  color: var(--text-primary);
}

.markdown-content h1 {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 2rem 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid transparent;
  background: linear-gradient(var(--bg-primary), var(--bg-primary)) padding-box,
              var(--primary-gradient) border-box;
  border-bottom: 2px solid;
}

.markdown-content h2 {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 1.5rem 0 1rem 0;
}

.markdown-content h3 {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 1.2rem 0 0.8rem 0;
}

.markdown-content h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 1rem 0 0.6rem 0;
}

.markdown-content p {
  margin: 1rem 0;
  line-height: 1.8;
  color: var(--text-secondary);
}

.markdown-content ul,
.markdown-content ol {
  margin: 1rem 0;
  padding-left: 2rem;
  color: var(--text-secondary);
}

.markdown-content li {
  margin: 0.5rem 0;
}

.markdown-content blockquote {
  border-left: 4px solid var(--primary-color);
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  border-radius: 0 4px 4px 0;
  color: var(--text-secondary);
}

html.dark .markdown-content blockquote {
  background: linear-gradient(135deg, rgba(167, 139, 250, 0.1), rgba(139, 92, 246, 0.1));
}

.markdown-content code {
  background-color: var(--bg-tertiary);
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9em;
  color: var(--primary-color);
  font-weight: 600;
}

.markdown-content pre {
  background-color: #2d3748;
  color: #e2e8f0;
  padding: 1.5rem;
  border-radius: 6px;
  overflow-x: auto;
  margin: 1.5rem 0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  line-height: 1.5;
  border: 1px solid rgba(102, 126, 234, 0.2);
}

html.dark .markdown-content pre {
  background-color: #1f2937;
  border-color: rgba(167, 139, 250, 0.3);
}

.markdown-content pre code {
  background: none;
  padding: 0;
  color: inherit;
  font-size: 0.9rem;
}

.markdown-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

.markdown-content th,
.markdown-content td {
  border: 1px solid var(--border-color);
  padding: 0.75rem;
  text-align: left;
}

.markdown-content th {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  font-weight: 600;
  color: var(--text-primary);
}

html.dark .markdown-content th {
  background: linear-gradient(135deg, rgba(167, 139, 250, 0.2), rgba(139, 92, 246, 0.2));
}

.markdown-content strong {
  font-weight: 600;
  color: var(--text-primary);
}

.markdown-content a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.markdown-content a:hover {
  color: var(--secondary-color);
  text-decoration: underline;
}

/* 代码高亮样式 */
.hljs {
  background: #2d3748 !important;
  color: #e2e8f0 !important;
}
</style>
