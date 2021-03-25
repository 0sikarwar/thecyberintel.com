export default function ContactUsForm(props) {
  const extraFields = props.extraFields || [];
  return (
    <>
      <div>
        <div className={`my-5 ${props.className}`}>
          <h1 className={props.headingClassName || "c-tr mt-2"}>{props.heading || "Contact Us"}</h1>
          <form className="mt-3">
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group mt-2">
                  <input className="form-control" type="text" name="name" placeholder="Name" />
                </div>
              </div>
              {extraFields.includes("bName") && (
                <div className="col-lg-12">
                  <div className="form-group mt-2">
                    <input className="form-control" type="email" name="bName" placeholder="Business name" />
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
                    <input className="form-control" type="email" name="phone" placeholder="Phone" />
                  </div>
                </div>
              )}
              <div className="col-lg-12">
                <div className="form-group mt-2">
                  <textarea className="form-control" rows="3" placeholder="Message"></textarea>
                </div>
              </div>
              <div className="col-lg-12 d-flex align-items-center mt-2">
                <button type="submit" className="btn bg-sc c-white text-inverse px-3 py-2">
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
