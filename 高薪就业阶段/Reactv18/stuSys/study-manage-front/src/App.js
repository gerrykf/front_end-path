import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import AddUser from "./components/AddUser";

function App() {
  return (
    <div id="app" className="container">
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">
              Project name
            </a>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li className="active">
                <a href="#">主页</a>
              </li>
              <li>
                <a href="#">关于我们</a>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="#">添加用户</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* 匹配的路由显示 */}

      <div className="container" style={{ marginTop: 50 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="addUser" element={<AddUser />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
