import React from "react";
import "./LoadingModal.css";

const LoaderContent = ({
  action,
  message,
}: {
  action: String;
  message: String;
}) => {
  return (
    <div className="loader-content-wrapper">
      <div className="loader-content-header">{action}</div>
      <div className="loader-content-data">{message}</div>
    </div>
  );
};

export default LoaderContent;
