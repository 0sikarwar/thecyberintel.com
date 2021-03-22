import { Nav, Navbar, NavDropdown } from "react-bootstrap";
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
          <a href="#" class="link-1">
            Home
          </a>

          <a href="#">Blog</a>

          <a href="#">Pricing</a>

          <a href="#">About</a>

          <a href="#">Faq</a>

          <a href="#">Contact</a>
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
          Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus
          vehicula sit amet.
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
