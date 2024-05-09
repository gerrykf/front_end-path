# this 的指向

## 这是啥？

> 这表示 this

- 在全局代码中使用 this，指代全局对象

  > 在真实的开发中，很少在全局代码中使用 this.

- 在函数中使用 this，它的指向完全取决于函数是如何被调用的

```ts
调用方式            示例                函数中的 this 指向
1.通过 new 调用       new method()        新对象
2.直接调用            method()            全局对象
3.通过对象调用        obj.method()        .前面的对象
4.call               method.call(ctx)    call的第一个参数
5.apply              method.apply(ctx)   apply的第一个参数
```

1. 通过 new 调用

   ```js
   function User(a, b) {
     // 隐式代码 : this = {};
     this.a = a;
     this.b = b;
     console.log(this);
   }
   new User(1, 2); //{a:1,b2} this 等于一个新的对象
   ```

2. 直接调用

   ```js
   function method() {
     console.log(this); // Window:{...}  直接调用函数  this指向的全局对象
   }
   method();
   ```

3. 通过对象调用

   ```js
   // 示例1
   var obj = {
     a: 1,
     b: 2,
     m: function () {
       console.log(this); // 通过对象调用 this指向这个对象 {a:1,b:2,m:Function}
     },
   };

   obj.m();

   // 示例2
   var obj = {
     a: 1,
     b: 2,
     m: function () {
       console.log(this); // this指向到全局对象
     },
   };

   var method2 = obj.m; // 这里将m函数的引用赋值到method2
   method2();
   ```

4. call

   ```js
   function method(a, b) {
     console.log(this, a, b);
   }
   var obj = {};
   method.call(obj, 1, 2);
   ```

5. apply

   ```js
   1. call
   function method(a, b) {
    console.log(this, a, b);
   }
   var obj = {};
   method.apply(obj, 1, 2);
   ```

> 这个两个函数都是自定义函数后,函数中自带的
