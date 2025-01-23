import React from 'react';

function Child(props) {
  console.log('Child render');
  return (
        <div>
            Child
            <br />
            {props.count}

            <hr />
            <button onClick={()=>props.setCount(props.count+1)}>Child click</button>
        </div>
    );
}

export default React.memo(Child);