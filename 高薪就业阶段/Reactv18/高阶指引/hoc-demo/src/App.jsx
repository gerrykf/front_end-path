import './App.css';
import withLog from './HOC/withLog';
import withTimer from './HOC/withTimer';
import Child1 from './components/Child1';
import Child2 from './components/Child2';
import UseRefDemo from './components/UseRefDemo';

const NewChild1 = withLog(Child1);
const NewChild2 = withTimer(withLog(Child2));

function App() {  
  return (
    <div className="App">
      <header className="App-header">
       <NewChild1 name='传递的值' /> 
       <NewChild2 />
       <UseRefDemo />
      </header>
    </div>
  );
}

export default App;
