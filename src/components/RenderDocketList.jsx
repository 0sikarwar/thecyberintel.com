import { addDocketLabels, inputFiledDataTypes } from "../utils/dataEntryHelper";
import DropdownWithSearch from "./DropdownWithSearch";
import citiesList from "../utils/citiesOnlyList";

const RenderDocketList = (props) => {
  return props.list.map((obj, index) => {
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
          if (props.hiddenField.includes(field)) return null;
          return (
            <div className="px-2 mb-8 mt-8" key={field + index + "box"}>
              <span className={`row-label ${index ? "d-lg-none" : ""}`}>{addDocketLabels[field]}</span>
              {props.fieldsWithDropDown.includes(field) ? (
                <DropdownWithSearch
                  heading={addDocketLabels[field]}
                  listData={listData}
                  selectedValue={props.list[index][field]}
                  name={field}
                  id={index}
                  onChange={props.handelChange}
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
                    onChange={(e) => {
                      if (field === "docket_num") e.target.value = e.target.value.toUpperCase();
                      props.handelChange(e);
                    }}
                    maxLength={field === "docket_num" ? 9 : undefined}
                    data-id={index}
                    value={props.list[index][field]}
                    onBlur={props.onFieldBlur}
                    {...(inputFiledDataTypes[field] || {})}
                    autoFocus={!fieldIndex}
                    disabled={props.isUpdate && field === "client_name"}
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
  });
};

export default RenderDocketList;
