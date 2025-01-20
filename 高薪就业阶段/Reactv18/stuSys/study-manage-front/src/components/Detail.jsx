import { NavLink, useParams } from "react-router-dom";
import { getDetail } from "../api/stu";
import { useState, useEffect } from "react";

const Detail = (props) => {
  const params = useParams();
  const [details, setDetails] = useState({});

  useEffect(() => {
    getDetail(params.id).then((res) => {
      console.log(res);
      setDetails(res.data);
    });
  }, [params.id]);

  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-header">学生详情</div>
      <div className="card-body">
        <h5 className="card-title">{details.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {details.sex === 0 ? "男" : "女"}
        </h6>
        <p className="card-text">
          编号：{details.id}
          <br />
          年龄：{details.age}
        </p>
        <NavLink to="/home" className="card-link">
          返回
        </NavLink>
      </div>
    </div>
  );
};

export default Detail;
