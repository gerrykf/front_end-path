import {objectIsEqual} from '../utils/tools';
import React from 'react';

/**
 * shouldComponentUpdate 用于类组件的性能优化
 */
class ShouldComponentUpdateDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(objectIsEqual(this.props,this.nextProps) && objectIsEqual(this.state, nextState)){
      return false;
    }
    return true;
  }

  render() {
    console.log('render');
    return (
      <div>
        <h1>ShouldComponentUpdateDemo</h1>
        <p>{this.state.count}</p>
        <button onClick={() => this.setState({ count: 1 })}>click</button>
      </div>
    );
  }
}

export default ShouldComponentUpdateDemo;