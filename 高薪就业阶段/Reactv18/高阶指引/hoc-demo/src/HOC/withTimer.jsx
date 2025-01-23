import { useState,useEffect } from "react";

const withTimer = (WrappedComponent) => {
    return function NewComponent  (props) {
        const [counter,setCounter] = useState(1);

        useEffect(() => {
            const timer = setInterval(() => {
                setCounter(counter + 1);
            }, 1000);
            return () => {
                clearInterval(timer);
            }
        }, [counter]);

        return <WrappedComponent {...props} counter={counter} />
    }
}

export default withTimer;