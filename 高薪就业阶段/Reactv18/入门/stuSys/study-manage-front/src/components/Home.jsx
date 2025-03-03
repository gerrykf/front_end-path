import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Alert from "./Alert";
import { useSelector, useDispatch } from "react-redux";
import { getStuListAsync } from "../store/stuSlice";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { stuList } = useSelector((state) => state.stu);
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [alert, setAlert] = useState({ type: "", message: "" });

  useEffect(() => {
    dispatch(getStuListAsync());
  }, [stuList.length, dispatch]);

  useEffect(() => {
    console.log("location-state", location.state);
    if (location.state && location.state.stu && location.state.message) {
      setAlert({ type: "success", message: "添加学生成功" });
    }
  }, [location]);

  const handleSearch = () => {
    const list = stuList.filter((item) => item.name.includes(search));
    setSearchList(list);
  };

  const todoList = searchList.length ? searchList : stuList;

  const trs = todoList.map((item) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.age}</td>
      <td>
        <NavLink to={`/detail/${item.id}`}>详情</NavLink>
      </td>
    </tr>
  ));

  const addStu = () => {
    // 跳转到添加学生页面 命令式导航 react-router-dom
    navigate("/addUser");
  };

  const showAlert = alert.message ? <Alert {...alert} /> : null;

  return (
    <div className="jumbotron">
      {showAlert}
      <div className="container">
        <div className="page-header">
          <h1>学生管理系统</h1>
        </div>
        <div className="row">
          <div className="col-md-6">
            <button className="btn btn-primary" onClick={addStu}>
              添加学生
            </button>
          </div>
        </div>
        <br />
        {/* 搜索 */}
        <div className="row">
          <div className="col-md-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="请输入学生姓名"
                value={search}
                onInput={(e) => setSearch(e.target.value)}
              />
              <span className="input-group-btn">
                <button className="btn btn-primary" onClick={handleSearch}>
                  搜索
                </button>
              </span>
            </div>
          </div>
        </div>
        <br />
        <table className="table table-striped">
          <thead>
            <tr>
              <th>编号</th>
              <th>姓名</th>
              <th>年龄</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>{trs}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
