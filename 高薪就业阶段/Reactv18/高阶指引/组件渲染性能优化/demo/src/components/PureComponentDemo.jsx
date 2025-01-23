import React, { PureComponent } from 'react';

/**
 * PureComponent 用于类组件的性能优化
 * PureComponent 内部实现了 shouldComponentUpdate
 */
class ShouldComponentUpdateDemo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    console.log('render');
    return (
      <div>
        <h1>PureComponentDemo</h1>
        <p>{this.state.count}</p>
        <button onClick={() => this.setState({ count:Math.floor(Math.random(10)*3) })}>click</button>
      </div>
    );
  }
}

export default ShouldComponentUpdateDemo;