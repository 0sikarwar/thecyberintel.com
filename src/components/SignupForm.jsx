import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { isValidEmail } from "../utils";
import { forgotPassword, registerUser, signinUser } from "../utils/axiosCalls";
import Pageloader from "./Pageloader";
const SignupForm = (props) => {
  const [formFiled, setFormFiled] = useState([]);
  const [formObj, setFormObj] = useState({});
  const [validationObj, setValidationObj] = useState({});
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const field = e.target.name;
    setFormObj({ ...formObj, [field]: e.target.value });
    setValidationObj({ ...validationObj, [field]: undefined });
  };
  const handleBlur = (e) => {
    const field = e.target.name;
    const val = e.target.value;
    const currentObj = { ...validationObj };
    if (!val) {
      currentObj[field] = `${field} is Required`;
    } else if (field === "email" && !isValidEmail(val)) {
      currentObj[field] = `please enter a valid email`;
    }
    setValidationObj(currentObj);
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    props.setShowToast(false);

    const res =
      props.modalType === "login"
        ? await signinUser(formObj).catch((err) => err.response)
        : props.modalType === "register"
        ? await registerUser({ ...formObj, namespace: "thecyberintel.com" }).catch((err) => err.response)
        : await forgotPassword({ email: formObj.email });
    if (res.data.msg) {
      props.setShowToast(true);
      props.setToastData({
        type: res.status === 200 ? "success" : "danger",
        heading: "",
        msg: res.data.msg,
      });
    }
    if (res.status === 200) {
      if (props.modalType === "login") {
        props.setUserDetails(res.data.userDetails);
      }
      props.setModalType("");
    } else if (res.data.errField) {
      setValidationObj({ ...validationObj, [res.data.errField]: res.data.msg });
    }
    setLoading(false);
  };
  useEffect(() => {
    if (props.modalType === "login") {
      setFormFiled(["Email", "Password"]);
    } else if (props.modalType === "register") {
      setFormFiled(["Name", "Email", "Password"]);
    } else {
      setFormFiled(["Email"]);
    }
    setFormObj({ ...formObj, password: "" });
  }, [props.modalType]);
  return (
    <div className="">
      {formFiled.map((key, index) => {
        const field = key.toLowerCase();
        return (
          <div key={index}>
            <input
              className={`mb-12 form-control ${validationObj[field] ? "bc-error" : ""}`}
              name={field}
              placeholder={key}
              type={field === "name" ? undefined : field.toLowerCase()}
              value={formObj[field] || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {/* {validationObj[field] && <p className="c-error fs-11 mb-1 mt-1">{validationObj[field]}</p>} */}
          </div>
        );
      })}
      <div>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={
            Object.values(validationObj).filter(Boolean).length ||
            Object.values(formObj).filter(Boolean).length !== formFiled.length
          }
          className="mr-4"
        >
          {props.modalType === "login" ? "Login" : props.modalType === "register" ? "Register" : "Reset password"}
        </Button>
        <span className="fs-13 pl-1">
          {props.modalType === "login" ? (
            <>
              <span className="link pl-4" onClick={() => props.setModalType("forgot")}>
                Forgot Password?
              </span>
              <div className="mt4">
                Don't have an Account?
                <span className="link pl-4" onClick={() => props.setModalType("register")}>
                  Register
                </span>
              </div>
            </>
          ) : (
            <>
              {props.modalType === "Register" && "Already have an Account?"}
              <span className="link pl-4" onClick={() => props.setModalType("login")}>
                Log in
              </span>
            </>
          )}
        </span>
        {loading && <Pageloader title="Please wait" message="loading..." />}
      </div>
    </div>
  );
};

export default SignupForm;
