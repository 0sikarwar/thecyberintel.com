import AddDockets from "../components/AddDockets";
import CreateCompany from "../components/CreateCompany";
import Invoice from "../components/Invoice";
import GenerateInvoice from "../components/GenerateInvoice";
import { getDataForInvoice, saveDocketData, saveNewPartyData } from "./axiosCalls";
import { requiredFields } from "./dataEntryHelper";
import { isValidDate } from "./index";

export const onFieldBlur = (e, isNonArrElement, validationObj, companyList, setValidationObj, modalType) => {
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
    const existingCompany = companyList.filter((obj) => obj.company_name.toLowerCase() === element.value.toLowerCase())
      .length;
    if (existingCompany) {
      currentValidation[element.name] = {
        msg: "This Company already exists",
      };
    }
  }
  setValidationObj(currentValidation);
};

export const makeApiCallOnSubmit = async (modalType, mainData, companyList, setCompanyList) => {
  let res = {};
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
  return res?.data;
};

export const getModalData = (modalType, sectionData, modalProps, companyList, invoiceData) => {
  let modal_title = "",
    MODAL_CHILD_COMPONENT = null;
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
  return [MODAL_CHILD_COMPONENT, modal_title];
};
