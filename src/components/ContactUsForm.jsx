import { useState } from "react";
import { saveContactData } from "../utils/axiosCalls";
import Pageloader from "./Pageloader";
import RenderToast from "./Toast";

export default function ContactUsForm(props) {
  const extraFields = props.extraFields || [];
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ type: "", heading: "", msg: "" });
  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowToast(false);
    const form = event.target;
    const data = new FormData(form);
    const formData = {};
    for (const [key, value] of data.entries()) {
      if (!value) {
        setShowToast(true);
        setToastData({
          type: "danger",
          heading: "All fields are required",
          msg: "Please fill values in all fields and try again",
        });
        return;
      }
      formData[key] = value;
    }
    setLoading(true);
    const res = await saveContactData(formData);
    if (res.data.status === "SUCCESS") {
      event.target.reset();
      setShowToast(true);
      setToastData({
        type: "success",
        heading: "Query recieved",
        msg: "We have recoded you query and will get back to you soon",
      });
    } else {
      setShowToast(true);
      setToastData({ type: "danger", heading: "Oh snap!", msg: "Something went wrong please try again" });
    }
    setLoading(false);
    console.log(res);
  };
  return (
    <>
      <RenderToast showToast={showToast} setShowToast={setShowToast} {...toastData} />
      {loading && <Pageloader title="Please wait" message="Saving you query..." />}
      <div>
        <div className={`my-5 ${props.className}`}>
          <h1 className={props.headingClassName || "c-tr mt-2"}>{props.heading || "Contact Us"}</h1>
          <form className="mt-3" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group mt-2">
                  <input className="form-control" type="text" name="name" placeholder="Name" />
                </div>
              </div>
              {extraFields.includes("bName") && (
                <div className="col-lg-12">
                  <div className="form-group mt-2">
                    <input className="form-control" type="text" name="bname" placeholder="Business name" />
                  </div>
                </div>
              )}
              <div className="col-lg-12">
                <div className="form-group mt-2">
                  <input className="form-control" type="email" name="email" placeholder="Email address" />
                </div>
              </div>
              {extraFields.includes("phone") && (
                <div className="col-lg-12">
                  <div className="form-group mt-2">
                    <input className="form-control" type="tel" name="phone" placeholder="Phone" />
                  </div>
                </div>
              )}
              <div className="col-lg-12">
                <div className="form-group mt-2">
                  <textarea className="form-control" name="msg" rows="3" placeholder="Message"></textarea>
                </div>
              </div>
              <div className="col-lg-12 d-flex align-items-center mt-2">
                <button type="submit" className="btn bg-sc c-white text-inverse px-3 py-2 hover-bolder">
                  <span> {props.buttonText || "Submit"}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
