import AddDockets from "../components/AddDockets";
import CreateCompany from "../components/CreateCompany";
import Invoice from "../components/Invoice";
import GenerateInvoice from "../components/GenerateInvoice";
import GetInvoiceUsingNum from "../components/GetInvoiceUsingNum";
import {
  getDataForInvoice,
  getDataToUpadate,
  saveDocketData,
  saveNewPartyData,
  updateDocketData,
  updateRateList,
} from "./axiosCalls";
import { getInitalDocketObj, requiredFields } from "./dataEntryHelper";
import { isValidDate } from "./index";
import UpdateDocket from "../components/UpdateContent";
import BulkEntry from "../components/BulkEntry";

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
    case "update_docket_data":
      res = await updateDocketData(mainData);
      break;
    case "update_party_data":
      res = await updateRateList(mainData);
      break;
    case "get_invoice_using_num":
      res = await getDataForInvoice(mainData, true);
      break;
    default:
      return;
  }
  return res?.data;
};

export const getModalData = (modalType, sectionData, modalProps, companyList, invoiceData) => {
  let modal_title = "",
    MODAL_CHILD_COMPONENT = null,
    submitButtonText = "Submit";
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
      MODAL_CHILD_COMPONENT = invoiceData ? (
        <Invoice
          invoiceData={invoiceData}
          invoiceFuelCharge={modalProps.invoiceFuelCharge}
          setInvoiceFuelCharge={modalProps.setInvoiceFuelCharge}
        />
      ) : null;
      submitButtonText = "Print";
      break;
    case "update_docket_data":
    case "update_party_data":
      submitButtonText = "Update";
      modal_title = "Update data";
      MODAL_CHILD_COMPONENT = (
        <UpdateDocket {...sectionData} {...modalProps} companyList={companyList} modalType={modalType} />
      );
      break;
    case "bulk_data_entry":
      submitButtonText = "Open list";
      modal_title = "Enter in bulk";
      MODAL_CHILD_COMPONENT = (
        <BulkEntry {...sectionData} {...modalProps} companyList={companyList} modalType={modalType} />
      );
      break;
    case "get_invoice_using_num":
      MODAL_CHILD_COMPONENT = <GetInvoiceUsingNum {...sectionData} {...modalProps} />;
      break;
    default:
      MODAL_CHILD_COMPONENT = null;
      modal_title = "";
  }
  return [MODAL_CHILD_COMPONENT, modal_title, submitButtonText];
};

export const convertToValidDate = (str) => {
  const date = new Date(str);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const getListToUpdate = async (modalType, formData, companyList) => {
  let params = {};
  switch (modalType) {
    case "update_docket_data":
      params = { type: "getdocket", docket_num: formData.docket_num };
      break;
    case "update_party_data":
      params = { type: "getparty", company_id: formData.company_id };
      break;
  }
  let result = {};
  try {
    result = await getDataToUpadate(params);
  } catch (err) {
    console.error(err);
  }
  let listToUpdate = null,
    companyDetails = null;
  switch (modalType) {
    case "update_docket_data":
      listToUpdate = result.data?.list?.map((obj) => {
        const updatedObj = {
          docket_date: convertToValidDate(obj.docket_date),
          docket_num: obj.docket_num,
          destination: obj.destination,
          weight: obj.weight,
          docket_mode: obj.docket_mode,
          docket_discount: obj.docket_discount || 0,
          company_id: obj.company_id,
          amount: obj.amount,
        };
        if (obj.company_id) {
          updatedObj.client_name = companyList.filter((item) => item.id === obj.company_id)[0]?.company_name;
        } else if (obj.amount) {
          updatedObj.amount = obj.amount;
        }
        return updatedObj;
      });
      break;
    case "update_party_data":
      listToUpdate = result.data?.list?.map((obj) => ({
        destination: obj.destination,
        upto250Gms: obj.upto250gms,
        upto500Gms: obj.upto500gms,
        upto1Kg: obj.upto1kg,
        above1kgSur: obj.above1kgsur,
        above1KgAir: obj.above1kgair,
      }));
      companyDetails = result.data?.companyDetails?.[0];
      delete companyDetails.added_on;
      delete companyDetails.updated_on;
      break;
  }

  return { fetchedList: listToUpdate, companyDetails };
};

export const validateBulkData = (data) => {
  const keys = Object.keys(data);
  const initialObj = getInitalDocketObj();
  const res = [];
  let prevLength = 0;
  for (let i of keys) {
    if (i.indexOf("bulk_") > -1) {
      const spliteArr = data[i].trim().split(/\s/);
      const keyName = i.split("bulk_")[1];
      if (prevLength && spliteArr.length !== prevLength) {
        return [false, `${keyName.toUpperCase()} has different number of entry then Previous field`];
      } else {
        prevLength = spliteArr.length;
        for (let j = 0; j < prevLength; j++) {
          if (keyName === "docket_date" && !isValidDate(spliteArr[j])) {
            return [false, `${keyName.toUpperCase()} "${spliteArr[j]}" is not a valid Date`];
          } else if (keyName === "docket_num" && spliteArr[j].length > 9) {
            return [false, `${keyName.toUpperCase()} "${spliteArr[j]}" is not a valid Docket Number`];
          }
          res[j] = res[j] || { ...initialObj };
          res[j][keyName] = spliteArr[j];
        }
      }
    } else {
      for (let j = 0; j < prevLength; j++) {
        res[j] = res[j] || { ...initialObj };
        res[j][i] = data[i];
      }
    }
  }
  return [true, res];
};
