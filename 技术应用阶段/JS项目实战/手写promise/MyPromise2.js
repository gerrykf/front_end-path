class MyPromise2 {
  // 构造函数 接受一个执行器函数
  constructor(executor) {
    // 初始化状态为pending
    this.state = "pending";
    // 初始化成功的值
    this.value = undefined;
    // 初始化失败的原因
    this.reason = undefined;
    // 初始化成功的回调
    this.onFilfulledCallbacks = [];
    // 初始化失败的回调
    this.onRejectedCallbacks = [];

    // 定义resolve函数
    const resolve = (value) => {
      // 如果状态为pending
      if (this.state === "pending") {
        // 修改状态为fulfilled
        this.state = "fulfilled";
        // 修改成功的值
        this.value = value;
        // 执行成功的回调
        this.onFilfulledCallbacks.forEach((fn) => fn());
      }
    };

    // 定义reject函数
    const reject = (reason) => {
      // 如果状态为pending
      if (this.state === "pending") {
        // 修改状态为rejected
        this.state = "rejected";
        // 修改失败的原因
        this.reason = reason;
        // 执行失败的回调
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    // 执行执行器函数
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    // 如果onFulfilled不是函数，就返回一个函数，返回值为value
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    // 如果onRejected不是函数，就返回一个函数，返回值为reason
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };
    // 返回一个新的Promise 这是链式调用的关键
    return new MyPromise2((resolve, reject) => {
      // 如果状态为fulfilled
      if (this.state === "fulfilled") {
        // 执行成功的回调
        resolve(onFulfilled(this.value));
      } else if (this.state === "rejected") {
        // 如果状态为rejected
        // 执行失败的回调
        reject(onRejected(this.reason));
      } else {
        // 如果状态为pending
        // 存放成功的回调
        this.onFilfulledCallbacks.push(() => {
          resolve(onFulfilled(this.value));
        });
        // 存放失败的回调
        this.onRejectedCallbacks.push(() => {
          reject(onRejected(this.reason));
        });
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(callback) {
    return this.then(
      (value) => {
        callback();
        return value;
      },
      (reason) => {
        callback();
        throw reason;
      }
    );
  }
}

// 实战情况下的Promise
const res = {
  errorCode: 0,
  data: { name: "张三", age: 18 },
};

const { errorCode, data } = res;

const promise = new MyPromise2((resolve, reject) => {
  if (errorCode) {
    reject(errorCode);
  }

  resolve(data);
});

promise
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("error-", err);
  })
  .finally(() => {
    console.log("Done");
  });
// 输出：{ name: '张三', age: 18 }
// Done
