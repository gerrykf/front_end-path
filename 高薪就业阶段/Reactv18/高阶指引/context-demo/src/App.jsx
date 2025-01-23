import './App.css';
import MyContext from './context';
import { useState } from 'react';
import Child1 from './components/Child1';

console.log(MyContext);
const {Provider} = MyContext;

function App() {  
  /** 在根组件维护的数据 */
  const [count,setCount] = useState(1);
  return (
    // value 相当于将数据放置于上下文对象中 提供给所有的子组件使用
    <Provider value={{count,setCount}}>
        <Child1 />
    </Provider>
  );
}

export default App;
