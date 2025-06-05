# CSS 核心概念

## CSS盒子模型

网页布局的核心概念，它将每个HTML元素视为一个矩形盒子，包含内容、内边距、边框和外边距。

### 盒模型类型

1. **标准盒模型（content-box）**

   ```css
   .box {
     box-sizing: content-box; /* 默认值 */
     width: 200px;
     padding: 20px;
     border: 1px solid #000;
     /* 实际宽度 = 200px + 40px(padding) + 2px(border) = 242px */
   }
   ```

2. **IE 盒模型（border-box）**
   ```css
   .box {
     box-sizing: border-box;
     width: 200px;
     padding: 20px;
     border: 1px solid #000;
     /* 实际宽度 = 200px（包含padding和border） */
   }
   ```

### 最佳实践

通常建议在全局样式中设置：

```css
* {
  box-sizing: border-box;
}
```

## CSS布局方式

### 1. 文档流

默认布局方式，块级元素垂直排列，行内元素水平排列。

```css
/* 块级元素 */
div {
  display: block;
  width: 100%;
  margin-bottom: 10px;
}

/* 行内元素 */
span {
  display: inline;
  /* width 和 height 不生效 */
}

/* 行内块元素 */
.inline-block {
  display: inline-block;
  /* 既可以设置宽高，又不会换行 */
  width: 100px;
  height: 100px;
}
```

### 2. 浮动

元素脱离文档流水平排列，常用于多栏布局。

```css
/* 基本浮动 */
.float-left {
  float: left;
  width: 50%;
}

/* 清除浮动（解决高度塌陷） */
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}
```

### 3. 定位

元素脱离文档流，根据不同定位方式确定位置。

```css
/* 相对定位 */
.relative {
  position: relative;
  top: 20px;
  left: 20px;
}

/* 绝对定位 */
.absolute {
  position: absolute;
  top: 0;
  right: 0;
}

/* 固定定位 */
.fixed {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

/* 粘性定位 */
.sticky {
  position: sticky;
  top: 0;
  /* 滚动到顶部时固定 */
}
```

### 4. Flex布局

通过 `display: flex` 定义弹性容器，实现灵活的一维布局。

### 5. Grid布局

二维布局模型，适合复杂网格结构：

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 20px;
}
```

## Flex布局详解

### 父元素（Flex 容器）属性

1. `display: flex`

   ```css
   .container {
     display: flex; /* 或 inline-flex */
   }
   ```

2. `flex-direction`

   ```css
   .container {
     flex-direction: row | row-reverse | column | column-reverse;
   }
   ```

3. `flex-wrap`

   ```css
   .container {
     flex-wrap: nowrap | wrap | wrap-reverse;
   }
   ```

4. `justify-content`

   ```css
   .container {
     justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
   }
   ```

5. `align-items`

   ```css
   .container {
     align-items: stretch | flex-start | flex-end | center | baseline;
   }
   ```

6. `align-content`

   ```css
   .container {
     align-content: flex-start | flex-end | center | space-between | space-around | stretch;
   }
   ```

7. `gap`
   ```css
   .container {
     gap: 20px; /* 行列间距相同 */
     gap: 20px 10px; /* 行间距 列间距 */
   }
   ```

### 子元素（Flex 项目）属性

1. `flex`

   ```css
   .item {
     flex: 1; /* flex-grow: 1, flex-shrink: 1, flex-basis: 0% */
     flex: 0 1 auto; /* 不放大，允许缩小，自动基准尺寸 */
     flex: 2 0 200px; /* 放大比例2，不缩小，基准尺寸200px */
   }
   ```

2. `align-self`

   ```css
   .item {
     align-self: auto | flex-start | flex-end | center | baseline | stretch;
   }
   ```

3. `order`
   ```css
   .item {
     order: 1; /* 默认为0，数值越小越靠前 */
   }
   ```

## 水平/垂直居中实现方式

1. **Flex方式一**：最常用的现代方案

   ```css
   .parent {
     display: flex;
     align-items: center; /* 垂直居中 */
     justify-content: center; /* 水平居中 */
     min-height: 100vh; /* 视口高度 */
   }
   ```

2. **Flex方式二**：使用margin: auto

   ```css
   .parent {
     display: flex;
     min-height: 100vh;
   }
   .child {
     margin: auto; /* 自动分配剩余空间 */
   }
   ```

3. **绝对定位方式**：兼容性最好

   ```css
   .parent {
     position: relative;
     height: 100vh;
   }
   .child {
     position: absolute;
     left: 50%;
     top: 50%;
     transform: translate(-50%, -50%);
   }
   ```

4. **Grid方式一**：现代网格布局

   ```css
   .parent {
     display: grid;
     place-items: center; /* align-items + justify-items */
     min-height: 100vh;
   }
   ```

5. **Grid方式二**：使用margin: auto
   ```css
   .parent {
     display: grid;
     min-height: 100vh;
   }
   .child {
     margin: auto;
   }
   ```

## CSS类名重复问题解决方案

1. **BEM命名法**

   ```css
   /* Block */
   .card {
   }

   /* Element */
   .card__title {
   }
   .card__content {
   }

   /* Modifier */
   .card--featured {
   }
   .card__title--large {
   }
   ```

2. **原子化CSS**

   ```css
   /* 工具类 */
   .mt-4 {
     margin-top: 1rem;
   }
   .p-4 {
     padding: 1rem;
   }
   .flex {
     display: flex;
   }
   .items-center {
     align-items: center;
   }
   ```

3. **CSS预处理器**

   ```scss
   // SCSS示例
   .card {
     &__title {
       font-size: 1.5rem;

       &--large {
         font-size: 2rem;
       }
     }

     &__content {
       padding: 1rem;
     }
   }
   ```

4. **CSS Modules**

   ```jsx
   // React组件示例
   import styles from './Card.module.css'

   function Card() {
     return (
       <div className={styles.card}>
         <h2 className={styles.title}>标题</h2>
       </div>
     )
   }
   ```

5. **CSS-in-JS**
   ```jsx
   // Styled-components示例
   const Card = styled.div`
     padding: 1rem;
     border: 1px solid #ddd;

     &:hover {
       box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
     }
   `
   ```

## margin重叠

### 现象

在垂直方向上，两个相邻元素的外边距会取其中较大的外边距值，形成重叠。

### 发生场景

1. **相邻兄弟元素重叠**

   ```css
   .box1 {
     margin-bottom: 20px;
   }
   .box2 {
     margin-top: 30px;
   }
   /* 实际间距为30px，而不是50px */
   ```

2. **父元素与子元素重叠**
   ```css
   .parent {
     margin-top: 20px;
   }
   .child {
     margin-top: 30px;
   }
   /* margin-top会重叠，取较大值30px */
   ```

### 解决方案

1. **触发BFC**

   ```css
   .container {
     overflow: hidden; /* 或 auto */
     /* 其他触发BFC的方式 */
   }
   ```

2. **使用padding代替margin**

   ```css
   .box {
     padding-top: 20px;
     /* 而不是 margin-top: 20px */
   }
   ```

3. **添加边框或内边距**
   ```css
   .parent {
     border-top: 1px solid transparent;
     /* 或 */
     padding-top: 1px;
   }
   ```

## BFC（块级格式化上下文）

### 概念

BFC（Block Formatting Context）是一种独立渲染区域规则，决定了块级元素的布局方式及其内部元素与外部元素的关系。就像一个隔离的容器，内部元素的布局不会影响外部，反之亦然。

### 触发条件

```css
/* 1. 根元素 <html> */

/* 2. 浮动元素 */
.bfc {
  float: left | right;
}

/* 3. 绝对定位元素 */
.bfc {
  position: absolute | fixed;
}

/* 4. display 特殊值 */
.bfc {
  display: inline-block | flex | grid | table-cell;
}

/* 5. overflow 不为 visible */
.bfc {
  overflow: hidden | auto | scroll;
}
```

### 应用场景

1. **清除浮动**

   ```css
   .container {
     overflow: hidden; /* 创建BFC */
   }
   .float {
     float: left;
   }
   ```

2. **防止margin重叠**

   ```css
   .wrapper {
     overflow: hidden; /* 创建BFC */
     margin-top: 20px;
   }
   ```

3. **自适应两栏布局**
   ```css
   .float {
     float: left;
     width: 200px;
   }
   .content {
     overflow: hidden; /* 创建BFC，不会与浮动元素重叠 */
   }
   ```

### 注意事项

1. BFC区域不会与浮动元素重叠
2. BFC区域内的外边距不会与外部发生重叠
3. 计算BFC高度时会包含内部浮动元素
4. BFC是页面中一个独立的容器，内外元素不会相互影响
