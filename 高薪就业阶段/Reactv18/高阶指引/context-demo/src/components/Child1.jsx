import React from 'react';
import Child2 from './Child2';
import Child3 from './Child3';
import MyContext from '../context';

const {Consumer} = MyContext;

const Child1 = ()=>{

    return (
        <Consumer>
            {
            (context)=>{
                return (
                    <div>
                        Child1  --- {context.count}
                        <br />
                        <Child2/>
                        <br />
                        <Child3/>
                    </div>
                )
            }
            }
        </Consumer>
    )
}

export default Child1;