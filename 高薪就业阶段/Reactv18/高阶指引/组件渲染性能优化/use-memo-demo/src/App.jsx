import React,{useState, useMemo} from 'react';
import './App.css';

/**
 * useMemo 场景介绍
 * 正常情况下使用useCallback 缓存函数，可以避免函数的重新声明，从而避免子组件的重新渲染
 * 但是如果父组件的状态发生变化，子组件的props也会发生变化，这时候即使子组件的函数是缓存的，也会重新渲染
 * 因为父组件重新渲染，子组件的props发生变化，子组件也会重新渲染
 * 
 * 使用useMemo 可以解决这个问题
 * @returns 
 */

function App() {

  const [val,setVal] = useState(1);
  const [counter,setCounter] = useState(1);

  /**
   * 这里如果使用useCallback 缓存函数，当input导致状态改变，组件会重新渲染 自然而然会执行getCount
   * 所以无法缓存计算的值
   * @returns 
   */

  /**
   * 使用useMemo 可以缓存计算的值，只有当val改变时，才会重新计算
   * 类似于vue的computed
   * @returns
   */
  const newCount =useMemo(()=>{
    console.log('getCount..');
    return counter + 100;
  },[counter]); 


  return (
    <div className="App">
      <div className="app-container">
        <h3>Parent</h3>
        <p>{newCount}</p>

        <button onClick={()=>setCounter(counter+1)}>Change Counter</button>

        {/* 场景： 改变输入框的值时 并不想重新执行counter的计算过程 ，这是两个无关联的业务逻辑 */}
        <input type="text" value={val} onChange={(e)=>setVal(e.target.value)}/>

      </div>
    </div>
  );
}

export default App;
