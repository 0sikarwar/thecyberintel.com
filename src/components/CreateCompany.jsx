import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import RenderReteList from "./RenderReteList";
import { destinationGroupList } from "../utils/dataEntryHelper";
const initalRatesObj = {
  destination: "",
  upto250Gms: "",
  upto500Gms: "",
  upto1Kg: "",
  above1kgSur: "",
  above1KgAir: "",
};
let isModified = false;
const CreateCompany = (props) => {
  const [formData, setFormData] = useState(props.mainData?.formData || {});
  const [rateList, setRateList] = useState(props.mainData?.rateList || []);
  const handelChange = (e, isNonRateElement) => {
    const element = e.target;
    isModified = true;
    props.setValidationObj({ ...props.validationObj, [element.name]: null });
    if (isNonRateElement) {
      setFormData({ ...formData, [element.name]: element.value });
      return;
    }
    const currentRateList = [...rateList];
    currentRateList[element.dataset.id][element.name] = element.value || "";
    setRateList(currentRateList);
  };
  useEffect(() => {
    if (isModified && (Object.keys(formData).length || rateList.length)) {
      props.setMainData({ formData, rateList });
    }
  }, [formData, rateList]);

  const handelRemove = () => {
    const confirmMsg = "Are you sure? You want to remove last row.";
    if (window.confirm(confirmMsg)) {
      setRateList(rateList.slice(0, -1));
    }
  };
  return (
    <div>
      <form>
        <div className="flex">
          {props.fields.map((obj, index) => (
            <div className="px-2" key={index}>
              <label htmlFor={obj.key}>{obj.name}</label>
              <input
                className={`form-control ${props.validationObj[obj.key]?.msg ? "bc-error" : ""}`}
                type={obj.type}
                name={obj.key}
                placeholder={obj.name}
                value={formData[obj.key]}
                onChange={(e) => handelChange(e, true)}
                onBlur={(e) => props.onFieldBlur(e, true)}
              />
              {props.validationObj[obj.key]?.msg && (
                <p className="c-error fs-11 mb-1 mt-1">{props.validationObj[obj.key]?.msg}</p>
              )}
            </div>
          ))}
        </div>
        <div className="rate-list mb-8 mt-16">
          <RenderReteList {...props} rateList={rateList} handelChange={handelChange} />
        </div>
        <div className="px-2">
          {rateList.length !== destinationGroupList.length && (
            <Button
              variant="outline-primary"
              onClick={() => setRateList([...rateList, { ...initalRatesObj }])}
              disabled={
                !formData.company_name ||
                (rateList.length &&
                  !Object.values(rateList[rateList.length - 1])
                    .join("")
                    .trim())
              }
            >
              Add new rate
            </Button>
          )}
          {rateList.length > 1 && (
            <Button variant="outline-danger" className="ml-2" onClick={handelRemove}>
              Remove Last row
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateCompany;
