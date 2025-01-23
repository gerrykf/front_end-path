import { useEffect } from "react";

/**
 * 高阶组件
 * @param {*} WrappedComponent 旧的组件
 * @returns 返回一个包含日志功能的新组件
 */
export default function  withLog  (WrappedComponent){
    return function NewComponent  (props)  {
        useEffect(() => {
            console.log(`日志：${WrappedComponent.name}组件被创建了`);
            return () => {
                console.log(`日志：${WrappedComponent.name}组件被销毁了`);
            }
        }, []);
        return <WrappedComponent {...props} />
    }
}