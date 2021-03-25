import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ReactComponent as Icon } from "../assets/CiLogo.svg";

export default function Footer() {
  return (
    <footer class="footer-distributed mt-32">
      <div class="footer-left">
        <Navbar.Brand href="#/" className="f-small-caps c-white">
          <div className="flex flex-middle">
            <div className="bg-white in-block mr-8 br-5">
              <Icon width="44px" height="44px" />
            </div>
            <div className="company-name lh-22 fs-32">
              <p className="m-0 mb-1 name">The Cyberintel</p>
              <p className="f-small-caps m-0 fs-14 lh-10 tag-line">Providing affordable IT solutions</p>
            </div>
          </div>
        </Navbar.Brand>

        <p class="footer-links">
          <a href="#/" class="link-1">
            Home
          </a>

          <a href="#/services">Services</a>

          {/* <a href="#">About</a> */}

          <a href="#/contact">Contact</a>
        </p>

        <p class="footer-company-name">The Cyberintel © 2021</p>
      </div>

      <div class="footer-center">
        <div>
          <i class="fa fa-map-marker" aria-hidden="true"></i>
          <p>
            <span>Mohali</span> Punjab, India
          </p>
        </div>

        <div>
          <i class="fa fa-phone"></i>
          <p>+91 7889 212 126</p>
        </div>

        <div>
          <i class="fa fa-envelope"></i>
          <p>
            <a href="mailto:support@company.com" className="c-white">
              contactus@thecyberintel.com
            </a>
          </p>
        </div>
      </div>

      <div class="footer-right">
        <p class="footer-company-about">
          <span>About the company</span>
          We’re a team of young & professional, expertise in Web Development and Technical Support. We help businesses
          fully grasp the fast-developing Digital Age through creative innovation, intelligent design and project
          delivery.
        </p>

        <div class="footer-icons">
          <a href="#">
            <i class="fa fa-facebook"></i>
          </a>
          <a href="#">
            <i class="fa fa-twitter"></i>
          </a>
          <a href="#">
            <i class="fa fa-linkedin"></i>
          </a>
          <a href="#">
            <i class="fa fa-github"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
