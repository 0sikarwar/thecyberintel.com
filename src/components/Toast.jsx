import Alert from "react-bootstrap/Alert";
function RenderToast({ showToast, setShowToast, heading, msg }) {
  const toggleShow = () => setShowToast(!showToast);
  return (
    <div className={`uiToast ${showToast ? "active" : ""}`}>
      <Alert variant="danger" onClose={toggleShow} dismissible>
        <Alert.Heading>{heading}</Alert.Heading>
        <p>{msg}</p>
      </Alert>
    </div>
  );
}

export default RenderToast;
