<script setup lang="ts">
// 关于页面
</script>

<template>
  <div class="about">
    <div class="container">
      <h1>关于项目</h1>
      <div class="content">
        <section>
          <h2>技术栈</h2>
          <ul>
            <li>Vue 3 - 渐进式 JavaScript 框架</li>
            <li>TypeScript - JavaScript 的超集</li>
            <li>Pinia - Vue 的状态管理库</li>
            <li>Vue Router - 官方路由管理器</li>
            <li>Vite - 下一代前端构建工具</li>
          </ul>
        </section>

        <section>
          <h2>项目特性</h2>
          <ul>
            <li>现代化的开发体验</li>
            <li>完整的 TypeScript 支持</li>
            <li>组件化开发</li>
            <li>状态管理</li>
            <li>路由管理</li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  padding: 2rem;
  min-height: 100vh;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #2c3e50;
  text-align: center;
}

.content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

section {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #42b883;
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2c3e50;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 0.5rem 0;
  color: #555;
  position: relative;
  padding-left: 1.5rem;
}

li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #42b883;
  font-weight: bold;
}

@media (min-width: 1024px) {
  .about {
    display: flex;
    align-items: center;
  }
}
</style>
