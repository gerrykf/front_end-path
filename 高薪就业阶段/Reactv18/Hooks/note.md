## useEffct

useEffct 包含以下知识点:

- 副作用的概念

  - 纯函数

    ```js
    function pureFunction() {
      return 1 + 1;
    }
    ```

  - 副作用

    ```js
    function sideEffect() {
      console.log("side effect");
      // 有耗时操作
      setTimeout(() => {
        console.log("side effect");
      }, 1000);
    }
    ```

  - 执行清理操作

    - 返回一个函数，清理副作用
    - 先执行副作用，再执行清理操作

    ```js
    useEffect(() => {
      console.log("useEffect");
      return () => {
        console.log("clear");
      };
    }, []);
    ```

  - 副作用的依赖

    - 依赖项发生变化时，执行清理操作

    ```js
    useEffect(() => {
      console.log("useEffect");
    }, [count]);
    ```

- useEffect 的执行时机

  1. 渲染后执行
  2. 依赖项发生变化时执行
  3. 组件卸载时执行清理操作
  4. 修改状态会触发重新渲染 -> 执行 useEffect -> 清理操作

- useEffect 的基本使用

  ```js
  useEffect(() => {
    console.log("useEffect");
  }, []);
  ```

## 自定义 Hook

本质是自定义函数引用了 hook 去拆分比较大的业务逻辑

```js
function useCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("useEffect");
  }, [count]);
  return [count, setCount];
}
```
