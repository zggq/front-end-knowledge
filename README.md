# Dev Show

基于 Vue 3 + TypeScript + Pinia + Vue Router 的现代化前端项目框架。

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - JavaScript 的超集，提供静态类型检查
- **Pinia** - Vue 的状态管理库
- **Vue Router** - Vue.js 官方路由管理器
- **Vite** - 下一代前端构建工具
- **ESLint + Prettier** - 代码质量和格式化工具

## 项目结构

```
src/
├── api/              # API 接口
├── assets/           # 静态资源
├── components/       # 公共组件
├── composables/      # 组合式函数
├── directives/       # 自定义指令
├── router/           # 路由配置
├── stores/           # Pinia 状态管理
├── types/            # TypeScript 类型定义
├── utils/            # 工具函数
├── views/            # 页面组件
├── App.vue           # 根组件
└── main.ts           # 入口文件
```

## 开始使用

### 安装依赖

```bash
npm install
```

### 开发环境

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 代码检查

```bash
npm run lint
```

### 代码格式化

```bash
npm run format
```

## 环境变量

复制 `.env.example` 文件为 `.env` 并根据需要修改配置：

```bash
cp .env.example .env
```

## 功能特性

- ✅ Vue 3 Composition API
- ✅ TypeScript 支持
- ✅ Pinia 状态管理
- ✅ Vue Router 路由管理
- ✅ HTTP 请求封装
- ✅ 通用工具函数
- ✅ 组合式函数
- ✅ 类型定义
- ✅ ESLint + Prettier 代码规范
- ✅ 开发环境热重载

## 开发规范

- 使用 Composition API 编写组件
- 遵循 TypeScript 类型约束
- 使用 Pinia 管理全局状态
- 组件命名使用 PascalCase
- 文件命名使用 kebab-case
- 提交代码前运行 lint 检查
