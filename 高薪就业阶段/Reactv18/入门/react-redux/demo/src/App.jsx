import "./css/App.css";
import Input from "./components/Input";
import List from "./components/List";

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <Input store={props.store} />
        <List store={props.store} />
      </header>
    </div>
  );
}

export default App;
