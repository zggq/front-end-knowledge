<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'

const titleRef = ref<HTMLElement>()
const sectionsRef = ref<HTMLElement[]>([])

onMounted(() => {
  // 确保元素存在
  if (!titleRef.value) return
  
  // 创建主时间线
  const tl = gsap.timeline()
  
  // 设置初始状态
  gsap.set(titleRef.value, {
    y: -80,
    opacity: 0
  })
  
  gsap.set('.intro, .features, .tech-stack, .contact', {
    y: 60,
    opacity: 0
  })
  
  gsap.set('.feature-item', {
    y: 40,
    opacity: 0,
    scale: 0.9
  })
  
  gsap.set('.tech-tag', {
    scale: 0,
    rotation: -180
  })
  
  // 执行入场动画
  tl.to(titleRef.value, {
    y: 0,
    opacity: 1,
    duration: 1.2,
    ease: 'back.out(1.7)'
  })
  .to('.intro', {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out'
  }, '-=0.6')
  .to('.features', {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out'
  }, '-=0.4')
  .to('.feature-item', {
    y: 0,
    opacity: 1,
    scale: 1,
    duration: 0.6,
    stagger: 0.15,
    ease: 'back.out(1.7)'
  }, '-=0.4')
  .to('.tech-stack', {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out'
  }, '-=0.2')
  .to('.tech-tag', {
    scale: 1,
    rotation: 0,
    duration: 0.5,
    stagger: 0.08,
    ease: 'back.out(1.7)'
  }, '-=0.4')
  .to('.contact', {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out'
  }, '-=0.2')
  
  // 为功能卡片添加悬停动画
  const featureItems = document.querySelectorAll('.feature-item')
  featureItems.forEach(item => {
    const itemElement = item as HTMLElement
    
    itemElement.addEventListener('mouseenter', () => {
      gsap.to(itemElement, {
        y: -8,
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      })
      
      // 图标动画
      const icon = itemElement.querySelector('.feature-icon')
      if (icon) {
        gsap.to(icon, {
          scale: 1.2,
          rotation: 10,
          duration: 0.3,
          ease: 'back.out(1.7)'
        })
      }
    })
    
    itemElement.addEventListener('mouseleave', () => {
      gsap.to(itemElement, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
      
      const icon = itemElement.querySelector('.feature-icon')
      if (icon) {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
    })
  })
  
  // 技术标签悬停动画
  const techTags = document.querySelectorAll('.tech-tag')
  techTags.forEach(tag => {
    const tagElement = tag as HTMLElement
    
    tagElement.addEventListener('mouseenter', () => {
      gsap.to(tagElement, {
        scale: 1.1,
        y: -3,
        duration: 0.3,
        ease: 'power2.out'
      })
    })
    
    tagElement.addEventListener('mouseleave', () => {
      gsap.to(tagElement, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      })
    })
  })
  
  // 联系链接动画
  const contactLinks = document.querySelectorAll('.contact-link')
  contactLinks.forEach(link => {
    const linkElement = link as HTMLElement
    
    linkElement.addEventListener('mouseenter', () => {
      gsap.to(linkElement, {
        scale: 1.05,
        y: -3,
        duration: 0.3,
        ease: 'back.out(1.7)'
      })
    })
    
    linkElement.addEventListener('mouseleave', () => {
      gsap.to(linkElement, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      })
    })
  })
})
</script>

<template>
  <div class="about">
    <div class="container">
      <h1 class="title" ref="titleRef">关于前端知识库</h1>
      
      <div class="content">
        <section class="intro">
          <h2>项目简介</h2>
          <p>
            前端知识库是一个专注于前端开发经验分享的静态网站，旨在帮助前端开发者更好地准备面试、
            学习技术知识。我们收集整理了真实的面试经验和核心技术知识点，以Markdown格式呈现，
            便于阅读和学习。
          </p>
        </section>

        <section class="features">
          <h2>主要功能</h2>
          <div class="feature-grid">
            <div class="feature-item">
              <div class="feature-icon">📝</div>
              <h3>面试经验分享</h3>
              <p>真实的面试经历、技术问答、面试技巧和注意事项</p>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon">📚</div>
              <h3>技术八股文库</h3>
              <p>前端核心知识点整理，涵盖JavaScript、Vue、CSS等技术栈</p>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon">🎨</div>
              <h3>优雅的阅读体验</h3>
              <p>支持代码高亮、响应式设计，提供舒适的阅读环境</p>
            </div>

          </div>
        </section>

        <section class="tech-stack">
          <h2>技术栈</h2>
          <div class="tech-tags">
            <span class="tech-tag">Vue 3</span>
            <span class="tech-tag">TypeScript</span>
            <span class="tech-tag">Pinia</span>
            <span class="tech-tag">Vue Router</span>
            <span class="tech-tag">Vite</span>
            <span class="tech-tag">Marked</span>
            <span class="tech-tag">GSAP</span>
          </div>
        </section>

        <section class="contact">
          <h2>联系我们</h2>
          <p>
            如果你有好的面试经验想要分享，或者发现了内容中的错误，
            欢迎通过GitHub提交Issue或Pull Request。
          </p>
          <div class="contact-links">
            <a href="#" class="contact-link">GitHub</a>
            <a href="#" class="contact-link">邮箱联系</a>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  min-height: calc(100vh - 64px);
  background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
  padding: 2rem 0;
}

.container {
  max-width: 90vw;
  margin: 0 auto;
  padding: 0 1rem;
}

.title {
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.content {
  max-width: 900px;
  margin: 0 auto;
}

section {
  background: var(--bg-primary);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-medium);
}

section h2 {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid transparent;
  background: linear-gradient(var(--bg-primary), var(--bg-primary)) padding-box,
              var(--primary-gradient) border-box;
  border-bottom: 2px solid;
}

.intro p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-secondary);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.feature-item {
  text-align: center;
  padding: 1.5rem;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
  border: 1px solid rgba(102, 126, 234, 0.1);
  transition: all 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-heavy);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-item h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.feature-item p {
  color: var(--text-secondary);
  line-height: 1.6;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.tech-tag {
  background: var(--primary-gradient);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 500;
  font-size: 0.9rem;
  box-shadow: var(--shadow-medium);
  transition: all 0.3s ease;
}

.tech-tag:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-heavy);
}

.contact p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.contact-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.contact-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--primary-gradient);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-medium);
}

.contact-link:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-heavy);
}

@media (max-width: 768px) {
  .title {
    font-size: 2.2rem;
  }
  
  .feature-grid {
    grid-template-columns: 1fr;
  }
  
  .contact-links {
    flex-direction: column;
    align-items: center;
  }
}
</style>

<!-- 全局样式：处理暗色主题 -->
<style>
/* 暗色主题下的特殊样式 */
html.dark .feature-item {
  background: linear-gradient(135deg, rgba(167, 139, 250, 0.1), rgba(139, 92, 246, 0.1)) !important;
  border-color: rgba(167, 139, 250, 0.2) !important;
}
</style>
