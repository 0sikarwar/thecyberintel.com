export default function ContactUsForm() {
  return (
    <>
      <div>
        <div className="my-5">
          <h1 className="c-tr mt-2">Contact Us</h1>
          <form className="mt-3">
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group mt-2">
                  <input className="form-control" type="text" placeholder="Name" />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group mt-2">
                  <input className="form-control" type="email" placeholder="Email address" />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group mt-2">
                  <textarea className="form-control" rows="3" placeholder="Message"></textarea>
                </div>
              </div>
              <div className="col-lg-12 d-flex align-items-center mt-2">
                <button type="submit" className="btn bg-sc c-white text-inverse px-3 py-2">
                  <span> Submit</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
