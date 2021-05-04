import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { getCompanyNames, getInvoiceNum } from "../utils/axiosCalls";
import RenderModal from "../components/Modal";
import {
  dataEntryPrimaryBtns,
  dataEntrySecondaryBtns,
  getInvoiceNumber,
  isValidEnteredData,
} from "../utils/dataEntryHelper";
import RenderToast from "../components/Toast";
import InvoicePrint from "../components/InvoicePrint";
import Pageloader from "../components/Pageloader";
import { getModalData, onFieldBlur, makeApiCallOnSubmit } from "../utils/dataEntryModalHelper";

const DataEntry = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [mainData, setMainData] = useState(null);
  const [disableModalSubmit, setDisableModalSubmit] = useState(true);
  const [companyList, setCompanyList] = useState(null);
  const [validationObj, setValidationObj] = useState({});
  const [sectionData, setSectionData] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ type: "", heading: "", msg: "" });
  const [invoiceData, setInvoiceData] = useState(null);
  const [printInvoiceFlag, setPrintInvoiceFlag] = useState(false);
  const [loadingType, setLoadingType] = useState("full");
  const closeModal = () => {
    setShowModal(false);
    setMainData(null);
    setValidationObj({});
    invoiceData && setInvoiceData(null);
  };

  const handleFiledBlur = (e, isNonArrElement) => {
    onFieldBlur(e, isNonArrElement, validationObj, companyList, setValidationObj, modalType);
  };

  const handleGetInvoiceNumber = async () => {
    setLoadingType("partial");
    const confirmMsg = `Ganerating Invoice number for **${invoiceData.company_name}** for the month of **${invoiceData.for_month}**`;
    if (window.confirm(confirmMsg)) {
      const result = await getInvoiceNum({ company_id: invoiceData.company_id, for_month: invoiceData.for_month });
      if (result.data?.invoice_number) {
        setInvoiceData({ ...invoiceData, invoice_number: result.data.invoice_number });
      }
    }
    setLoadingType("");
  };

  useEffect(() => {
    (async () => {
      let res = {};
      try {
        res = await getCompanyNames();
      } catch (e) {
        console.error(e);
      }
      if (res?.data?.status === "SUCCESS") {
        setLoadingType("");
        setCompanyList(res.data.list);
      }
    })();
  }, []);

  useEffect(() => {
    const validationValues = Object.values(validationObj).filter((item) => item && typeof item === "object");
    if (!mainData || validationValues.length) {
      setDisableModalSubmit(true);
    } else {
      setDisableModalSubmit(false);
    }
  }, [validationObj, mainData]);

  const handleCloseModal = () => {
    const confirmMsg = "By closing this all changed data will lost.";
    if (!mainData || (mainData && window.confirm(confirmMsg))) {
      closeModal();
    }
  };

  const handleShowModal = () => setShowModal(true);

  const modalProps = {
    onFieldBlur: handleFiledBlur,
    validationObj,
    mainData,
    setMainData,
    setValidationObj,
    setToastData,
    setShowToast,
  };

  const handleBtnClick = (obj, isPrimary) => {
    handleShowModal();
    setModalType(obj.key);
    setSectionData(obj);
  };

  const handleSubmitModal = async () => {
    if (modalType === "show_invoice") {
      setPrintInvoiceFlag(true);
      return;
    }
    const isValid = mainData && isValidEnteredData(modalType, mainData, companyList);
    if (!mainData || !isValid) {
      setShowToast(true);
      setToastData({
        type: "danger",
        heading: "Oh snap!",
        msg:
          modalType === "generate_invoice"
            ? "All field a required to get invoce data"
            : "Cannot submit empty data. Please fill the fields or remove row.",
      });
      return;
    }
    setLoadingType("partial");
    let result = {};
    try {
      result = await makeApiCallOnSubmit(modalType, mainData, companyList, setCompanyList);
    } catch (e) {
      console.error(e);
    }
    setLoadingType("");
    if (result?.status === "SUCCESS") {
      if (modalType === "generate_invoice") {
        setModalType("show_invoice");
        setInvoiceData(result);
        setMainData(null);
        setValidationObj({});
        return;
      }
      setShowToast(true);
      setToastData({
        type: "success",
        heading: "Saved Data",
        msg: "Your data is saved in our database",
      });
      closeModal();
    } else {
      setShowToast(true);
      setToastData({
        type: "danger",
        heading: "Oh snap!",
        msg: result?.err?.msg || "Something went wrong please try again",
      });
    }
  };

  const [MODAL_CHILD_COMPONENT, modal_title, submitButtonText] = getModalData(
    modalType,
    sectionData,
    modalProps,
    companyList,
    invoiceData
  );

  if (loadingType === "full") return <Pageloader title="Please wait" message="Getting initial data..." />;
  return (
    <>
      {loadingType === "partial" && <Pageloader title="Please wait" message="Executing your query..." />}
      <div className="data-entry bg-white">
        <div className="p-20">
          <Button href="#/docketlisting" variant="warning">
            Display all dockets
          </Button>
        </div>
        <div className="btn-container p-12 wt-50p flex flex-wrap flex-around">
          {dataEntryPrimaryBtns.map((obj) => (
            <Button href="#" variant="primary" onClick={() => handleBtnClick(obj, true)} key={obj.key}>
              {obj.value}
            </Button>
          ))}
        </div>
        <div className="btn-container p-12 wt-50p flex flex-wrap flex-around">
          {dataEntrySecondaryBtns.map((obj) => (
            <Button href="#" variant="secondary" onClick={() => handleBtnClick(obj, false)} key={obj.key}>
              {obj.value}
            </Button>
          ))}
        </div>
      </div>
      <RenderModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmitModal}
        disabledSubmit={modalType === "show_invoice" ? false : disableModalSubmit}
        title={modal_title}
        modalType={modalType}
        submitButtonText={submitButtonText}
        contentClassName={modalType === "show_invoice" ? "ht-90vh" : ""}
        optionalButtonText={modalType === "show_invoice" ? "Get Invoice Number" : ""}
        handleThirdButtonClick={modalType === "show_invoice" ? handleGetInvoiceNumber : () => {}}
        disableOptionalButton={invoiceData?.invoice_number || !invoiceData?.docketList?.length}
      >
        {MODAL_CHILD_COMPONENT}
      </RenderModal>
      <RenderToast showToast={showToast} setShowToast={setShowToast} {...toastData} />
      {printInvoiceFlag && (
        <InvoicePrint
          invoiceData={invoiceData}
          setPrintInvoiceFlag={setPrintInvoiceFlag}
          companyName={invoiceData.company_name}
          fromDate={invoiceData.from}
          toDate={invoiceData.to}
          invoiceDate={invoiceData.invoice_date}
          invoiceNumber={invoiceData.invoice_number ? getInvoiceNumber(invoiceData.invoice_number) : ""}
          total={invoiceData.totalAmount}
        />
      )}
    </>
  );
};

export default DataEntry;
