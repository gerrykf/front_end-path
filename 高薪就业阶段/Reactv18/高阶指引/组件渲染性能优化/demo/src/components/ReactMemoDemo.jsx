/**
 * React.memo 用于函数组件的性能优化
 * 
 * 场景：
 * 父组件的状态改变后 如果子组件中的props没有改变，子组件不需要重新渲染 
 */

import React, { useState } from 'react';
import Child from './Child';

const MemoDemo = () => {
    const [count, setCount] = useState(1);
    const [count1, setCount1] = useState(1);
    
    console.log('Parent render');
    return (
        <div>
            <h1>MemoDemo</h1>
            <p>Parent-{count}</p>
            <button onClick={() => setCount(count + 1)}>Parent click</button>
            <Child count={count1} setCount={setCount1} />
        </div>
    );
};

export default MemoDemo;