import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { updatePassword } from "../utils/axiosCalls";
import { useNavigate, useParams } from "react-router-dom";
import Pageloader from "../components/Pageloader";

const ResetPassword = (props) => {
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pass2Error, setPass2Error] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();
  const handleBlur = () => {
    setPass2Error(pass1 !== pass2);
  };
  const handleSubmit = async () => {
    if (pass1 && pass2 && pass1 === pass2) {
      try {
        setIsLoading(true);
        const resp = await updatePassword({ password: pass1, token });
        if (resp.status === 200) {
          props.setToastData({ type: "success", heading: "Login now", msg: resp.data.msg });
          props.setShowToast(true);
        } else {
          throw "Error";
        }
      } catch (err) {
        props.setToastData({ type: "danger", heading: "Something went wrong please try again later" });
        props.setShowToast(true);
      } finally {
        setTimeout(() => {
          navigate("/");
          props.setModalType("login");
        }, [500]);
      }
    }
  };
  return (
    <div style={{ width: "300px", margin: "50px auto" }}>
      {isLoading && <Pageloader title="Please wait" message="updating..." />}
      <p className="fs-24 fw-bolder"> Create New Password</p>
      <input
        className={`mb-12 form-control`}
        placeholder="New Password"
        name="pass1"
        type="password"
        value={pass1}
        onChange={(e) => setPass1(e.target.value)}
      />
      <input
        className={`mb-12 form-control ${pass2Error ? "bc-error" : ""}`}
        placeholder="Confirm Password"
        type="password"
        name="pass2"
        value={pass2}
        onChange={(e) => setPass2(e.target.value)}
        onBlur={handleBlur}
      />
      <Button variant="primary" onClick={handleSubmit} disabled={!pass1 || !pass2 || pass2Error} className="mr-4">
        Update password
      </Button>
    </div>
  );
};

export default ResetPassword;
