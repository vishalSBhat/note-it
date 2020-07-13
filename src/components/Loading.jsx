import React from "react";
import loading from "../images/loading.svg";

const Loading = () => (
  <div id="loading-container" className="d-none">
    <img src={loading} alt="Loading" />
  </div>
);

export default Loading;
