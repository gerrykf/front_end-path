import React, { useRef ,useState} from 'react';

const UseRefDemo = () => {

    /**
     * createRef()和useRef()的区别
     * 1. createRef()每次都会返回一个新的引用，而useRef()返回的是同一个引用
     * 所以在counter变化时，createRef()返回的引用会发生变化，而useRef()返回的引用不会发生变化
     * 
     * 2. createRef()适用于类组件，useRef()适用于函数组件
     */
    const inputRef1 = React.createRef();
    const inputRef2 = useRef();
    const [counter,setCounter] = useState(1);

    console.log("React.createRef()--",inputRef1);
    console.log("useRef--",inputRef2);

    const handleClick = () => {
        inputRef1.current.focus();
        inputRef2.current.focus();
        console.log("React.createRef()--",inputRef1);
        console.log("useRef--",inputRef2);
        setCounter(counter + 1);
    }

    return (
        <div>
            <h2>UseRefDemo</h2>
            <br />

            <button onClick={handleClick}>聚焦{counter}</button>
            <input type="text" ref={inputRef1} />
            <input type="text" ref={inputRef2} />
        </div>
    );
}

export default UseRefDemo;