import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { addDocketLabels, inputFiledDataTypes } from "../utils/dataEntryHelper";
import DropdownWithSearch from "./DropdownWithSearch";
import citiesList from "../utils/citiesOnlyList";
const initalDocketObj = {
  docket_date: "",
  docket_num: "",
  client_name: "",
  destination: "",
  weight: "",
  docket_mode: "Surface",
};
let isModified = false;
const AddDockets = (props) => {
  const [docketList, setDocketList] = useState(props.mainData?.formData || [{ ...initalDocketObj }]);
  const [fieldsWithDropDown, setFieldsWithDropDown] = useState(["destination", "docket_mode"]);
  const [hiddenField, setHiddenField] = useState([]);

  const handelChange = (e) => {
    const element = e.target;
    isModified = true;
    const currentDocketList = [...docketList];
    currentDocketList[element.dataset.id][element.name] = element.value || "";
    props.setValidationObj({ ...props.validationObj, [element.name]: null });
    if (e.extraReqKey) {
      const strToAppend = element.name === "client_name" ? "company_" : "";
      const hiddenFieldArr = [];
      e.extraReqKey.forEach((key) => {
        currentDocketList[element.dataset.id][strToAppend + key] = element[key] || "";
        hiddenFieldArr.push(strToAppend + key);
      });
      setHiddenField(hiddenFieldArr);
    }
    setDocketList(currentDocketList);
  };

  useState(() => {
    if (props.isCashBooking) {
      const currentDocketList = [...docketList];
      currentDocketList[0].amount = "";
      setDocketList(currentDocketList);
    } else if (props.companyList) {
      setFieldsWithDropDown([...fieldsWithDropDown, "client_name"]);
    }
  }, []);
  useEffect(() => {
    if (isModified) {
      props.setMainData({ formData: docketList });
    }
  }, [docketList]);
  const handelRemove = () => {
    const confirmMsg = "Are you sure? You want to remove last row.";
    if (window.confirm(confirmMsg)) {
      setDocketList(docketList.slice(0, -1));
    }
  };

  const handleAddNewClick = () => {
    const objToPush = { ...initalDocketObj };
    if (props.isCashBooking) {
      objToPush.amount = "";
    }
    setDocketList([...docketList, { ...objToPush }]);
  };
  return (
    <div>
      <form>
        <div className="rate-list mb-8 mt-16">
          {docketList.map((obj, index) => {
            return (
              <div
                className={`rate-row flex ${props.isCashBooking ? "" : "flex-wrap"} ${index % 2 ? "bg-lightBlue" : ""}`}
                key={index}
              >
                {Object.keys(obj).map((field, fieldIndex) => {
                  let listData = citiesList,
                    keyToMatch = "",
                    extraReqKey = null;
                  if (field === "client_name") {
                    listData = props.companyList;
                    keyToMatch = "company_name";
                    extraReqKey = ["id"];
                  } else if (field === "docket_mode") {
                    listData = ["Surface", "Air"];
                  }
                  if (hiddenField.includes(field)) return null;
                  return (
                    <div className="px-2 mb-8 mt-8" key={field + index + "box"}>
                      <span className={`row-label ${index ? "d-lg-none" : ""}`}>{addDocketLabels[field]}</span>
                      {fieldsWithDropDown.includes(field) ? (
                        <DropdownWithSearch
                          heading={addDocketLabels[field]}
                          listData={listData}
                          selectedValue={docketList[index][field]}
                          name={field}
                          id={index}
                          onChange={handelChange}
                          keyToMatch={keyToMatch}
                          extraReqKey={extraReqKey}
                          onBlur={props.onFieldBlur}
                          isError={props.validationObj[field]?.index === index}
                          errMsg={props.validationObj[field]?.msg}
                          hideSearch={field === "docket_mode"}
                          autoFocus={!fieldIndex}
                        />
                      ) : (
                        <div>
                          <input
                            key={field + index}
                            className={`form-control ${props.validationObj[field]?.index === index ? "bc-error" : ""}`}
                            name={field}
                            placeholder={field === "docket_date" ? "dd/mm/yy" : addDocketLabels[field]}
                            onChange={handelChange}
                            data-id={index}
                            value={docketList[index][field]}
                            onBlur={props.onFieldBlur}
                            {...(inputFiledDataTypes[field] || {})}
                            autoFocus={!fieldIndex}
                          />
                          {props.validationObj[field]?.index === index && (
                            <p className="c-error fs-11 mb-1 mt-1">{props.validationObj[field]?.msg}</p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="px-2">
          <Button
            variant="outline-primary"
            onClick={handleAddNewClick}
            disabled={
              !Object.values(docketList[docketList.length - 1])
                .join("")
                .trim() ||
              Object.values(docketList[docketList.length - 1])
                .join("")
                .trim() === "Surface"
            }
          >
            Add new docket
          </Button>
          {docketList.length > 1 && (
            <Button variant="outline-danger" className="ml-2" onClick={handelRemove}>
              Remove Last row
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddDockets;
