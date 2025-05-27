# 前端面试库 - 前端开发经验分享平台

一个专注于前端开发经验分享的静态网站，包含面试经验和技术八股文等内容。

## 🚀 功能特性

- **面试经验分享**: 真实的面试经历、技术问答、面试技巧
- **八股文库**: 前端核心知识点整理，涵盖JavaScript、Vue、CSS等
- **Markdown渲染**: 支持代码高亮、表格、列表等丰富格式
- **响应式设计**: 适配桌面端和移动端
- **左右布局**: 左侧目录导航，右侧内容展示

## 🛠️ 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - JavaScript 的超集，提供静态类型检查
- **Pinia** - Vue 的状态管理库
- **Vue Router** - Vue.js 官方路由管理器
- **Vite** - 下一代前端构建工具
- **Marked** - Markdown 解析器
- **Highlight.js** - 代码语法高亮
- **ESLint + Prettier** - 代码质量和格式化工具

## 📁 项目结构

```
src/
├── api/                    # API 接口
├── components/             # 组件
│   ├── common/            # 通用组件
│   │   └── ContentViewer.vue  # 内容展示组件
│   └── layout/            # 布局组件
│       └── AppHeader.vue  # 头部导航
├── composables/           # 组合式函数
├── router/                # 路由配置
├── stores/                # Pinia 状态管理
├── types/                 # TypeScript 类型定义
├── utils/                 # 工具函数
│   └── markdown.ts        # Markdown 处理工具
├── views/                 # 页面组件
│   ├── HomeView.vue       # 首页
│   ├── InterviewView.vue  # 面试经验页
│   ├── KnowledgeView.vue  # 八股文库页
│   └── AboutView.vue      # 关于页面
├── App.vue                # 根组件
└── main.ts                # 入口文件

public/
└── content/               # Markdown 文件存储
    ├── interview/         # 面试经验文件
    └── knowledge/         # 八股文文件
```

## 🚀 开始使用

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

## 📝 添加内容

### 添加面试经验

1. 在 `public/content/interview/` 目录下创建 `.md` 文件
2. 在 `src/utils/markdown.ts` 的 `fileMap.interview` 数组中添加文件名

### 添加八股文

1. 在 `public/content/knowledge/` 目录下创建 `.md` 文件
2. 在 `src/utils/markdown.ts` 的 `fileMap.knowledge` 数组中添加文件名

### Markdown 文件格式

```markdown
# 标题

## 二级标题

### 三级标题

正文内容...

```javascript
// 代码示例
function example() {
  console.log('Hello World');
}
```

- 列表项1
- 列表项2

**粗体文本**

[链接文本](https://example.com)
```

## 🎨 自定义样式

项目使用了完整的 Markdown 样式系统，包括：

- 代码高亮（使用 highlight.js）
- 表格样式
- 引用块样式
- 列表样式
- 链接样式

可以在 `src/components/common/ContentViewer.vue` 中修改样式。

## 📱 响应式设计

- 桌面端：左侧固定目录，右侧内容区域
- 移动端：目录和内容垂直排列

## 🔧 配置说明

### 环境变量

复制 `.env.example` 文件为 `.env` 并根据需要修改配置：

```bash
cp .env.example .env
```

### 路由配置

在 `src/router/index.ts` 中配置路由：

```typescript
{
  path: '/new-section',
  name: 'newSection',
  component: () => import('../views/NewSectionView.vue'),
}
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Marked](https://marked.js.org/) - Markdown 解析器
- [Highlight.js](https://highlightjs.org/) - 代码语法高亮
