import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import AddDockets from "../components/AddDockets";
import CreateCompany from "../components/CreateCompany";
import GenerateInvoice from "../components/GenerateInvoice";
import { getCompanyNames, saveNewPartyData, saveDocketData, getDataForInvoice } from "../utils/axiosCalls";
import RenderModal from "../components/Modal";
import {
  dataEntryPrimaryBtns,
  dataEntrySecondaryBtns,
  getInvoiceNumber,
  isValidEnteredData,
  requiredFields,
} from "../utils/dataEntryHelper";
import RenderToast from "../components/Toast";
import { isValidDate } from "../utils";
import Invoice from "../components/Invoice";
import InvoicePrint from "../components/InvoicePrint";
import Pageloader from "../components/Pageloader";

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

  const onFieldBlur = (e, isNonArrElement) => {
    const element = e.target;
    const currentValidation = { ...validationObj };
    if (requiredFields.includes(element.name)) {
      if (!element.value) {
        if (isNonArrElement) {
          currentValidation[element.name] = {
            msg: "This Field is Required",
          };
        } else {
          currentValidation[element.name] = {
            index: Number(element.dataset.id),
            msg: "This Field is Required",
          };
        }
      } else {
        currentValidation[element.name] = null;
      }
    }
    if (element.name === "docket_date" && element.value) {
      if (!isValidDate(element.value))
        currentValidation[element.name] = {
          index: Number(element.dataset.id),
          msg: "Date is Invalid",
        };
    }
    if (modalType === "add_new_party" && element.name === "company_name") {
      const existingCompany = companyList.filter(
        (obj) => obj.company_name.toLowerCase() === element.value.toLowerCase()
      ).length;
      if (existingCompany) {
        currentValidation[element.name] = {
          msg: "This Company already exists",
        };
      }
    }
    setValidationObj(currentValidation);
  };

  useEffect(() => {
    (async () => {
      let res = {};
      try {
        res = await getCompanyNames();
      } catch (e) {
        console.error(e);
      }
      setLoadingType("");
      if (res?.data?.status === "SUCCESS") {
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
    onFieldBlur,
    validationObj,
    mainData,
    setMainData,
    setValidationObj,
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
    let res = {};
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
    try {
      switch (modalType) {
        case "add_new_party":
          res = await saveNewPartyData(mainData);
          res.data?.data?.[0] &&
            setCompanyList([
              ...companyList,
              {
                id: res.data.data[0].company_id,
                company_name: res.data.data[0].company_name,
              },
            ]);
          break;
        case "enter_weekly_data":
        case "add_cash_booking":
          res = await saveDocketData(mainData);
          break;
        case "generate_invoice":
          res = await getDataForInvoice(mainData);
          break;
        default:
          return;
      }
    } catch (e) {
      console.error(e);
    }
    setLoadingType("");
    if (res.data?.status === "SUCCESS") {
      if (modalType === "generate_invoice") {
        setModalType("show_invoice");
        setInvoiceData(res.data);
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
        msg: res.data?.err?.msg || "Something went wrong please try again",
      });
    }
  };

  let MODAL_CHILD_COMPONENT = null,
    modal_title = "";
  switch (modalType) {
    case "add_new_party":
      modal_title = "Add a new Party";
      MODAL_CHILD_COMPONENT = <CreateCompany {...sectionData} {...modalProps} />;
      break;
    case "enter_weekly_data":
    case "add_cash_booking":
      modal_title = modalType === "add_cash_booking" ? "Add new Cash booking" : "Add Dockets";
      MODAL_CHILD_COMPONENT = (
        <AddDockets
          isCashBooking={modalType === "add_cash_booking"}
          companyList={companyList}
          {...sectionData}
          {...modalProps}
        />
      );
      break;
    case "generate_invoice":
      modal_title = "Generate Invoice";
      MODAL_CHILD_COMPONENT = <GenerateInvoice companyList={companyList} {...sectionData} {...modalProps} />;
      break;
    case "show_invoice":
      modal_title = "Invoice";
      MODAL_CHILD_COMPONENT = invoiceData ? <Invoice invoiceData={invoiceData} /> : null;
      break;
    default:
      MODAL_CHILD_COMPONENT = null;
      modal_title = "";
  }

  if (loadingType === "full") return <Pageloader title="Please wait" message="Preparing the screen..." />;
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
        submitButtonText={modalType === "show_invoice" ? "Print" : "Submit"}
        contentClassName={modalType === "show_invoice" ? "ht-90vh" : ""}
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
          invoiceNumber={getInvoiceNumber(invoiceData.invoice_number)}
        />
      )}
    </>
  );
};

export default DataEntry;
