<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="home">
    <div class="hero">
      <h1>欢迎使用 前端知识库</h1>
      <p>分享前端知识，助力职业成长</p>

      <div class="features">
        <div class="feature-card">
          <div class="feature-icon">📝</div>
          <h3>面试经验</h3>
          <p>真实的面试经历分享，包含技术问答、手撕算法和综合考察</p>
          <RouterLink to="/interview" class="feature-link"> 查看面试经验 → </RouterLink>
        </div>

        <div class="feature-card">
          <div class="feature-icon">📚</div>
          <h3>八股文库</h3>
          <p>前端核心知识点整理，涵盖JavaScript、Vue、Vite等技术栈</p>
          <RouterLink to="/knowledge" class="feature-link"> 浏览八股文库 → </RouterLink>
        </div>
      </div>
    </div>

    <div class="intro">
      <h2>关于项目</h2>
      <p>
        这是一个专注于前端开发经验分享的静态网站，旨在帮助前端开发者更好地准备面试、
        学习技术知识。所有内容都以Markdown格式编写，便于阅读和维护。
      </p>

      <div class="tech-stack">
        <h3>技术栈</h3>
        <div class="tech-tags">
          <span class="tech-tag">Vue 3</span>
          <span class="tech-tag">TypeScript</span>
          <span class="tech-tag">Pinia</span>
          <span class="tech-tag">Vue Router</span>
          <span class="tech-tag">Vite</span>
          <span class="tech-tag">Markdown</span>
          <span class="tech-tag">GSAP</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  min-height: calc(100vh - 64px);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transition: all 0.3s ease;
}

/* 暗色主题下的首页背景 */
html.dark .home {
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
}

.hero {
  padding: 4rem 2rem;
  text-align: center;
  max-width: 90vw;
  margin: 0 auto;
  transition: all 0.3s ease;
}

.hero h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #fff, #f0f9ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

html.dark .hero h1 {
  background: linear-gradient(45deg, #e0e7ff, #c7d2fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero > p {
  font-size: 1.3rem;
  margin-bottom: 3rem;
  opacity: 0.9;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

html.dark .feature-card {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

html.dark .feature-card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.feature-card p {
  opacity: 0.9;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.feature-link {
  display: inline-block;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.feature-link:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.intro {
  background: var(--bg-primary);
  color: var(--text-secondary);
  padding: 4rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
}

.intro h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.intro > p {
  font-size: 1.1rem;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto 3rem auto;
  color: var(--text-secondary);
}

.tech-stack {
  max-width: 800px;
  margin: 0 auto;
}

.tech-stack h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
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
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }

  .hero > p {
    font-size: 1.1rem;
  }

  .features {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .intro {
    padding: 3rem 1rem;
  }

  .intro h2 {
    font-size: 2rem;
  }
}
</style>
