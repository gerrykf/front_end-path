import "./App.css";
import { useEffect, useState } from "react";

function App() {
  let [count, setCount] = useState(0);
  let [count2, setCount2] = useState(0);

  // useEffect(() => {
  //   // 副作用函数
  //   const stopTimer = setInterval(() => {
  //     console.log("setInterval");
  //   }, 1000);

  //   // 清除副作用:
  //   // 1. 组件卸载时清除副作用
  //   // 2. 依赖项变化时清除副作用

  //   return () => {
  //     stopTimer && clearInterval(stopTimer);
  //   };
  // });

  /**
   * 未传递依赖项时，每次状态改变导致的重新渲染都会执行useEffect
   */
  // useEffect(() => {
  //   console.log("useEffect executed");
  // });

  /**
   * 传递空数组时，只在组件挂载时执行一次
   *
   * 绑定依赖项时，只有依赖项发生变化时才会执行
   */
  useEffect(() => {
    console.log("useEffect executed");
  }, [count]);

  function increment() {
    setCount(count + 1);
  }

  function increment2() {
    setCount2(count2 + 1);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>{count}</p>
        <p>{count2}</p>
        <button onClick={increment}>Increment</button>
        <button onClick={increment2}>Increment2</button>
      </header>
    </div>
  );
}

export default App;
