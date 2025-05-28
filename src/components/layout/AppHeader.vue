<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import ThemeToggle from '@/components/common/ThemeToggle.vue'

const headerRef = ref<HTMLElement>()
const logoRef = ref<HTMLElement>()
const navRef = ref<HTMLElement>()

onMounted(() => {
  // 确保元素存在
  if (!logoRef.value) return
  
  // 设置初始状态
  gsap.set(logoRef.value, {
    x: -50,
    opacity: 0
  })
  
  gsap.set('.nav-link', {
    y: -30,
    opacity: 0
  })
  
  gsap.set('.theme-toggle', {
    scale: 0,
    rotation: 180
  })
  
  // 创建入场动画时间线
  const tl = gsap.timeline()
  
  tl.to(logoRef.value, {
    x: 0,
    opacity: 1,
    duration: 0.8,
    ease: 'back.out(1.7)'
  })
  .to('.nav-link', {
    y: 0,
    opacity: 1,
    duration: 0.6,
    stagger: 0.1,
    ease: 'back.out(1.7)'
  }, '-=0.4')
  .to('.theme-toggle', {
    scale: 1,
    rotation: 0,
    duration: 0.6,
    ease: 'back.out(1.7)'
  }, '-=0.3')
  
  // 为导航链接添加悬停动画
  const navLinks = document.querySelectorAll('.nav-link')
  navLinks.forEach(link => {
    const linkElement = link as HTMLElement
    
    linkElement.addEventListener('mouseenter', () => {
      gsap.to(linkElement, {
        y: -2,
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      })
    })
    
    linkElement.addEventListener('mouseleave', () => {
      gsap.to(linkElement, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
    })
  })
  
  // Logo悬停动画
  logoRef.value.addEventListener('mouseenter', () => {
    if (!logoRef.value) return
    gsap.to(logoRef.value, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out'
    })
  })
  
  logoRef.value.addEventListener('mouseleave', () => {
    if (!logoRef.value) return
    gsap.to(logoRef.value, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    })
  })
})
</script>

<template>
  <header class="app-header" ref="headerRef">
    <div class="container">
      <div class="logo" ref="logoRef">
        <RouterLink to="/">前端知识库</RouterLink>
      </div>

      <nav class="nav" ref="navRef">
        <RouterLink to="/" class="nav-link">首页</RouterLink>
        <RouterLink to="/interview" class="nav-link">面试经验</RouterLink>
        <RouterLink to="/knowledge" class="nav-link">八股文库</RouterLink>
        <RouterLink to="/about" class="nav-link">关于</RouterLink>
        <ThemeToggle />
      </nav>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.3s ease;
}

.container {
  max-width: 90vw;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.logo a {
  font-size: 1.5rem;
  font-weight: 700;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: var(--text-tertiary);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: var(--primary-color);
}

.nav-link.router-link-active {
  color: var(--primary-color);
  font-weight: 600;
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--primary-gradient);
  border-radius: 1px;
}

@media (max-width: 768px) {
  .nav {
    gap: 1rem;
  }
  
  .nav-link {
    font-size: 0.9rem;
  }
}
</style>
