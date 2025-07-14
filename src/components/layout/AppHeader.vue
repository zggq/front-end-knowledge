<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import ThemeToggle from '@/components/common/ThemeToggle.vue'

const headerRef = ref<HTMLElement>()
const logoRef = ref<HTMLElement>()
const navRef = ref<HTMLElement>()
const isMenuOpen = ref(false)

const closeMenu = () => {
  if (isMenuOpen.value && navRef.value) {
    isMenuOpen.value = false
    gsap.to(navRef.value, {
      x: '100%',
      duration: 0.3,
      ease: 'power2.in',
    })
  }
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value

  if (navRef.value) {
    if (isMenuOpen.value) {
      gsap.to(navRef.value, {
        x: 0,
        duration: 0.3,
        ease: 'power2.out',
      })
    } else {
      gsap.to(navRef.value, {
        x: '100%',
        duration: 0.3,
        ease: 'power2.in',
      })
    }
  }
}

onMounted(() => {
  // 确保元素存在
  if (!logoRef.value) return

  // 设置初始状态
  gsap.set(logoRef.value, {
    x: -50,
    opacity: 0,
  })

  gsap.set('.nav-link', {
    y: -30,
    opacity: 0,
  })

  gsap.set('.theme-toggle', {
    scale: 0,
    rotation: 180,
  })

  // 创建入场动画时间线
  const tl = gsap.timeline()

  tl.to(logoRef.value, {
    x: 0,
    opacity: 1,
    duration: 0.8,
    ease: 'back.out(1.7)',
  })
    .to(
      '.nav-link',
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      },
      '-=0.4',
    )
    .to(
      '.theme-toggle',
      {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
      },
      '-=0.3',
    )

  // 为导航链接添加悬停动画
  const navLinks = document.querySelectorAll('.nav-link')
  navLinks.forEach((link) => {
    const linkElement = link as HTMLElement

    linkElement.addEventListener('mouseenter', () => {
      gsap.to(linkElement, {
        y: -2,
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out',
      })
    })

    linkElement.addEventListener('mouseleave', () => {
      gsap.to(linkElement, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
    })
  })

  // Logo悬停动画
  logoRef.value.addEventListener('mouseenter', () => {
    if (!logoRef.value) return
    gsap.to(logoRef.value, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out',
    })
  })

  logoRef.value.addEventListener('mouseleave', () => {
    if (!logoRef.value) return
    gsap.to(logoRef.value, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
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

      <div class="header-right">
        <!-- 移动端主题切换按钮 -->
        <ThemeToggle class="theme-toggle-mobile" />
        <!-- 移动端菜单按钮 -->
        <button class="menu-toggle" @click="toggleMenu" :class="{ 'is-active': isMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <nav class="nav" ref="navRef" :class="{ 'is-open': isMenuOpen }">
        <RouterLink to="/" class="nav-link" @click="closeMenu">首页</RouterLink>
        <RouterLink to="/interview" class="nav-link" @click="closeMenu">面试经验</RouterLink>
        <RouterLink to="/knowledge" class="nav-link" @click="closeMenu">八股文库</RouterLink>
        <RouterLink to="/about" class="nav-link" @click="closeMenu">关于</RouterLink>
        <!-- 桌面端主题切换按钮 -->
        <ThemeToggle class="theme-toggle-desktop" />
      </nav>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: all 0.3s ease;
  user-select: none;
}

.container {
  max-width: 90vw;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 2rem;
  /* margin-top: 10px; */
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

/* 移动端菜单按钮 */
.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  width: 20px;
  height: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 200;
}

.menu-toggle span {
  margin: 5px 0;
  display: block;
  width: 80%;
  height: 2px;
  background: var(--text-primary);
  transition: all 0.3s ease;
  transform-origin: left center;
}

.menu-toggle.is-active span:nth-child(1) {
  transform: rotate(45deg);
}

.menu-toggle.is-active span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.is-active span:nth-child(3) {
  transform: rotate(-45deg);
}

/* 主题切换按钮响应式显示 */
.theme-toggle-mobile {
  display: none;
  /* margin-top: -10px; */
}

@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }

  .theme-toggle-mobile {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .theme-toggle-desktop {
    display: none;
  }

  .nav {
    position: fixed;
    top: 64px;
    right: 0;
    bottom: 0;
    width: 80%;
    max-width: 300px;
    flex-direction: column;
    background: var(--bg-primary);
    padding: 1.5rem;
    gap: 1rem;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    box-shadow: var(--shadow-heavy);
  }

  .nav.is-open {
    transform: translateX(0);
  }

  .nav-link {
    font-size: 1.1rem;
    width: 100%;
    text-align: center;
    padding: 0.5rem 0;
  }

  .nav-link.router-link-active::after {
    bottom: -4px;
  }
}
</style>
