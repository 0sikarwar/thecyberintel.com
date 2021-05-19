export const dataEntryPrimaryBtns = [
  {
    key: "add_new_party",
    value: "Add new Party",
    fields: [
      {
        name: "Company Name",
        key: "company_name",
        type: "text",
      },
      {
        name: "Company Address",
        key: "company_address",
        type: "text",
      },
      {
        name: "Company GSTIN",
        key: "company_gst",
        type: "text",
      },
    ],
  },
  {
    key: "add_cash_booking",
    value: "Add cash booking",
  },
  {
    key: "enter_weekly_data",
    value: "Enter weekly data",
  },
  {
    key: "generate_invoice",
    value: "Generate Invoice",
    fields: [
      {
        name: "Company Name",
        key: "company_name",
        type: "text",
      },
      {
        name: "From month",
        key: "from_month",
        type: "month",
      },
      {
        name: "To month",
        key: "to_month",
        type: "month",
      },
    ],
  },
];

export const dataEntrySecondaryBtns = [
  {
    key: "update_docket_data",
    value: "Update docket data",
    fields: [
      {
        name: "Docket Number",
        key: "docket_num",
        type: "text",
      },
    ],
  },
  {
    key: "update_party_data",
    value: "Update Party data",
    fields: [
      {
        name: "Company Name",
        key: "company_name",
        type: "text",
      },
    ],
    extraFieldsToUpdate: [
      {
        name: "Update Dockets amount also",
        key: "reflect_changes_in_docket",
        type: "checkbox",
      },
      {
        name: "Update Dockets From month",
        key: "dockets_from_month",
        type: "month",
      },
      {
        name: "Update Dockets To month",
        key: "dockets_to_month",
        type: "month",
      },
    ],
  },
  // {
  //   key: "generate_duplicate_invoice",
  //   value: "Generate Duplicate Invoice",
  //   fields: [
  //     {
  //       name: "Invoice Number",
  //       key: "invoice_num",
  //       type: "text",
  //     },
  //   ],
  // },
];

export const rateListLabels = {
  destination: "Destination",
  upto250Gms: "250 gms",
  upto500Gms: "500 gms",
  upto1Kg: "upto 1kg",
  above1kgSur: "above 1kg surface",
  above1KgAir: "above 1kg air",
};

export const comapnyDataLabel = {
  company_name: "Company Name",
  company_address: "Company Address",
  company_gst: "Company GSTIN",
};

export const inputFiledDataTypes = {
  amount: { type: "number", min: 0 },
  upto250Gms: { type: "number", min: 0 },
  upto500Gms: { type: "number", min: 0 },
  upto1Kg: { type: "number", min: 0 },
  above1kgSur: { type: "number", min: 0 },
  above1KgAir: { type: "number", min: 0 },
  docket_discount: { type: "number", min: 0 },
  weight: { type: "number", step: 0.1, min: 0 },
};

export const addDocketLabels = {
  amount: "Collection Amount",
  docket_num: "Docket number",
  client_name: "Client Name",
  destination: "Destination Name",
  weight: "Weight ",
  docket_mode: "Mode SF/Air",
  docket_date: "Date",
  docket_discount: "Discount in ₹/Kg",
};

export const destinationGroupList = [
  "HR, PB and HP",
  "J and K",
  "Delhi and NCR",
  "Rest of North",
  "Srinagar and Metro",
  "West and South/ROI",
  "Guwahati",
  "North East",
  "Leh, Tripura, Manipur, Nagaland, Silchar and Andaman Nicobar",
];

export const getInitalDocketObj = (isCashBooking) => {
  const obj = {
    docket_date: "",
    docket_num: "",
    client_name: "",
    destination: "",
    weight: "",
    docket_mode: "Surface",
    docket_discount: 0,
  };
  if (isCashBooking) {
    delete obj.client_name;
    obj.amount = "";
    delete obj.docket_discount;
  }
  return obj;
};
export const requiredFields = ["destination", "docket_num", "company_name", "new_company_name"];

export const isValidEnteredData = (modalType, mainData, companyList) => {
  const { formData, rateList } = mainData;
  switch (modalType) {
    case "add_new_party":
      if (!formData.company_name) {
        return false;
      }
      if (rateList?.length) {
        return !!Object.values(rateList[rateList.length - 1])
          .join("")
          .trim();
      }
      break;
    case "enter_weekly_data":
    case "add_cash_booking":
      return !!Object.values(formData[formData.length - 1])
        .join("")
        .trim();
    case "generate_invoice":
      return formData.company_name && formData.from_month && formData.to_month;
    default:
      return true;
  }
  return true;
};

export const invoicePrintColumnHead = {
  sno: "S.No",
  docket_num: "Tracking Number",
  docket_date: "Date",
  destination: "Destination",
  docket_mode: "Mode",
  weight: "Weight",
  amount: "Amount",
};

export const getInvoiceNumber = (num) =>
  "TCI" + new Date().getFullYear().toString().slice(2) + num.toString().padStart(4, "0");
