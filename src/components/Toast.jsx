import React, { useEffect } from "react";
import Alert from "react-bootstrap/Alert";
function RenderToast({ showToast, setShowToast, heading, msg, type }) {
  const toggleShow = () => setShowToast(!showToast);
  useEffect(() => {
    if (showToast) {
      setTimeout(() => setShowToast(false), 8000);
    }
  }, [showToast]);
  return (
    <div className={`uiToast ${showToast ? "active" : ""}`}>
      <Alert variant={type || "danger"} onClose={toggleShow} dismissible>
        <Alert.Heading>{heading}</Alert.Heading>
        <p>{msg}</p>
      </Alert>
    </div>
  );
}

export default RenderToast;
