import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Pageloader from "../components/Pageloader";
import { verifyEmail } from "../utils/axiosCalls";

const Verify = (props) => {
  const { token } = useParams();
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();
  const makeVerifyEmailCall = async () => {
    try {
      const res = await verifyEmail(token);
      setStatus("success");
      props.setUserDetails(res.data.userDetails);
      setTimeout(() => navigate("/"), 8000);
    } catch (error) {
      setTimeout(() => navigate("/"), 10000);
      setStatus("failed");
      console.log("error", error);
    }
  };
  useEffect(() => {
    makeVerifyEmailCall();
  }, []);
  return status === "loading" ? (
    <Pageloader title="Please wait" message="verifying..." />
  ) : status === "success" ? (
    <div className="text-success fs-3 fw-bold text-center my-5 py-60"> Email verifed Successfully</div>
  ) : (
    <div className="text-warning-emphasis fs-3 fw-bold text-center my-5 py-60">
      Something went wrong try again with
      <br /> new validation link
    </div>
  );
};

export default Verify;
