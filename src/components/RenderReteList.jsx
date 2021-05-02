import { destinationGroupList, rateListLabels, inputFiledDataTypes } from "../utils/dataEntryHelper";
import DropdownWithSearch from "./DropdownWithSearch";

const RenderReteList = (props) => {
  return props.rateList.map((obj, index) => {
    return (
      <div className={`rate-row flex flex-wrap ${index % 2 ? "bg-lightBlue" : ""}`} key={index}>
        {Object.keys(obj).map((field) => (
          <div className="px-2 mb-8 mt-8" key={field + index + "box"}>
            <span className={`row-label ${index ? "d-lg-none" : ""}`}>{rateListLabels[field]}</span>
            {field === "destination" ? (
              <DropdownWithSearch
                heading={rateListLabels[field]}
                listData={destinationGroupList}
                selectedValue={props.rateList[index][field]}
                name={field}
                id={index}
                onChange={props.handelChange}
                onBlur={props.onFieldBlur}
                isError={props.validationObj[field]?.index === index}
                errMsg={props.validationObj[field]?.msg}
                disabled={props.fetchedListLen && index < props.fetchedListLen}
              />
            ) : (
              <div>
                <input
                  key={field + index}
                  className={`form-control ${props.validationObj[field]?.index === index ? "bc-error" : ""}`}
                  name={field}
                  placeholder={rateListLabels[field]}
                  onChange={props.handelChange}
                  data-id={index}
                  value={props.rateList[index][field]}
                  onBlur={props.onFieldBlur}
                  {...(inputFiledDataTypes[field] || {})}
                />
                {props.validationObj[field]?.index === index && (
                  <p className="c-error fs-11 mb-1 mt-1">{props.validationObj[field]?.msg}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  });
};

export default RenderReteList;
