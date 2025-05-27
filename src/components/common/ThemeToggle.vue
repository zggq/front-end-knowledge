<script setup lang="ts">
import { ref } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const toggleButton = ref<HTMLElement>()
const isAnimating = ref(false)

const handleThemeToggle = () => {
  if (isAnimating.value) return
  
  isAnimating.value = true
  
  // 直接切换主题
  themeStore.toggleTheme()
  
  // 等待图标动画完成
  setTimeout(() => {
    isAnimating.value = false
  }, 800)
}
</script>

<template>
  <button 
    ref="toggleButton"
    class="theme-toggle"
    @click="handleThemeToggle"
    :disabled="isAnimating"
    :title="themeStore.isDark ? '切换到白天模式' : '切换到夜间模式'"
  >
    <div class="toggle-icon" :class="{ rotating: isAnimating }">
      <svg v-if="!themeStore.isDark" class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="5"/>
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      </svg>
      <svg v-else class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    </div>
  </button>
</template>

<style scoped>
.theme-toggle {
  position: relative;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  border: 1px solid rgba(102, 126, 234, 0.2);
  overflow: hidden;
}

.theme-toggle:hover:not(:disabled) {
  background: rgba(102, 126, 234, 0.1);
  transform: scale(1.05);
  box-shadow: var(--shadow-heavy);
}

.theme-toggle:disabled {
  cursor: not-allowed;
}

.toggle-icon {
  width: 20px;
  height: 20px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}

.toggle-icon.rotating {
  animation: iconRotate 0.8s ease-in-out;
}

@keyframes iconRotate {
  0% {
    transform: rotate(0deg) scale(1);
  }
  25% {
    transform: rotate(90deg) scale(1.1);
  }
  50% {
    transform: rotate(180deg) scale(1.3);
  }
  75% {
    transform: rotate(270deg) scale(1.1);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}

.sun-icon,
.moon-icon {
  width: 100%;
  height: 100%;
  stroke-width: 2;
  transition: all 0.3s ease;
}

.sun-icon {
  color: #fbbf24;
  filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.3));
}

.moon-icon {
  color: #6366f1;
  filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.3));
}

/* 暗色主题下的样式 */
:global(.dark) .theme-toggle {
  background: rgba(0, 0, 0, 0.2);
  color: #a78bfa;
  border-color: rgba(167, 139, 250, 0.3);
}

:global(.dark) .theme-toggle:hover:not(:disabled) {
  background: rgba(167, 139, 250, 0.2);
  box-shadow: 0 4px 12px rgba(167, 139, 250, 0.3);
}

:global(.dark) .moon-icon {
  color: #a78bfa;
  filter: drop-shadow(0 0 8px rgba(167, 139, 250, 0.4));
}

/* 按钮按下效果 */
.theme-toggle:active:not(:disabled) {
  transform: scale(0.95);
}

/* 增强视觉效果 */
.theme-toggle::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.theme-toggle:hover::before {
  opacity: 1;
}

/* 图标发光效果增强 */
.rotating .sun-icon {
  filter: drop-shadow(0 0 15px rgba(251, 191, 36, 0.8));
}

.rotating .moon-icon {
  filter: drop-shadow(0 0 15px rgba(99, 102, 241, 0.8));
}

:global(.dark) .rotating .moon-icon {
  filter: drop-shadow(0 0 15px rgba(167, 139, 250, 0.8));
}
</style>

 