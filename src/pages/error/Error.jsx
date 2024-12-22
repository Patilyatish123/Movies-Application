import React from "react";
import { useNavigate } from "react-router-dom";
const Error = () => {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate("/");
  }
  return (
    <div>
      <h1 onClick={handleNavigate}>Page not found 404</h1>
    </div>
  );
};

export default Error;
