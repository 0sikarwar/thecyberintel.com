import { Children, forwardRef, useEffect, useState } from "react";
import { Dropdown, FormControl } from "react-bootstrap";

const CustomMenu = forwardRef(({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
  const [value, setValue] = useState("");
  return (
    <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
      <FormControl
        autoFocus
        className="mx-3 my-2 w-auto"
        placeholder="Type to filter..."
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <ul className="list-unstyled">
        {Children.toArray(children).filter(
          (child) => !value || child.props.children.toLowerCase().includes(value.toLowerCase())
        )}
      </ul>
    </div>
  );
});

function DropdownWithSearch(props) {
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    if (searchValue && searchValue.length > 2) {
      const item = props.listData.filter((obj) => {
        if (props.keyToMatch) return obj[props.keyToMatch].toLowerCase().includes(searchValue.toLowerCase());
        else return obj.toLowerCase().includes(searchValue.toLowerCase());
      })[0];
      item && handleClick(item);
    }
  }, [searchValue]);
  useEffect(() => {
    if (props.prevValue) {
      handleClick(props.prevValue);
    }
  }, []);
  const handleClick = (item) => {
    const { name, id, extraReqKey, keyToMatch } = props;
    const e = { target: { name, value: keyToMatch ? item[keyToMatch] : item, dataset: { id } } };
    if (extraReqKey) {
      extraReqKey.forEach((key) => (e.target[key] = item[key]));
      e.extraReqKey = extraReqKey;
    }
    props.onChange(e);
  };
  const handleToggle = (isOpen, event) => {
    if (!isOpen) {
      const { name, id, selectedValue, onBlur } = props;
      const e = { target: { name, value: event?.target?.text || selectedValue, dataset: { id } } };
      onBlur(e);
    }
  };
  const handleKeyUp = (e) => {
    const keyCode = e.which ? e.which : e.keyCode;
    if (!((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32) && e.key.length === 1) {
      setSearchValue(searchValue + e.key);
    }
  };
  const handleBlur = (e) => {
    setSearchValue("");
  };
  return (
    <Dropdown onToggle={handleToggle} name={props.name} onKeyUp={handleKeyUp} onBlur={handleBlur} focusFirstItemOnShow>
      <Dropdown.Toggle
        variant="outline-primary"
        id="dropdown-custom-components"
        className={props.isError ? "bc-error" : ""}
        disabled={props.disabled}
      >
        <span className="dropdown-heading">{props.selectedValue || props.heading}</span>
      </Dropdown.Toggle>
      {props.isError && <p className="c-error fs-11 mb-1 mt-1">{props.errMsg}</p>}
      {props.hideSearch ? (
        <Dropdown.Menu>
          {props.listData.map((item, index) => (
            <Dropdown.Item
              className={`${index % 2 ? "bg-lightBlue" : ""}`}
              eventKey={index}
              key={index}
              onClick={() => handleClick(item)}
              active={!props.keyToMatch ? item === props.selectedValue : item[props.keyToMatch] === props.selectedValue}
            >
              {props.keyToMatch ? item[props.keyToMatch] : item}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      ) : (
        <Dropdown.Menu as={CustomMenu} searchValue={searchValue}>
          {props.listData.map((item, index) => (
            <Dropdown.Item
              className={`${index % 2 ? "bg-lightBlue" : ""}`}
              eventKey={index}
              key={index}
              onClick={() => handleClick(item)}
              active={!props.keyToMatch ? item === props.selectedValue : item[props.keyToMatch] === props.selectedValue}
            >
              {props.keyToMatch ? item[props.keyToMatch] : item}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      )}
    </Dropdown>
  );
}

export default DropdownWithSearch;
