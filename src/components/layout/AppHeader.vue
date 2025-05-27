<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ThemeToggle from '@/components/common/ThemeToggle.vue'

// 头部导航组件
</script>

<template>
  <header class="app-header">
    <div class="container">
      <div class="logo">
        <RouterLink to="/">前端知识库</RouterLink>
      </div>

      <nav class="nav">
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
