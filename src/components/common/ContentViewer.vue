<script setup lang="ts">
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { getFileList, getMarkdownContent, renderMarkdown, extractTitle } from '@/utils/markdown'
import { useLoading } from '@/composables/useLoading'
import { gsap } from 'gsap'

interface Props {
  directory: string
  title: string
}

const props = defineProps<Props>()

// 状态管理
const fileList = ref<string[]>([])
const selectedFile = ref<string>('')
const markdownContent = ref<string>('')
const { loading } = useLoading()
const contentRef = ref<HTMLElement>()
const sidebarRef = ref<HTMLElement>()
const hasAnimated = ref<boolean>(false)

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
    loading.value = true
    const files = await getFileList(props.directory)
    fileList.value = files

    // 默认选择第一个文件，但不触发动画
    if (files.length > 0 && !selectedFile.value) {
      selectedFile.value = files[0]
      const content = await getMarkdownContent(props.directory, files[0])
      markdownContent.value = content

      // 等待DOM更新后，为第一个菜单项添加激活状态和动画
      await nextTick()
      const firstMenuItem = document.querySelector('.menu-item')
      if (firstMenuItem) {
        firstMenuItem.classList.add('active')
        gsap.to(firstMenuItem, {
          x: 8,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }

    // 只在首次加载时添加菜单项入场动画
    if (!hasAnimated.value) {
      await nextTick()
      animateMenuItems()
      hasAnimated.value = true
    }
  } catch (error) {
    console.error('加载文件列表失败:', error)
  } finally {
    loading.value = false
  }
}

const selectFile = async (filename: string) => {
  if (selectedFile.value === filename) return

  try {
    loading.value = true

    // 1. 先处理当前激活项的恢复动画
    const currentActiveItem = document.querySelector('.menu-item.active')
    if (currentActiveItem) {
      await gsap.to(currentActiveItem, {
        x: 0,
        duration: 0.3,
        ease: 'power2.out',
      })
      currentActiveItem.classList.remove('active')
    }

    // 2. 更新选中状态
    selectedFile.value = filename

    // 3. 等待DOM更新
    await nextTick()

    // 4. 为新选中项添加激活状态和动画
    const newActiveItem = document.querySelector(`.menu-item[data-filename="${filename}"]`)
    if (newActiveItem) {
      newActiveItem.classList.add('active')
      gsap.to(newActiveItem, {
        x: 8,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    // 5. 内容切换动画和加载
    if (contentRef.value) {
      await gsap.to(contentRef.value, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const content = await getMarkdownContent(props.directory, filename)
    markdownContent.value = content

    await nextTick()

    if (contentRef.value) {
      gsap.fromTo(
        contentRef.value,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
      )
    }

    // 滚动到顶部
    if (contentRef.value) {
      contentRef.value.scrollTop = 0
    }
  } catch (error) {
    console.error('加载文件内容失败:', error)
  } finally {
    loading.value = false
  }
}

// 菜单项动画
const animateMenuItems = () => {
  nextTick(() => {
    const menuItemElements = document.querySelectorAll('.menu-item')

    if (menuItemElements.length > 0) {
      gsap.fromTo(
        menuItemElements,
        {
          x: -50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          onComplete: () => {
            // 动画完成后添加 animated 类，确保后续的 CSS 过渡正常工作
            menuItemElements.forEach((item) => {
              item.classList.add('animated')
            })
          },
        },
      )
    }
  })
}

// 生命周期
onMounted(async () => {
  await loadFileList()

  // 页面标题动画
  const titleElement = document.querySelector('.page-title')
  if (titleElement) {
    gsap.fromTo(
      titleElement,
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 2,
        ease: 'back.out(1.7)',
      },
    )
  }

  // 侧边栏动画
  if (sidebarRef.value) {
    gsap.fromTo(
      sidebarRef.value,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.3,
      },
    )
  }

  // 为菜单项添加悬停动画
  nextTick(() => {
    const menuItemElements = document.querySelectorAll('.menu-item')
    menuItemElements.forEach((item) => {
      const itemElement = item as HTMLElement

      itemElement.addEventListener('mouseenter', () => {
        if (!itemElement.classList.contains('active')) {
          gsap.to(itemElement, {
            x: 8,
            duration: 0.3,
            ease: 'power2.out',
          })
        }
      })

      itemElement.addEventListener('mouseleave', () => {
        if (!itemElement.classList.contains('active')) {
          gsap.to(itemElement, {
            x: 0,
            duration: 0.3,
            ease: 'power2.out',
          })
        }
      })
    })
  })
})

// 监听内容路径变化
watch(
  () => props.directory,
  async (newDirectory, oldDirectory) => {
    // 只有当目录真正发生变化时才重置和重新加载
    if (newDirectory !== oldDirectory) {
      // 重置菜单项状态，移除 animated 类
      const menuItemElements = document.querySelectorAll('.menu-item')
      menuItemElements.forEach((item) => {
        item.classList.remove('animated')
      })

      // 添加内容淡出效果
      if (contentRef.value) {
        await gsap.to(contentRef.value, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.out',
        })
      }

      // 重置选中的文件，确保每次进入新目录都会默认选择第一个文件
      selectedFile.value = ''
      markdownContent.value = ''

      // 重置动画标志，允许新页面执行菜单动画
      hasAnimated.value = false

      await loadFileList()

      // 内容淡入效果
      if (contentRef.value) {
        gsap.to(contentRef.value, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }
  },
)

// 监听loading状态，添加加载动画
watch(loading, (newVal) => {
  if (newVal) {
    // 开始加载时的动画
    nextTick(() => {
      const spinner = document.querySelector('.loading-spinner')
      if (spinner) {
        gsap.to(spinner, {
          rotation: 360,
          duration: 1,
          ease: 'none',
          repeat: -1,
        })
      }
    })
  }
})
</script>

<template>
  <div class="content-viewer">
    <div class="container">
      <h1 class="page-title">{{ title }}</h1>

      <div class="content-layout">
        <!-- 左侧目录 -->
        <aside class="sidebar" ref="sidebarRef">
          <div class="menu">
            <h3 class="menu-title">目录</h3>
            <ul class="menu-list">
              <li
                v-for="item in menuItems"
                :key="item.filename"
                class="menu-item"
                :data-filename="item.filename"
                :class="{ active: item.isActive }"
                @click="selectFile(item.filename)"
              >
                {{ item.title }}
              </li>
            </ul>
          </div>
        </aside>

        <!-- 右侧内容 -->
        <main class="main-content" ref="contentRef">
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
  margin-top: 2rem;
  text-align: center;
  user-select: none;
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
  user-select: none;
}

.menu-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid transparent;
  background:
    linear-gradient(var(--bg-primary), var(--bg-primary)) padding-box,
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
  opacity: 0;
  transform: translateX(-50px);
}

.menu-item.animated {
  opacity: 1;
  transform: translateX(0);
}

.menu-item:hover:not(.active) {
  color: var(--primary-color);
  transform: translateX(4px);
}

.menu-item.active {
  background: var(--primary-gradient);
  color: #fff;
  font-weight: 600;
  box-shadow: var(--shadow-heavy);
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
  margin-bottom: 1rem;
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
  .container {
    padding: 1rem;
    width: 100%;
    overflow-x: hidden;
  }

  .page-title {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  .content-layout {
    grid-template-columns: 1fr;
    gap: 1rem;
    width: 100%;
  }

  .sidebar {
    position: static;
    margin-bottom: 1rem;
    width: 100%;
  }

  .main-content {
    padding: 1rem;
    width: 100%;
    overflow-x: hidden;
  }

  .markdown-content {
    width: 100%;
    overflow-x: hidden;
    word-wrap: break-word;
  }

  .menu-item {
    padding: 0.5rem 0.75rem;
    margin-bottom: 0.25rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0.5rem;
    max-width: 100%;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .main-content {
    padding: 0.75rem;
    max-width: 100%;
  }

  .markdown-content {
    font-size: 0.95rem;
    max-width: 100%;
  }

  .markdown-content pre {
    max-width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .markdown-content img {
    max-width: 100%;
    height: auto;
  }

  .markdown-content table {
    display: block;
    max-width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
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
  background:
    linear-gradient(var(--bg-primary), var(--bg-primary)) padding-box,
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
