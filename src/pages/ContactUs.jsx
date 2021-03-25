import ContactUsForm from "../components/ContactUsForm";

export default function contact() {
  return (
    <div className="container shadow ">
      <div className="row bg-white mt-100">
        <div className="col-lg-6">
          <ContactUsForm />
          <div>Contact us and we will get back to you within 24 hours.</div>
          <div>
            <div className="mt-2">
              <i className="fs-20">The Cyberintel </i>
              <i className="ml-24">Mohali - India. </i>
            </div>
            <div className="mt-2">
              <i className="phone-icon mr-8"></i>
              <a href="tel:+917889212126">+91 78892 12126</a>
              <span className="email-block">
                <i className="email-icon ml-24 mr-8 fs-20"></i>
                <a href="mailto:contact@thecyberintel.com">contact@thecyberintel.com</a>
              </span>
            </div>
          </div>
        </div>
        <div className="col-lg-6 my-3">
          <iframe
            src="https://maps.google.com/maps?q=the%20cyberintel%20daffarpur&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="538"
            frameborder="0"
            style={{ border: "1px solid #fad744" }}
            allowfullscreen
            data-aos="fade-left"
            data-aos-duration="3000"
            title="Google Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
