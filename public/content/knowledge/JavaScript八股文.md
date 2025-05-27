# JavaScript八股文

## 基础概念

### 1. 数据类型

#### 基本数据类型
- **Number**: 数字类型
- **String**: 字符串类型
- **Boolean**: 布尔类型
- **Undefined**: 未定义
- **Null**: 空值
- **Symbol**: 符号类型 (ES6)
- **BigInt**: 大整数类型 (ES2020)

#### 引用数据类型
- **Object**: 对象类型
- **Array**: 数组类型
- **Function**: 函数类型

### 2. 类型检测

```javascript
// typeof 操作符
typeof 123          // "number"
typeof "hello"      // "string"
typeof true         // "boolean"
typeof undefined    // "undefined"
typeof null         // "object" (历史遗留问题)
typeof {}           // "object"
typeof []           // "object"
typeof function(){} // "function"

// instanceof 操作符
[] instanceof Array        // true
{} instanceof Object       // true
function(){} instanceof Function // true

// Object.prototype.toString
Object.prototype.toString.call([])        // "[object Array]"
Object.prototype.toString.call({})        // "[object Object]"
Object.prototype.toString.call(null)      // "[object Null]"
```

### 3. 类型转换

#### 隐式类型转换
```javascript
// 字符串转换
1 + "2"        // "12"
true + "test"  // "truetest"

// 数字转换
"3" - 1        // 2
"3" * "2"      // 6
true + 1       // 2

// 布尔转换
if ("") {}           // false
if ("hello") {}      // true
if (0) {}            // false
if (1) {}            // true
```

## 作用域与闭包

### 1. 作用域链

```javascript
var a = 1;

function outer() {
  var b = 2;
  
  function inner() {
    var c = 3;
    console.log(a, b, c); // 1 2 3
  }
  
  inner();
}

outer();
```

### 2. 闭包

```javascript
// 经典闭包示例
function createCounter() {
  let count = 0;
  
  return {
    increment() {
      return ++count;
    },
    decrement() {
      return --count;
    },
    getCount() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
```

### 3. 立即执行函数 (IIFE)

```javascript
(function() {
  var privateVar = "私有变量";
  
  window.myModule = {
    publicMethod() {
      return privateVar;
    }
  };
})();
```

## 原型与继承

### 1. 原型链

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  console.log(`Hello, I'm ${this.name}`);
};

const person = new Person("张三");
person.sayHello(); // "Hello, I'm 张三"

// 原型链查找
console.log(person.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
```

### 2. 继承实现

#### 原型链继承
```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(`${this.name} makes a sound`);
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  console.log(`${this.name} barks`);
};
```

#### ES6 Class继承
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  
  bark() {
    console.log(`${this.name} barks`);
  }
}
```

## 异步编程

### 1. 回调函数

```javascript
function fetchData(callback) {
  setTimeout(() => {
    const data = { id: 1, name: "用户数据" };
    callback(null, data);
  }, 1000);
}

fetchData((error, data) => {
  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
});
```

### 2. Promise

```javascript
// Promise基本用法
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = Math.random() > 0.5;
    if (success) {
      resolve("操作成功");
    } else {
      reject("操作失败");
    }
  }, 1000);
});

promise
  .then(result => console.log(result))
  .catch(error => console.error(error));

// Promise链式调用
fetch('/api/user')
  .then(response => response.json())
  .then(user => fetch(`/api/posts/${user.id}`))
  .then(response => response.json())
  .then(posts => console.log(posts))
  .catch(error => console.error(error));
```

### 3. async/await

```javascript
async function fetchUserPosts(userId) {
  try {
    const userResponse = await fetch(`/api/user/${userId}`);
    const user = await userResponse.json();
    
    const postsResponse = await fetch(`/api/posts/${user.id}`);
    const posts = await postsResponse.json();
    
    return posts;
  } catch (error) {
    console.error('获取用户文章失败:', error);
    throw error;
  }
}

// 使用
fetchUserPosts(1)
  .then(posts => console.log(posts))
  .catch(error => console.error(error));
```

## 事件循环

### 1. 执行栈与任务队列

```javascript
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

console.log('4');

// 输出顺序: 1, 4, 3, 2
```

### 2. 宏任务与微任务

```javascript
// 宏任务: setTimeout, setInterval, I/O操作
// 微任务: Promise.then, queueMicrotask, MutationObserver

console.log('start');

setTimeout(() => {
  console.log('timeout1');
  Promise.resolve().then(() => {
    console.log('promise1');
  });
}, 0);

setTimeout(() => {
  console.log('timeout2');
}, 0);

Promise.resolve().then(() => {
  console.log('promise2');
});

console.log('end');

// 输出: start, end, promise2, timeout1, promise1, timeout2
```

## 常见面试题

### 1. 防抖与节流

```javascript
// 防抖
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 节流
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
```

### 2. 深拷贝

```javascript
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (typeof obj !== "object") return obj;
  
  if (hash.get(obj)) return hash.get(obj);
  
  let cloneObj = new obj.constructor();
  hash.set(obj, cloneObj);
  
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  
  return cloneObj;
}
```

### 3. 手写bind

```javascript
Function.prototype.myBind = function(context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('调用者必须是函数');
  }
  
  const fn = this;
  
  return function boundFunction(...newArgs) {
    if (new.target) {
      return new fn(...args, ...newArgs);
    }
    return fn.apply(context, [...args, ...newArgs]);
  };
};
```

## 总结

JavaScript的核心概念包括数据类型、作用域、原型链、异步编程等。掌握这些基础知识对于前端开发至关重要。在面试中，不仅要能回答概念性问题，还要能够手写相关代码实现。 