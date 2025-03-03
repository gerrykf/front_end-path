import MyContext from '../context';

const {Consumer} = MyContext;

const Child3 = ()=>{

    return (
        <Consumer>
            {
            (context)=>{
                return (
                    <div>
                        Child3  --- {context.count}
                        <br />
                    </div>
                )
            }
            }
        </Consumer>
    )
}

export default Child3;