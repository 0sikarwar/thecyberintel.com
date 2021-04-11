/* eslint-disable jsx-a11y/anchor-is-valid */
import { Navbar } from "react-bootstrap";
import { ReactComponent as TciIcon } from "../assets/CiLogo.svg";
import { ReactComponent as PhoneIcon } from "../assets/phone.svg";
import { ReactComponent as LocationIcon } from "../assets/location.svg";
import { ReactComponent as EmailIcon } from "../assets/email.svg";

export default function Footer() {
  return (
    <footer className="footer-distributed mt-32">
      <div className="footer-left">
        <Navbar.Brand href="#/" className="f-small-caps c-white">
          <div className="flex flex-middle">
            <div className="bg-white in-block mr-8 br-5">
              <TciIcon width="44px" height="44px" />
            </div>
            <div className="company-name lh-22 fs-32">
              <p className="m-0 mb-1 name">The Cyberintel</p>
              <p className="f-small-caps m-0 fs-14 lh-10 tag-line">Providing affordable IT solutions</p>
            </div>
          </div>
        </Navbar.Brand>

        <p className="footer-links">
          <a href="#/" className="link-1">
            Home
          </a>

          <a href="#/services">Services</a>

          {/* <a href="#">About</a> */}

          <a href="#/contact">Contact</a>
        </p>

        <p className="footer-company-name">The Cyberintel © 2021</p>
      </div>

      <div className="footer-center">
        <div>
          <LocationIcon width="24px" height="24px" />
          <p>Mohali Punjab, India</p>
        </div>

        <div>
          <PhoneIcon width="24px" height="24px" />
          <p>
            <a href="tel:+917889212126" className="c-white">
              +91 78892 12126
            </a>
          </p>
        </div>

        <div>
          <EmailIcon width="24px" height="24px" />
          <p>
            <a href="mailto:contact@thecyberintel.com" className="c-white">
              contact@thecyberintel.com
            </a>
          </p>
        </div>
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <span>About the company</span>
          We’re a team of young & professional, expertise in Web Development and Technical Support. We help businesses
          fully grasp the fast-developing Digital Age through creative innovation, intelligent design and project
          delivery.
        </p>
      </div>
    </footer>
  );
}
