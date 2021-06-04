import { useEffect, useState } from "react";
import DropdownWithSearch from "./DropdownWithSearch";
let isModified = false;
const GenerateInvoice = (props) => {
  const [formData, setFormData] = useState(props.mainData?.formData || {});
  const [typeToHide, setTypeToHide] = useState("date");

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
      <form>
        <div className="flex flex-wrap">
          {props.fields.map(
            (obj, index) =>
              typeToHide !== obj.type && (
                <div className="px-2 mt-2" key={index}>
                  <label htmlFor={obj.key}>{obj.name}</label>
                  {obj.key === "company_name" ? (
                    <DropdownWithSearch
                      heading={"Select Company"}
                      listData={props.companyList}
                      selectedValue={formData[obj.key]}
                      name={obj.key}
                      onChange={handelChange}
                      onBlur={(e) => props.onFieldBlur(e, true)}
                      keyToMatch="company_name"
                      extraReqKey={["id"]}
                      isError={!!props.validationObj[obj.key]?.msg}
                      errMsg={props.validationObj[obj.key]?.msg}
                    />
                  ) : (
                    <input
                      className="form-control"
                      type={obj.type}
                      name={obj.key}
                      placeholder={obj.name}
                      value={formData[obj.key]}
                      onChange={(e) => handelChange(e, true)}
                    />
                  )}
                </div>
              )
          )}
        </div>
        <div className="mt-3 flex flex-middle">
          <label htmlFor="check">Want invoice for date instead?</label>
          <input
            type="checkbox"
            name="check"
            className="ml-2 form-control"
            onChange={() => setTypeToHide(typeToHide === "date" ? "month" : "date")}
          />
        </div>
      </form>
    </div>
  );
};

export default GenerateInvoice;
