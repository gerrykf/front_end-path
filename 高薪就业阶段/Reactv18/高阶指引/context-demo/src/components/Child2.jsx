import MyContext from "../context";

const {Consumer} = MyContext;

const Child2 = ()=>{
    return (
        <Consumer>
           {(context)=>{
                return (
                    <div>
                        Child2
                        <br />
                        <button onClick={()=>context.setCount(context.count+1)}>+1</button>
                        {context.count}
                    </div>
                )
            }}
        </Consumer>
    )
}

export default Child2;