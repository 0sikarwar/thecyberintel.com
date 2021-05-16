import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import RenderDocketList from "./RenderDocketList";
import { getInitalDocketObj } from "../utils/dataEntryHelper";
let isModified = false;
const AddDockets = (props) => {
  const [docketList, setDocketList] = useState(
    props.mainData?.formData || [{ ...getInitalDocketObj(props.isCashBooking) }]
  );
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
      props.setValidationObj({});
    }
  };

  const handleAddNewClick = () => {
    setDocketList([...docketList, { ...getInitalDocketObj(props.isCashBooking) }]);
  };
  return (
    <div>
      <form>
        <div className="rate-list mb-8 mt-16">
          <RenderDocketList
            {...props}
            handelChange={handelChange}
            list={docketList}
            fieldsWithDropDown={fieldsWithDropDown}
            hiddenField={hiddenField}
          />
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
