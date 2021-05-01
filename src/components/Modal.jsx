import { Button, Modal } from "react-bootstrap";

function RenderModal({
  show,
  handleClose,
  handleSubmit,
  title,
  disabledSubmit,
  submitButtonText,
  contentClassName,
  modalType,
  children,
}) {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="modal-container"
        contentClassName={contentClassName || ""}
        centered
        autoFocus
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={disabledSubmit}>
            {submitButtonText || "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RenderModal;
