import './App.css';
import ShouldComponentUpdateDemo from './components/ShouldComponentUpdateDemo';
import PureComponentDemo from './components/PureComponentDemo';
import ReactMemoDemo from './components/ReactMemoDemo';

function App() {
  return (
    <div className="App">
      <ShouldComponentUpdateDemo />
      <PureComponentDemo />
      <ReactMemoDemo />
    </div>
  );
}

export default App;
