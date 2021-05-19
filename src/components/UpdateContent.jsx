import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import citiesList from "../utils/citiesOnlyList";
import { comapnyDataLabel, destinationGroupList } from "../utils/dataEntryHelper";
import DropdownWithSearch from "./DropdownWithSearch";
import { getListToUpdate } from "../utils/dataEntryModalHelper";
import RenderDocketList from "./RenderDocketList";
import RenderReteList from "./RenderReteList";
const initalRatesObj = {
  destination: "",
  upto250Gms: "",
  upto500Gms: "",
  upto1Kg: "",
  above1kgSur: "",
  above1KgAir: "",
};
let isModified = false;
const UpdateDocket = (props) => {
  const [formData, setFormData] = useState(props.mainData?.formData || {});
  const [extraFormFields, setExtraFormFields] = useState({});
  const [listToUpdate, setListToUpdate] = useState([]);
  const [fetchedComapnyDetails, setFetchedComapnyDetails] = useState(null);
  const [fieldsWithDropDown, setFieldsWithDropDown] = useState(["destination", "docket_mode", "company_name"]);
  const [hiddenField, setHiddenField] = useState(["company_id"]);
  const [fetchedListLen, setFetchedListLen] = useState(0);

  const handelChange = (e, isNonRateElement) => {
    const element = e.target;
    isModified = true;
    props.setValidationObj({ ...props.validationObj, [element.name]: null });
    if (isNonRateElement) {
      const currentFormData = { ...formData };
      if (e.extraReqKey) {
        const strToAppend = element.name === "company_name" ? "company_" : "";
        const hiddenFieldArr = [...hiddenField];
        e.extraReqKey.forEach((key) => {
          currentFormData[strToAppend + key] = element[key] || "";
          hiddenFieldArr.push(strToAppend + key);
        });
        setHiddenField(hiddenFieldArr);
      }
      setFormData({ ...currentFormData, [element.name]: element.value });
      return;
    }
    const currentList = [...listToUpdate];
    currentList[element.dataset.id][element.name] = element.value || "";
    props.setValidationObj({ ...props.validationObj, [element.name]: null });
    if (e.extraReqKey) {
      const strToAppend = element.name === "client_name" ? "company_" : "";
      const hiddenFieldArr = [];
      e.extraReqKey.forEach((key) => {
        currentList[element.dataset.id][strToAppend + key] = element[key] || "";
        hiddenFieldArr.push(strToAppend + key);
      });
      setHiddenField(hiddenFieldArr);
    }
    setListToUpdate(currentList);
  };
  useEffect(() => {
    if (isModified && (Object.keys(formData).length || listToUpdate.length)) {
      props.setMainData({
        formData,
        listToUpdate,
        fetchedListLen,
        companyDetails: fetchedComapnyDetails,
        extraFormFields,
      });
    }
  }, [formData, listToUpdate, fetchedListLen, fetchedComapnyDetails, extraFormFields]);
  const handleGetEntryClick = async () => {
    const { fetchedList, companyDetails } = await getListToUpdate(props.modalType, formData, props.companyList);
    if (!fetchedList.length) {
      props.setShowToast(true);
      props.setToastData({
        type: companyDetails ? "warning" : "danger",
        heading: "Oh snap!",
        msg: companyDetails
          ? "Rate list not available for given Party."
          : "Data not available for given key. Try another one.",
      });
    }
    setFetchedListLen(fetchedList.length);
    setListToUpdate(fetchedList);
    setFetchedComapnyDetails(companyDetails);
  };
  const handelRemove = () => {
    const confirmMsg = "Are you sure? You want to remove last row.";
    if (window.confirm(confirmMsg)) {
      setListToUpdate(listToUpdate.slice(0, -1));
      props.setValidationObj({});
    }
  };

  return (
    <div>
      <form>
        <div className="flex">
          {props.fields.map((obj, index) => {
            let listData = citiesList,
              keyToMatch = "",
              extraReqKey = null;
            if (obj.key === "company_name") {
              listData = props.companyList;
              keyToMatch = "company_name";
              extraReqKey = ["id"];
            }
            if (hiddenField.includes(obj.key)) return null;
            return (
              <div className="px-2" key={index}>
                <label htmlFor={obj.key}>{obj.name}</label>
                {fieldsWithDropDown.includes(obj.key) ? (
                  <DropdownWithSearch
                    heading={obj.name}
                    listData={listData}
                    selectedValue={formData[obj.key]}
                    name={obj.key}
                    id={index}
                    onChange={(e) => handelChange(e, true)}
                    keyToMatch={keyToMatch}
                    extraReqKey={extraReqKey}
                    onBlur={props.onFieldBlur}
                    isError={props.validationObj[obj.key]?.index === index}
                    errMsg={props.validationObj[obj.key]?.msg}
                    autoFocus={!index}
                    disabled={listToUpdate.length}
                  />
                ) : (
                  <div>
                    <input
                      className={`form-control ${props.validationObj[obj.key]?.msg ? "bc-error" : ""}`}
                      type={obj.type}
                      name={obj.key}
                      placeholder={obj.name}
                      value={formData[obj.key]}
                      onChange={(e) => {
                        if (obj.key === "docket_num" || obj.key === "company_gst")
                          e.target.value = e.target.value.toUpperCase();
                        handelChange(e, true);
                      }}
                      onBlur={(e) => props.onFieldBlur(e, true)}
                      disabled={listToUpdate.length}
                    />
                    {props.validationObj[obj.key]?.msg && (
                      <p className="c-error fs-11 mb-1 mt-1">{props.validationObj[obj.key]?.msg}</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {fetchedComapnyDetails && (
          <div className="px-2 flex flex-wrap flex-around mt-2 mb-2">
            {Object.keys(fetchedComapnyDetails).map(
              (key, index) =>
                key !== "id" && (
                  <div>
                    <label htmlFor={"new_" + key}>{comapnyDataLabel[key]}</label>
                    <div key={index}>
                      <input
                        className={`form-control ${props.validationObj["new_" + key]?.msg ? "bc-error" : ""}`}
                        name={"new_" + key}
                        value={fetchedComapnyDetails[key]}
                        onChange={(e) => {
                          setFetchedComapnyDetails({ ...fetchedComapnyDetails, [key]: e.target.value });
                        }}
                        onBlur={(e) => props.onFieldBlur(e, true)}
                      />
                      {props.validationObj["new_" + key]?.msg && (
                        <p className="c-error fs-11 mb-1 mt-1">{props.validationObj["new_" + key]?.msg}</p>
                      )}
                    </div>
                  </div>
                )
            )}
          </div>
        )}
        <div className="rate-list mb-8 mt-16">
          {props.modalType === "update_party_data" ? (
            <RenderReteList
              {...props}
              rateList={listToUpdate}
              handelChange={handelChange}
              fetchedListLen={fetchedListLen}
              isUpdate
            />
          ) : (
            <RenderDocketList
              {...props}
              handelChange={handelChange}
              list={listToUpdate}
              fieldsWithDropDown={fieldsWithDropDown}
              hiddenField={hiddenField}
              isUpdate
            />
          )}
        </div>
        <div className="px-2">
          {!listToUpdate.length && !fetchedComapnyDetails ? (
            <Button
              variant="outline-primary"
              onClick={handleGetEntryClick}
              disabled={!Object.keys(formData).length || Object.values(formData).filter((val) => !val).length}
            >
              Get Current Entry
            </Button>
          ) : (
            ((fetchedComapnyDetails && !listToUpdate.length) ||
              (listToUpdate.length !== destinationGroupList.length && props.modalType === "update_party_data")) && [
              <Button
                key="1"
                variant="outline-primary"
                onClick={() => setListToUpdate([...listToUpdate, { ...initalRatesObj }])}
              >
                Add new rate
              </Button>,
              fetchedListLen < listToUpdate.length && (
                <Button key="2" variant="outline-danger" className="ml-2" onClick={handelRemove}>
                  Remove Last row
                </Button>
              ),
            ]
          )}
        </div>
        {(fetchedComapnyDetails || !!listToUpdate.length) && (
          <div className="flex bg-silver py-4 mt-2">
            {props.extraFieldsToUpdate.map((obj, index) => (
              <div className={`px-2 ${obj.type === "checkbox" ? "flex flex-middle flex-row-reverse" : ""}`} key={index}>
                <label htmlFor={obj.key}>{obj.name}</label>
                <input
                  className="form-control"
                  type={obj.type}
                  name={obj.key}
                  placeholder={obj.name}
                  value={extraFormFields[obj.key]}
                  checked={obj.type === "checkbox" ? extraFormFields[obj.key] : undefined}
                  onChange={(e) => {
                    setExtraFormFields({
                      ...extraFormFields,
                      [obj.key]: obj.type === "checkbox" ? !extraFormFields[obj.key] : e.target.value,
                    });
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default UpdateDocket;
