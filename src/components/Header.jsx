import { useEffect, useRef, useState } from "react";
import { Nav, Navbar, NavDropdown, Button, ButtonGroup, Dropdown } from "react-bootstrap";
import { useLocation } from "react-router";
import { ReactComponent as Icon } from "../assets/CiLogo.svg";
import history from "../history";
import { checkMobileDevice } from "../utils";

export default function Header(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const navBarRef = useRef();
  const location = useLocation();
  const handleScroll = (e) => {
    const scrollOffset = checkMobileDevice() ? 5 : 90;
    if (window.scrollY > scrollOffset) {
      document.getElementById("header").classList.add("solid");
      document.getElementById("header").classList.add("shadow");
    } else {
      document.getElementById("header").classList.remove("solid");
      document.getElementById("header").classList.remove("shadow");
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!["/", "/web-design", "/seo", "/cep"].includes(location.pathname)) {
      document.getElementById("header").classList.add("solid");
      document.getElementById("header").classList.add("shadow");
    } else {
      document.getElementById("header").classList.remove("solid");
      document.getElementById("header").classList.remove("shadow");
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [location.pathname]);
  return (
    <Navbar expand="lg" sticky="top" className="flex flex-between wt-100p shadow" id="header" expanded={expanded}>
      <Navbar.Brand href="#/" className="f-small-caps">
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
      <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
      <Navbar.Collapse id="basic-navbar-nav" ref={navBarRef}>
        <Nav className="ml-auto">
          <Nav.Link href="#/" data-toggle="collapse" data-target="#basic-navbar-nav" onClick={() => setExpanded(false)}>
            HOME
          </Nav.Link>
          <div
            className="grouped-dropdown"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <NavDropdown
              title="SERVICES"
              id="basic-nav-dropdown1"
              alignRight
              show={showDropdown}
              onClick={() => {
                // setExpanded(false);
                history.push("/services");
              }}
            >
              <NavDropdown.Item href="#/web-design" onClick={() => setExpanded(false)}>
                Web Design & Devlopment
              </NavDropdown.Item>
              {/* <NavDropdown.Item href="#/seo">SEO Services</NavDropdown.Item> */}
              {/* <NavDropdown.Item href="#/cep">Common Employee Portal</NavDropdown.Item> */}
            </NavDropdown>
          </div>
          {/* <Nav.Link href="#/about">ABOUT US</Nav.Link> */}
          <Nav.Link href="#/contact" onClick={() => setExpanded(false)}>
            CONTACT US
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
