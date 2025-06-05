# Vue 核心概念

## Slot（插槽）

### 概述

Slot（插槽）是 Vue 中用于实现组件内容分发的机制，允许父组件在使用子组件时，向子组件的指定位置动态插入自定义内容。其核心价值在于提升组件复用性和实现灵活布局，通过插槽可将组件的结构与内容解耦，使组件既能保留固定框架，又能适应不同场景的需求。

### 插槽类型

1. **默认插槽**

   ```vue
   <!-- 子组件 MyComponent.vue -->
   <template>
     <div class="container">
       <slot></slot>
       <!-- 默认插槽 -->
     </div>
   </template>

   <!-- 父组件使用 -->
   <MyComponent>
     <p>这是默认插槽的内容</p>
   </MyComponent>
   ```

2. **具名插槽**

   ```vue
   <!-- 子组件 Layout.vue -->
   <template>
     <div class="layout">
       <header>
         <slot name="header"></slot>
       </header>
       <main>
         <slot></slot>
       </main>
       <footer>
         <slot name="footer"></slot>
       </footer>
     </div>
   </template>

   <!-- 父组件使用 -->
   <Layout>
     <template v-slot:header>
       <h1>页面标题</h1>
     </template>
     
     <template v-slot:default>
       <p>主要内容</p>
     </template>
   
     <template v-slot:footer>
       <p>页脚内容</p>
     </template>
   </Layout>
   ```

3. **作用域插槽**

   ```vue
   <!-- 子组件 DataList.vue -->
   <template>
     <ul>
       <li v-for="item in items" :key="item.id">
         <slot :item="item">
           <!-- 默认内容 -->
           {{ item.name }}
         </slot>
       </li>
     </ul>
   </template>

   <!-- 父组件使用 -->
   <DataList :items="dataList">
     <template v-slot:default="slotProps">
       <div class="custom-item">
         {{ slotProps.item.name }} - {{ slotProps.item.description }}
       </div>
     </template>
   </DataList>
   ```

## 响应式原理

### Vue2 响应式实现

Vue2 使用 `Object.defineProperty` 对对象的属性进行劫持：

```javascript
// Vue2 响应式实现简化示例
function defineReactive(obj, key, val) {
  const dep = new Dep() // 依赖收集器

  Object.defineProperty(obj, key, {
    get() {
      // 依赖收集
      if (Dep.target) {
        dep.depend()
      }
      return val
    },
    set(newVal) {
      if (newVal === val) return
      val = newVal
      // 派发更新
      dep.notify()
    },
  })
}
```

1. **依赖收集**

   - 在 getter 中收集依赖（如组件的 Watcher）
   - 将当前 Watcher 添加到依赖列表

2. **派发更新**

   - 在 setter 中通知依赖更新视图
   - 触发收集的所有 Watcher 更新

3. **局限性**
   - 无法检测新增/删除属性：需通过 `Vue.set` 或 `Vue.delete` 手动处理
   - 数组监听不足：需重写数组方法（如 push、splice），无法直接通过索引修改
   - 性能开销：递归劫持深层对象属性，初始渲染性能较差

### Vue3 响应式实现

Vue3 基于 Proxy 和 Reflect 实现：

```javascript
// Vue3 响应式实现简化示例
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      // 依赖收集
      track(target, key)
      const result = Reflect.get(target, key, receiver)
      return typeof result === 'object' ? reactive(result) : result
    },
    set(target, key, value, receiver) {
      const oldValue = target[key]
      const result = Reflect.set(target, key, value, receiver)
      if (oldValue !== value) {
        // 派发更新
        trigger(target, key)
      }
      return result
    },
  })
}
```

1. **核心特性**

   - 全面拦截：Proxy 可监听对象的所有操作（包括新增、删除属性及数组索引变化）
   - 惰性代理：仅在访问属性时生成代理，减少初始开销
   - 依赖管理：通过 ReactiveEffect 统一管理依赖，性能更优

2. **核心改进**
   - 性能优化：Proxy 在处理深层嵌套对象和大规模数据时效率更高
   - 代码简洁性：无需手动处理新增/删除属性或数组变异方法

### Vue3 相比 Vue2 的改进

1. 自动检测属性增删，无需 `Vue.set/Vue.delete`

   ```javascript
   // Vue2
   Vue.set(obj, 'newProp', value)

   // Vue3
   obj.newProp = value // 直接赋值即可
   ```

2. 直接支持数组索引操作

   ```javascript
   // Vue2
   // 不能直接通过索引修改数组
   vm.$set(array, index, value)

   // Vue3
   array[index] = value // 直接修改即可
   ```

3. 初始渲染更快（惰性代理），运行时效率更高
4. 支持 Tree-shaking，减小打包体积
5. 引入 Composition API，逻辑组织更灵活
6. 更好的 TypeScript 支持，类型推断更准确

## Computed 和 Watch 的区别

### Computed 适用场景

多数据影响单一结果（如购物车总价）：

```vue
<script setup>
import { ref, computed } from 'vue'

const items = ref([
  { price: 100, quantity: 2 },
  { price: 200, quantity: 1 },
])

// 计算属性：总价
const totalPrice = computed(() => {
  return items.value.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)
})
</script>
```

特点：

- 当 items 或 price/quantity 变化时，自动重新计算
- 多次访问 totalPrice 时，若依赖未变则直接返回缓存值

### Watch 适用场景

数据变化触发复杂操作（如搜索联想）：

```vue
<script setup>
import { ref, watch } from 'vue'

const searchQuery = ref('')
const searchResults = ref([])

// 监听搜索输入
watch(
  searchQuery,
  async (newQuery) => {
    if (newQuery.trim()) {
      // 异步操作
      const results = await fetchSearchResults(newQuery)
      searchResults.value = results
    } else {
      searchResults.value = []
    }
  },
  {
    // 配置选项
    immediate: true, // 立即执行
    deep: true, // 深度监听
  },
)
</script>
```

特点：

- 支持异步操作（如 setTimeout 或 API 调用）
- 可深度监听对象内部变化（deep: true）

### 选择原则

- **优先用 Computed**：当需要模板简化或高效缓存（如数据过滤、计算统计值）时
- **必须用 Watch**：当需要异步操作、深度监听或响应非计算型变化（如路由参数监听）时

## 组件通信

1. **Props 父传子**

   ```vue
   <!-- 父组件 -->
   <template>
     <ChildComponent :message="parentMessage" />
   </template>

   <!-- 子组件 -->
   <script setup>
   const props = defineProps({
     message: {
       type: String,
       required: true,
     },
   })
   </script>
   ```

2. **Emit 子传父**

   ```vue
   <!-- 子组件 -->
   <template>
     <button @click="handleClick">点击</button>
   </template>

   <script setup>
   const emit = defineEmits(['update'])

   const handleClick = () => {
     emit('update', '来自子组件的数据')
   }
   </script>

   <!-- 父组件 -->
   <ChildComponent @update="handleUpdate" />
   ```

3. **事件总线**

   ```javascript
   // 使用 mitt 库
   import mitt from 'mitt'
   const emitter = mitt()

   // 组件A：发送事件
   emitter.emit('custom-event', { data: 'hello' })

   // 组件B：监听事件
   emitter.on('custom-event', (data) => {
     console.log(data)
   })
   ```

4. **Provide / Inject**

   ```vue
   <!-- 祖先组件 -->
   <script setup>
   import { provide, ref } from 'vue'

   const theme = ref('dark')
   provide('theme', theme)
   </script>

   <!-- 后代组件 -->
   <script setup>
   import { inject } from 'vue'

   const theme = inject('theme', 'light') // 第二个参数为默认值
   </script>
   ```

5. **Vuex / Pinia**

   ```javascript
   // Pinia store 示例
   import { defineStore } from 'pinia'

   export const useUserStore = defineStore('user', {
     state: () => ({
       name: '',
       isLoggedIn: false,
     }),
     actions: {
       login(username) {
         this.name = username
         this.isLoggedIn = true
       },
     },
   })
   ```

## Object.defineProperty 和 Proxy 的对比

| 特性         | Object.defineProperty (Vue 2)    | Proxy (Vue 3)              |
| ------------ | -------------------------------- | -------------------------- |
| 监听方式     | 递归劫持每个属性的 getter/setter | 代理整个对象，拦截所有操作 |
| 动态属性监听 | 无法自动监听新增/删除属性        | 自动监听                   |
| 数组监听     | 需重写数组方法                   | 直接监听索引修改           |
| 性能         | 初始化时递归遍历所有属性         | 惰性代理，按需监听         |
| 拦截操作     | 仅支持 get/set                   | 支持13种拦截操作           |
| 兼容性       | 支持 IE9+                        | 仅支持现代浏览器（ES6+）   |

### Proxy 支持的拦截操作

1. get：属性读取
2. set：属性设置
3. has：in 操作符
4. deleteProperty：delete 操作符
5. apply：函数调用
6. construct：new 操作符
7. getPrototypeOf：Object.getPrototypeOf()
8. setPrototypeOf：Object.setPrototypeOf()
9. isExtensible：Object.isExtensible()
10. preventExtensions：Object.preventExtensions()
11. getOwnPropertyDescriptor：Object.getOwnPropertyDescriptor()
12. defineProperty：Object.defineProperty()
13. ownKeys：Object.getOwnPropertyNames() 和 Object.getOwnPropertySymbols()
