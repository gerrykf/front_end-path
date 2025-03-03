import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../store/stuSlice";

const Detail = () => {
  const params = useParams();
  const { detail } = useSelector((state) => state.stu);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetail({ id: params.id }));
  }, [params.id, dispatch]);

  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-header">学生详情</div>
      <div className="card-body">
        <h5 className="card-title">{detail.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {detail.sex === 0 ? "男" : "女"}
        </h6>
        <p className="card-text">
          编号：{detail.id}
          <br />
          年龄：{detail.age}
        </p>
        <NavLink to="/home" className="card-link">
          返回
        </NavLink>
      </div>
    </div>
  );
};

export default Detail;
