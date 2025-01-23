import React from 'react';

const Child1 = (props) => {

    console.log('Child1 render');

    props.test();

    return (
        <div className='app-container child'>
            <h3>Child1</h3>
            <br />
            {props.counter}

            <button onClick={() => props.setCounter(props.counter + 1)}>Child1 click</button>
        </div>
    );
};

export default React.memo(Child1);