import React, { useEffect, useState } from "react";
import citiesList from "../utils/citiesOnlyList";
import DropdownWithSearch from "./DropdownWithSearch";

const BulkEntry = (props) => {
  const [fieldsWithDropDown, setFieldsWithDropDown] = useState(["destination", "docket_mode", "client_name"]);
  const [hiddenField, setHiddenField] = useState([]);
  const [data, setData] = useState({});

  const handelChange = (e) => {
    const element = e.target;
    const currentData = { ...data };
    currentData[element.name] = element.value;
    if (e.extraReqKey) {
      const strToAppend = element.name === "client_name" ? "company_" : "";
      const hiddenFieldArr = [];
      e.extraReqKey.forEach((key) => {
        currentData[strToAppend + key] = element[key] || "";
        hiddenFieldArr.push(strToAppend + key);
      });
      setHiddenField(hiddenFieldArr);
    }
    setData(currentData);
  };

  useEffect(() => {
    props.setMainData(data);
  }, [data]);

  return (
    <div>
      {props.fields.map((obj, index) => {
        let listData = citiesList,
          keyToMatch = "",
          extraReqKey = null;
        if (obj.key === "client_name") {
          listData = props.companyList;
          keyToMatch = "company_name";
          extraReqKey = ["id"];
        } else if (obj.key === "docket_mode") {
          listData = ["Surface", "Air"];
        }
        if (hiddenField.includes(obj.key)) return null;
        return (
          <div className="px-2 mt-2" key={index}>
            <label htmlFor={obj.key}>{obj.name}</label>
            {fieldsWithDropDown.includes(obj.key) ? (
              <DropdownWithSearch
                heading={obj.name}
                listData={listData}
                selectedValue={data[obj.key]}
                name={obj.key}
                id={index}
                onChange={handelChange}
                keyToMatch={keyToMatch}
                extraReqKey={extraReqKey}
                onBlur={props.onFieldBlur}
                hideSearch={obj.key === "docket_mode"}
                autoFocus={!index}
              />
            ) : (
              <textarea
                className="form-control"
                name={obj.key}
                placeholder={obj.name}
                value={data[obj.key]}
                onChange={(e) => {
                  if (obj.key === "company_gst") e.target.value = e.target.value.toUpperCase();
                  handelChange(e, true);
                }}
                onBlur={(e) => props.onFieldBlur(e, true)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BulkEntry;
