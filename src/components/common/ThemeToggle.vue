<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
</script>

<template>
  <button 
    class="theme-toggle"
    @click="themeStore.toggleTheme"
    :title="themeStore.isDark ? '切换到白天模式' : '切换到夜间模式'"
  >
    <div class="toggle-icon">
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
  width: 48px;
  height: 48px;
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
}

.theme-toggle:hover {
  background: rgba(102, 126, 234, 0.1);
  transform: scale(1.05);
  box-shadow: var(--shadow-heavy);
}

.toggle-icon {
  width: 20px;
  height: 20px;
  transition: all 0.3s ease;
}

.sun-icon,
.moon-icon {
  width: 100%;
  height: 100%;
  stroke-width: 2;
}

.sun-icon {
  color: #fbbf24;
}

.moon-icon {
  color: #6366f1;
}

/* 暗色主题下的样式 */
:global(.dark) .theme-toggle {
  background: rgba(0, 0, 0, 0.2);
  color: #a78bfa;
  border-color: rgba(167, 139, 250, 0.3);
}

:global(.dark) .theme-toggle:hover {
  background: rgba(167, 139, 250, 0.2);
  box-shadow: 0 4px 12px rgba(167, 139, 250, 0.3);
}
</style> 