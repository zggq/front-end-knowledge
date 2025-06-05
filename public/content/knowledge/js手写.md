# JavaScript手写实现集合

## instanceof实现

```javascript
function myInstanceOf(obj, constructor) {
  // 获取对象的原型
  let prototype = Object.getPrototypeOf(obj)
  // 循环查找原型链
  while (prototype) {
    // 如果当前原型等于构造函数的 prototype，说明 obj 是 constructor 的实例
    if (prototype === constructor.prototype) {
      return true
    }
    // 向上查找原型链
    prototype = Object.getPrototypeOf(prototype)
  }
  // 如果没有找到，返回 false
  return false
}
```

## Promise.allSettled实现

```javascript
function myPromiseallsettled(arr) {
  return Promise.all(arr.map((item) => item.catch((e) => e)))
}
```

## Promise.all实现

```javascript
function myPromiseAll(iterable) {
  return new Promise((resolve, reject) => {
    // 参数必须是可迭代对象
    if (iterable == null || typeof iterable[Symbol.iterator] !== 'function') {
      reject(new TypeError('argument is not iterable'))
      return
    }
    const promises = Array.from(iterable)
    let length = promises.length
    const results = new Array(length)
    promises.forEach((item, index) => {
      Promise.resolve(item).then(
        (value) => {
          results[index] = value
          length -= 1
          if (length <= 0) {
            resolve(results)
          }
        },
        (reason) => {
          reject(reason)
        },
      )
    })
  })
}
```

## 洗牌算法

```javascript
const shuffle = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const randomIndex = Math.floor(i + Math.random() * (arr.length - i))
    ;[arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]
  }
  return arr
}
```

## 防抖函数实现

### 基础版本

```javascript
function debounce(fn, delay) {
  let timer = null
  const _debounce = function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
  return _debounce
}
```

### 进阶版本（支持立即执行）

```javascript
function debounce(fn, delay, immediate = false) {
  let timer = null
  let isInvoke = false
  const _debounce = function (...args) {
    if (timer) clearTimeout(timer)
    if (immediate && !isInvoke) {
      fn.apply(this, args)
      isInvoke = true
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args)
        isInvoke = false
      }, delay)
    }
  }
  return _debounce
}
```

## 节流函数实现

### 时间戳版本

```javascript
function throttle(fn, delay) {
  let last = 0
  const _throttle = function (...args) {
    const now = new Date().getTime()
    if (now - last >= delay) {
      fn.apply(this, args)
      last = now
    }
  }
  return _throttle
}
```

### 定时器版本

```javascript
function throttle(func, wait) {
  let waiting = false
  let lastArgs = null
  return function (...args) {
    if (!waiting) {
      func.apply(this, args)
      waiting = true
      let timeout = () =>
        setTimeout(() => {
          waiting = false
          if (lastArgs) {
            func.apply(this, lastArgs)
            waiting = true
            lastArgs = null
            timeout()
          }
        }, wait)
      timeout()
    } else {
      lastArgs = args
    }
  }
}
```

## 大数相加

```javascript
const getBigInt = (a, b) => {
  a = a + ''
  b = b + ''
  let i = a.length - 1
  let j = b.length - 1
  let curry = 0
  const res = []
  while (i >= 0 || j >= 0 || curry !== 0) {
    let left = i >= 0 ? Number(a[i]) : 0
    let right = j >= 0 ? Number(b[j]) : 0
    let result = left + right + curry
    res.push(result % 10)
    curry = Math.floor(result / 10)
    i--
    j--
  }
  return res.reverse().join('')
}
```

## new操作符实现

```javascript
function myNew(Constructor, ...args) {
  // 强化类型检查（包括箭头函数的检测）
  if (typeof Constructor !== 'function' || !Constructor.prototype) {
    throw new TypeError(`${Constructor} is not a constructor`)
  }
  // 更规范的原型链设置方式
  const instance = Object.create(Constructor.prototype)
  // 执行构造函数并处理返回值
  const result = Constructor.apply(instance, args)
  // 根据 ECMAScript 规范处理返回值
  return result instanceof Object ? result : instance
}
```
