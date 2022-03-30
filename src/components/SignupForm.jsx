import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { isValidEmail } from "../utils";
import { registerUser, signinUser } from "../utils/axiosCalls";
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
    const res = props.isLogin
      ? await signinUser(formObj).catch((err) => err.response)
      : await registerUser({ ...formObj, namespace: "thecyberintel.com" }).catch((err) => err.response);
    if (res.data.msg) {
      props.setShowToast(true);
      props.setToastData({
        type: res.data.success ? "success" : "danger",
        heading: "",
        msg: res.data.msg,
      });
    }
    if (res.data.success) {
      props.setUserDetails(res.data.userDetails);
      localStorage.setItem("userDetails", res.data.userDetails);
      props.setModalType("");
    } else {
      setValidationObj({ ...validationObj, [res.data.errField]: res.data.msg });
    }
    setLoading(false);
  };
  useEffect(() => {
    if (props.isLogin) {
      setFormFiled(["Email", "Password"]);
    } else {
      setFormFiled(["Name", "Email", "Password"]);
    }
    setFormObj({ ...formObj, password: "" });
  }, [props.isLogin]);
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
              type={field === "name" ? undefined : field}
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
        >
          {props.isLogin ? "Login" : "Register"}
        </Button>
        <span className="fs-13 pl-1">
          {props.isLogin ? (
            <>
              Don't have an Account?
              <span className="link pl-1" onClick={() => props.setModalType("register")}>
                Register
              </span>
            </>
          ) : (
            <>
              Already have an Account?
              <span className="link pl-1" onClick={() => props.setModalType("login")}>
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
