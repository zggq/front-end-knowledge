# JavaScript 核心概念

## 基本数据类型

JavaScript 有以下七种基本数据类型：

1. **Undefined**：表示变量已声明但未初始化赋值

   - 例如：`let a;` 的默认值

2. **Null**：表示空对象指针

   - 常用于主动清空变量引用
   - 注意：`typeof null` 返回 "object" 是历史遗留问题

3. **Boolean**：布尔类型

   - 仅有两个值：`true` 和 `false`

4. **Number**：数字类型

   - 包含整数、浮点数
   - 特殊值：`Infinity`、`-Infinity`、`NaN`
   - 注意：`NaN` 表示无效数值，且 `NaN !== NaN`

5. **String**：字符串类型

   - 通过单引号或双引号定义的文本

6. **Symbol**（ES6+）

   - 唯一且不可变的标识符
   - 常用于对象属性的键

7. **BigInt**（ES2020+）
   - 用于表示超出 Number 范围的大整数
   - 以 `n` 结尾

## 类型转换

类型转换分为两种：

### 显式转换（主动）

```javascript
String(value) // 转换为字符串
value.toString() // 转换为字符串
Number(value) // 转换为数字
parseInt(str, radix) // 按指定进制转换为整数
Boolean(value) // 转换为布尔值
```

### 隐式转换（自动）

1. 算术运算符：

   - `+`：若任一操作数为字符串，则执行字符串拼接
   - `-`、`*`、`/`：将非数值转换为数字

2. 逻辑判断：
   - `if (value)`：value 自动转换为布尔值
   - `==` 会触发类型转换，`===` 不会

## this 指向规则

this 的指向由函数的**调用方式**决定，而非定义位置。其行为遵循以下核心规则：

1. **默认绑定**（全局环境）

   - 非严格模式：this 指向全局对象（浏览器中为 window，Node.js 中为 global）
   - 严格模式：this 为 undefined

2. **隐式绑定**（对象方法调用）

   - 函数作为对象方法调用时，this 指向调用该方法的对象

3. **显式绑定**

   - `call`：立即执行函数并绑定 this，接收多个参数
   - `apply`：立即执行函数并绑定 this，接收数组或类数组作为参数
   - `bind`：返回一个永久绑定 this 的新函数

4. **构造函数绑定**

   - 使用 `new` 调用构造函数时，this 指向新创建的实例对象

5. **箭头函数绑定**
   - 箭头函数继承外层作用域的 this
   - 无法通过显式绑定修改

## 箭头函数

箭头函数是 ES6 增加的简写语法，用于创建匿名函数。它使用箭头（=>）来指示函数体，并省略了 function 关键字和 return 关键字。

### 特点

1. **隐式返回值**

   - 如果函数只有一条语句，箭头函数会自动将其结果返回

2. **没有自己的 this 关键字**
   - this 是在定义时确定的，而不是在函数调用时确定的
   - 避免了在作用域中引入新的 this 绑定

### 适用场景

1. **回调函数**

   ```javascript
   // 传统写法
   button.addEventListener('click', function () {
     console.log('Clicked')
   })

   // 箭头函数写法
   button.addEventListener('click', () => {
     console.log('Clicked')
   })
   ```

2. **简单的函数表达式**

   ```javascript
   // 传统写法
   const double = function (x) {
     return x * 2
   }

   // 箭头函数写法
   const double = (x) => x * 2
   ```

3. **函数作为参数**

   ```javascript
   // 传统写法
   const numbers = [1, 2, 3].map(function (n) {
     return n * 2
   })

   // 箭头函数写法
   const numbers = [1, 2, 3].map((n) => n * 2)
   ```

## 原型和原型链

### 原型（Prototype）

每一个对象都有一个 `prototype` 属性，指向它的原型对象。原型对象包含了可以被该对象继承的属性和方法。

### 原型链

原型链是 JavaScript 实现对象继承的机制：

1. 每个对象都有一个原型
2. 原型对象也有自己的原型
3. 这样形成了一条"链"，即原型链

属性/方法查找规则：

1. 首先查找对象自身
2. 如果没有，查找对象的原型
3. 如果还没有，查找原型的原型
4. 依此类推直到：
   - 找到该属性/方法
   - 到达原型链顶端（Object.prototype）返回 undefined

## Promise

Promise 是一个构造函数，用于处理异步操作。

### 基本概念

1. **状态**

   - pending：初始状态
   - fulfilled：操作成功
   - rejected：操作失败
   - 状态只能由 pending 转变为 fulfilled 或 rejected
   - 状态一经改变，无法再被改变

2. **执行顺序**
   - 创建 Promise 实例时，executor 函数立即执行
   - then、catch 等方法的回调函数推入微任务队列
   - 等待主线程同步代码执行完毕后触发

### 基础方法

1. **then()**

   - 接收成功回调（onFulfilled）和失败回调（onRejected）
   - 返回新 Promise 以实现链式调用

2. **catch()**

   - 捕获链式调用中的错误
   - 等同于 then(null, onRejected)

3. **finally()**
   - 无论成功或失败均执行
   - 常用于清理资源

### 并发操作

1. **Promise.all()**

   ```javascript
   Promise.all([promise1, promise2])
     .then((results) => console.log(results))
     .catch((error) => console.error(error))
   ```

   - 所有 Promise 成功时返回结果数组
   - 任一失败则整体失败

2. **Promise.race()**

   - 返回第一个完成的 Promise（无论成功或失败）

3. **Promise.allSettled()**

   - 等待所有 Promise 完成
   - 返回状态和结果数组

4. **Promise.any()**
   - 返回第一个成功的 Promise
   - 全部失败则报错

## Async/Await

Async/Await 是 ES7 提出的异步终极解决方案。

### async

- 声明一个函数为异步函数
- 强制返回 Promise 对象
- 即使返回非 Promise 值，也会被自动包装为 resolved 的 Promise

### await

- 只能在 async 函数内使用
- 暂停代码执行（通过微任务队列实现）
- 等待右侧的 Promise 完成
- 返回结果值或抛出异常

### 最佳实践

在复杂异步场景中混合使用 Promise 和 Async/Await：

- 并发任务用 Promise
- 顺序逻辑用 Async/Await

```javascript
async function example() {
  // 并发请求
  const [result1, result2] = await Promise.all([fetch('/api/1'), fetch('/api/2')])

  // 顺序处理
  const data1 = await result1.json()
  const data2 = await result2.json()

  return { data1, data2 }
}
```

## 事件循环（Event Loop）

事件循环是 JavaScript 实现异步任务处理的核心机制。

### 执行过程

1. **执行同步代码**

   - 主线程按顺序处理同步任务

2. **处理微任务队列**

   - 同步代码执行完毕后
   - 立即执行所有微任务（如 Promise.then、process.nextTick）
   - 直到队列清空

3. **执行宏任务**
   - 从宏任务队列（如 setTimeout、I/O 操作）中取出一个任务执行
   - 完成后再次检查微任务队列
   - 重复此循环

### 微任务队列特点

1. **高优先级**

   - 微任务在当前宏任务结束后立即执行
   - 优先级高于宏任务
   - 可用 process.nextTick 确保操作在渲染前完成

2. **批量执行**

   - 每次循环一次性处理所有微任务
   - 新产生的微任务也会继续处理
   - 用于框架中的批量状态更新

3. **不可中断**
   - 微任务执行过程中不会插入其他任务
   - 任务过重可能导致页面卡顿

### 注意事项

1. 避免在同步代码中操作异步数据
2. 耗时同步任务需拆分为小块
3. 独立异步任务使用 Promise.all 并发执行
4. 使用 .catch() 或 try/catch 捕获异步错误

## ES6 新特性

### 1. const 和 let

- 存在暂时性死区，不存在变量提升
- 禁止重复声明
- 不会成为全局对象属性

### 2. 模板字符串

```javascript
const name = 'World'
console.log(`Hello ${name}!`)
```

### 3. 箭头函数

```javascript
const add = (a, b) => a + b
```

### 4. 函数参数默认值

```javascript
function greet(name = 'Guest') {
  return `Hello ${name}!`
}
```

### 5. 解构赋值

```javascript
const [a, b] = [1, 2]
const { name, age } = person
```

### 6. for...of 和 for...in

- for...of：遍历可迭代对象的值
- for...in：遍历对象的可枚举属性

### 7. Promise

- 解决回调地狱
- 管理异步操作

### 8. 展开运算符

```javascript
const arr = [...[1, 2, 3], 4, 5]
const obj = { ...baseObj, newProp: 'value' }
```

### 9. 对象字面量增强

```javascript
const name = 'John'
const obj = {
  name,
  sayHi() {
    console.log(`Hi ${this.name}!`)
  },
}
```

### 10. class

- 原型链的语法糖
- 更清晰的面向对象编程语法

## 闭包

闭包是函数和其外部作用域的组合，允许内部函数访问外部函数的作用域变量。

### 作用

1. **封装私有变量**

   ```javascript
   function createCounter() {
     let count = 0
     return {
       increment() {
         count++
       },
       getCount() {
         return count
       },
     }
   }
   ```

2. **实现函数记忆**

   ```javascript
   function memoize(fn) {
     const cache = {}
     return function (...args) {
       const key = JSON.stringify(args)
       return cache[key] || (cache[key] = fn.apply(this, args))
     }
   }
   ```

3. **创建模块**

   - 模拟私有变量和方法
   - 实现模块化编程

4. **独立作用域**
   - 避免全局污染

### 缺点

1. **内存泄漏风险**

   - 闭包长期持有外部变量引用
   - 变量可能无法被垃圾回收

2. **内存占用**

   - 大量闭包可能占用较多内存
   - 避免在循环中滥用

3. **可读性问题**
   - 滥用闭包可能导致代码可读性下降
   - 建议仅在必要时使用

## 浅拷贝与深拷贝

### 浅拷贝

- 仅复制对象的第一层属性
- 基本类型：直接复制值
- 引用类型：复制内存地址，新旧对象共享同一块内存

### 深拷贝

- 递归复制对象的所有层级属性
- 新旧对象互不影响

## Map 与 Object 的区别

### 键的类型

- **Object**：仅支持字符串、数字或 Symbol
- **Map**：支持任意类型

### Map 优势

1. 对频繁增删键值对的场景性能更优
2. 结构更轻量，无原型链污染
3. 内置方法更丰富
4. 支持 for...of 和 forEach 迭代
5. 迭代顺序可预测

## Map 与 WeakMap 的区别

### 1. 键类型

- **Map**：任意类型
- **WeakMap**：仅对象或非全局 Symbol

### 2. 引用机制

- **Map**：强引用
- **WeakMap**：弱引用（不阻止键对象被回收）

### 3. 可枚举性

- **Map**：支持 keys()、values() 等遍历方法
- **WeakMap**：无遍历方法，不可枚举

### 4. 内存泄漏风险

- **Map**：高（需手动删除键值对）
- **WeakMap**：低（自动清理无引用的键值对）

注意：Vue3 的 reactive 函数通过 WeakMap 实现了响应式代理的唯一性和内存安全。
