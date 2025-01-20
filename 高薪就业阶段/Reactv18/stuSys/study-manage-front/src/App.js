import { Routes, Route, Navigate, NavLink } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import AddUser from "./components/AddUser";
import Detail from "./components/Detail";
import "./App.css";

function App() {
  return (
    <div id="app" className="container">
      <ul className="nav" style={{ marginTop: 20, background: "lightblue" }}>
        <NavLink to="/home" className="navigation">
          主页
        </NavLink>
        <NavLink to="/about" className="navigation">
          关于我们
        </NavLink>
      </ul>

      {/* 匹配的路由显示 */}

      <div className="container" style={{ marginTop: 50 }}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="addUser" element={<AddUser />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
