import React from "react";
import { change, deleteList } from "../store/todoSlice";
import { useSelector, useDispatch } from "react-redux";

function List() {
  const todoList = useSelector((state) => state.todos.list);
  const dispatch = useDispatch();
  // 在 redux，通过 store.getState() 来获取仓库数据
  const lis = todoList.map((item, index) => {
    console.log(item);
    return (
      <li key={index} className="text-primary">
        <span
          onClick={() => dispatch(change(index))}
          className={["item", item.status ? "completed" : ""].join(" ")}
        >
          {item.content}
        </span>
        <button
          type="button"
          className="close"
          onClick={() => dispatch(deleteList(index))}
        >
          &times;
        </button>
      </li>
    );
  });

  return (
    <div>
      <ul style={{ marginTop: 20 }}>{lis}</ul>
    </div>
  );
}

export default List;
