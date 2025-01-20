import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addStu } from "../store/stuSlice";

function AddUser() {
  const [stu, setStu] = useState({
    name: "",
    age: "",
    sex: 0,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUpdateInfo = (newInfo, key) => {
    console.log(newInfo, key);
    setStu({
      ...stu,
      [key]: newInfo,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("提交表单");

    if (!stu.name || !stu.age) {
      alert("请填写完整信息");
      return;
    }

    dispatch(addStu(stu));

    navigate("/", {
      state: {
        type: "success",
        message: "添加学生成功",
        stu,
      },
    });
  };

  return (
    <div className="container">
      <h1>添加学生</h1>
      {/* 添加学生表单 */}
      <form className="form-horizontal">
        <div className="form-group">
          <label htmlFor="name" className="col-sm-2 control-label">
            姓名
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="请输入学生姓名"
              value={stu.name}
              onInput={(e) => handleUpdateInfo(e.target.value, "name")}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="age" className="col-sm-2 control-label">
            年龄
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="age"
              placeholder="请输入学生年龄"
              value={stu.age}
              onInput={(e) => handleUpdateInfo(e.target.value, "age")}
            />
          </div>
        </div>
        {/* 性别 */}
        <div className="form-group">
          <label className="col-sm-2 control-label">性别</label>
          <div className="col-sm-10">
            <label className="radio-inline">
              <input
                id="sex0"
                type="radio"
                name="sex"
                value={0}
                checked={stu.sex === 0}
                onChange={(e) =>
                  handleUpdateInfo(Number(e.target.value), "sex")
                }
              />{" "}
              男
            </label>
            <label className="radio-inline">
              <input
                id="sex1"
                type="radio"
                name="sex"
                value={1}
                checked={stu.sex === 1}
                onChange={(e) =>
                  handleUpdateInfo(Number(e.target.value), "sex")
                }
              />{" "}
              女
            </label>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              提交
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddUser;
