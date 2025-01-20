import { useEffect } from "react";

const Alert = ({ type, message }) => {
  useEffect(() => {
    console.log("Alert组件挂载");
    return () => {
      console.log("Alert组件卸载");
    };
  }, []);

  return (
    <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
      <strong>{type}</strong>
      {message}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default Alert;
