import React from 'react';

const Child2 = (props) => {

    console.log('Child2 render');
    props.test();

    return (
        <div className='app-container child'>
            <h3>Child2</h3>
            <br />
            {props.counter}

            <button onClick={() => props.setCounter(props.counter + 1)}>Child2 click</button>
        </div>
    );
};

export default React.memo(Child2);