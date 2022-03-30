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
  optionalButtonText,
  handleThirdButtonClick,
  disableOptionalButton,
  dialogClassName,
  children,
  hidebuttons,
}) {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName={`modal-container ${dialogClassName || ""}`}
        contentClassName={contentClassName || ""}
        centered
        autoFocus
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        {!hidebuttons && (
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit} disabled={disabledSubmit}>
              {submitButtonText || "Submit"}
            </Button>
            {optionalButtonText && (
              <Button variant="danger" onClick={handleThirdButtonClick} disabled={disableOptionalButton}>
                {optionalButtonText}
              </Button>
            )}
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
}

export default RenderModal;
