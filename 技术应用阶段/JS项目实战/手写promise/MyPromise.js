class MyPromise {
  constructor(executor) {
    this.state = "pending"; // pending, fulfilled, rejected
    this.value = undefined; // 成功的值
    this.reason = undefined; // 失败的原因
    this.onFulfilledCallbacks = []; // 存放成功的回调
    this.onRejectedCallbacks = []; // 存放失败的回调

    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };

    const reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    return new MyPromise((resolve, reject) => {
      if (this.state === "fulfilled") {
        resolve(onFulfilled(this.value));
      } else if (this.state === "rejected") {
        reject(onRejected(this.reason));
      } else {
        this.onFulfilledCallbacks.push(() => {
          resolve(onFulfilled(this.value));
        });
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

// test
const errorCode = 1002;
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    if (errorCode === 1001) {
      reject("error1001");
    }
    resolve("success");
  }, 1000);
});

promise
  .then(
    (res) => {
      console.log(res);
      return "Next Step";
    },
    (err) => {
      console.log(err);
    }
  )
  .then(
    (res) => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    }
  )
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    console.log("Done");
  });
// 1 秒后输出 success
// success
// undefined
