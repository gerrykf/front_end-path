import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));

function render() {
  root.render(<App store={store} />);
}

render();

store.subscribe(render);
