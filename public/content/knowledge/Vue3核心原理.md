# Vue3核心原理

## 响应式系统

### 1. Proxy vs Object.defineProperty

#### Vue2 (Object.defineProperty)
```javascript
// Vue2的响应式实现
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      // 依赖收集
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        val = newVal;
        // 派发更新
      }
    }
  });
}
```

#### Vue3 (Proxy)
```javascript
// Vue3的响应式实现
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      // 依赖收集
      track(target, key);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver);
      // 派发更新
      trigger(target, key);
      return result;
    }
  });
}
```

### 2. 依赖收集与派发更新

```javascript
// 简化版响应式系统
let activeEffect = null;
const targetMap = new WeakMap();

function track(target, key) {
  if (!activeEffect) return;
  
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  
  dep.add(activeEffect);
}

function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  
  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach(effect => effect());
  }
}

function effect(fn) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}
```

## Composition API

### 1. setup函数

```javascript
// Options API (Vue2)
export default {
  data() {
    return {
      count: 0,
      message: 'Hello'
    };
  },
  methods: {
    increment() {
      this.count++;
    }
  },
  computed: {
    doubleCount() {
      return this.count * 2;
    }
  }
};

// Composition API (Vue3)
import { ref, computed } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const message = ref('Hello');
    
    const increment = () => {
      count.value++;
    };
    
    const doubleCount = computed(() => count.value * 2);
    
    return {
      count,
      message,
      increment,
      doubleCount
    };
  }
};
```

### 2. 响应式API

```javascript
import { 
  ref, 
  reactive, 
  computed, 
  watch, 
  watchEffect 
} from 'vue';

export default {
  setup() {
    // ref - 基本类型响应式
    const count = ref(0);
    
    // reactive - 对象响应式
    const state = reactive({
      name: '张三',
      age: 25
    });
    
    // computed - 计算属性
    const fullInfo = computed(() => {
      return `${state.name} - ${state.age}岁`;
    });
    
    // watch - 侦听器
    watch(count, (newVal, oldVal) => {
      console.log(`count changed: ${oldVal} -> ${newVal}`);
    });
    
    // watchEffect - 立即执行的侦听器
    watchEffect(() => {
      console.log(`当前计数: ${count.value}`);
    });
    
    return {
      count,
      state,
      fullInfo
    };
  }
};
```

### 3. 生命周期钩子

```javascript
import { 
  onMounted, 
  onUpdated, 
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onBeforeUnmount
} from 'vue';

export default {
  setup() {
    onBeforeMount(() => {
      console.log('组件挂载前');
    });
    
    onMounted(() => {
      console.log('组件已挂载');
    });
    
    onBeforeUpdate(() => {
      console.log('组件更新前');
    });
    
    onUpdated(() => {
      console.log('组件已更新');
    });
    
    onBeforeUnmount(() => {
      console.log('组件卸载前');
    });
    
    onUnmounted(() => {
      console.log('组件已卸载');
    });
  }
};
```

## 虚拟DOM与Diff算法

### 1. 虚拟DOM结构

```javascript
// VNode结构
const vnode = {
  type: 'div',
  props: {
    id: 'app',
    class: 'container'
  },
  children: [
    {
      type: 'h1',
      props: null,
      children: 'Hello Vue3'
    },
    {
      type: 'p',
      props: null,
      children: 'This is a paragraph'
    }
  ]
};
```

### 2. Diff算法优化

```javascript
// Vue3的Diff算法优化
function patchChildren(oldChildren, newChildren, container) {
  // 1. 同步头部节点
  let i = 0;
  let oldEnd = oldChildren.length - 1;
  let newEnd = newChildren.length - 1;
  
  // 从头部开始比较
  while (i <= oldEnd && i <= newEnd) {
    if (isSameVNodeType(oldChildren[i], newChildren[i])) {
      patch(oldChildren[i], newChildren[i], container);
      i++;
    } else {
      break;
    }
  }
  
  // 从尾部开始比较
  while (i <= oldEnd && i <= newEnd) {
    if (isSameVNodeType(oldChildren[oldEnd], newChildren[newEnd])) {
      patch(oldChildren[oldEnd], newChildren[newEnd], container);
      oldEnd--;
      newEnd--;
    } else {
      break;
    }
  }
  
  // 处理剩余节点...
}
```

## 编译优化

### 1. 静态提升

```javascript
// 编译前
<template>
  <div>
    <h1>静态标题</h1>
    <p>{{ message }}</p>
  </div>
</template>

// 编译后（静态提升）
const _hoisted_1 = createVNode("h1", null, "静态标题");

function render() {
  return createVNode("div", null, [
    _hoisted_1, // 静态节点被提升
    createVNode("p", null, toDisplayString(message))
  ]);
}
```

### 2. 补丁标记 (PatchFlags)

```javascript
// 编译时标记动态内容
const PatchFlags = {
  TEXT: 1,        // 动态文本
  CLASS: 2,       // 动态class
  STYLE: 4,       // 动态style
  PROPS: 8,       // 动态属性
  FULL_PROPS: 16, // 动态key属性
  HYDRATE_EVENTS: 32, // 事件监听器
  STABLE_FRAGMENT: 64, // 稳定片段
  KEYED_FRAGMENT: 128, // 有key的片段
  UNKEYED_FRAGMENT: 256, // 无key的片段
  NEED_PATCH: 512, // 需要patch
  DYNAMIC_SLOTS: 1024, // 动态插槽
  HOISTED: -1,    // 静态提升
  BAIL: -2        // 差异算法应该退出优化模式
};
```

### 3. 块级作用域 (Block)

```javascript
// 编译优化：块级收集
<template>
  <div>
    <span>{{ msg1 }}</span>
    <span>{{ msg2 }}</span>
    <span>静态文本</span>
  </div>
</template>

// 编译后：只收集动态节点
function render() {
  return (openBlock(), createBlock("div", null, [
    createVNode("span", null, toDisplayString(msg1), 1 /* TEXT */),
    createVNode("span", null, toDisplayString(msg2), 1 /* TEXT */),
    _hoisted_1 // 静态节点
  ]));
}
```

## 组件系统

### 1. 组件定义

```javascript
// 函数式组件
const MyComponent = (props, { slots, emit, attrs }) => {
  return h('div', props.message);
};

// 对象式组件
const MyComponent = {
  props: ['message'],
  setup(props, { slots, emit, attrs }) {
    return () => h('div', props.message);
  }
};

// 单文件组件
<template>
  <div>{{ message }}</div>
</template>

<script setup>
defineProps(['message']);
</script>
```

### 2. 组件通信

```javascript
// 父子组件通信
// 父组件
<template>
  <ChildComponent 
    :message="parentMessage"
    @update="handleUpdate"
  />
</template>

<script setup>
import { ref } from 'vue';
import ChildComponent from './ChildComponent.vue';

const parentMessage = ref('Hello from parent');

const handleUpdate = (newValue) => {
  parentMessage.value = newValue;
};
</script>

// 子组件
<template>
  <div>
    <p>{{ message }}</p>
    <button @click="updateMessage">更新</button>
  </div>
</template>

<script setup>
const props = defineProps(['message']);
const emit = defineEmits(['update']);

const updateMessage = () => {
  emit('update', 'Updated message');
};
</script>
```

### 3. 依赖注入

```javascript
// 祖先组件
import { provide, ref } from 'vue';

export default {
  setup() {
    const theme = ref('dark');
    
    provide('theme', theme);
    
    return { theme };
  }
};

// 后代组件
import { inject } from 'vue';

export default {
  setup() {
    const theme = inject('theme', 'light'); // 默认值
    
    return { theme };
  }
};
```

## 性能优化

### 1. 异步组件

```javascript
import { defineAsyncComponent } from 'vue';

// 简单异步组件
const AsyncComponent = defineAsyncComponent(() => 
  import('./components/AsyncComponent.vue')
);

// 高级异步组件
const AsyncComponent = defineAsyncComponent({
  loader: () => import('./components/AsyncComponent.vue'),
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  delay: 200,
  timeout: 3000
});
```

### 2. Teleport传送门

```javascript
<template>
  <div>
    <h1>主要内容</h1>
    
    <!-- 传送到body -->
    <Teleport to="body">
      <div class="modal">
        <p>这是一个模态框</p>
      </div>
    </Teleport>
  </div>
</template>
```

### 3. Suspense异步边界

```javascript
<template>
  <Suspense>
    <template #default>
      <AsyncComponent />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const AsyncComponent = defineAsyncComponent(() => 
  import('./AsyncComponent.vue')
);
</script>
```

## 总结

Vue3相比Vue2有以下主要改进：

1. **性能提升**: Proxy响应式、编译优化、Tree-shaking
2. **Composition API**: 更好的逻辑复用和类型推导
3. **更好的TypeScript支持**: 原生TypeScript重写
4. **新特性**: Teleport、Suspense、Fragment
5. **更小的包体积**: 按需引入、Tree-shaking

这些改进使Vue3在性能、开发体验和可维护性方面都有显著提升。 