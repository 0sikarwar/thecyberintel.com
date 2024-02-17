import React, { useEffect, useState } from "react";
let isModified = false;
const GetInvoiceUsingNum = (props) => {
  const [formData, setFormData] = useState(props.mainData?.formData || {});

  const handelChange = (e, isNonRateElement) => {
    const element = e.target;
    const currentFormData = { ...formData };
    isModified = true;
    currentFormData[element.name] = element.value;
    if (e.extraReqKey) {
      const strToAppend = element.name === "company_name" ? "company_" : "";
      e.extraReqKey.forEach((key) => {
        currentFormData[strToAppend + key] = element[key] || "";
      });
    }
    setFormData(currentFormData);
  };
  useEffect(() => {
    if (isModified && Object.keys(formData).length) {
      props.setMainData({ formData });
    }
  }, [formData]);

  return (
    <div>
      <div className="flex flex-wrap ml-10">
        <div className="wt-100p">
          Enter <b>last digits </b> of Invoice Number
        </div>
        <div className="form-control wt-60">{"TCI" + new Date().getFullYear().toString().slice(2)}</div>
        <input
          className="form-control wt-180 bl-0"
          type={props.fields[0].type}
          name={props.fields[0].key}
          placeholder={props.fields[0].name}
          value={formData[props.fields[0].key]}
          onChange={(e) => handelChange(e, true)}
        />
      </div>
    </div>
  );
};

export default GetInvoiceUsingNum;
