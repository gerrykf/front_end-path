import React,{useState,useCallback} from 'react';
import './App.css';
import Child1 from './components/Child1';
import Child2 from './components/Child2';

/**
 * useCllback 场景介绍
 * 正常情况下使用React.memo 传递给子组件的状态值没有发生变化就不会重新渲染
 * 但是如果传递给子组件的是一个函数，那么每次父组件重新渲染就是重新声明这个函数，函数(函数也是对象)的引用地址发生了变化，所以子组件也会重新渲染
 * 
 * 使用useCallback 可以解决这个问题
 * @returns 
 */

function App() {

  const [counter,setCounter] = useState(1);
  const [counter1,setCounter1] = useState(1);
  const [counter2,setCounter2] = useState(1);

  console.log('Parent render');

  /**
   * 缓存函数的引用地址 每次重新渲染时对比这个引用地址是否发生变化
   */
  const newTest =useCallback( () => {
    console.log('test runner..');
  },[]);



  return (
    <div className="App">
      <div className="app-container">
        <h3>Parent</h3>
        <p>{counter}</p>
        <button onClick={()=>setCounter(counter+1)}>+1</button>

        <Child1 counter={counter1} setCounter={setCounter1} test={newTest}/>
        <Child2 counter={counter2} setCounter={setCounter2} test={newTest}/>
      </div>
    </div>
  );
}

export default App;
