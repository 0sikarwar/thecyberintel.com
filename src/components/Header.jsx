import { useState } from "react";
import Bars from "./Bars";
import { navTextArray } from "../assets/messages/servicesMsgs";
import { ReactComponent as Icon } from "../assets/icons/CiLogo.svg";

function Header() {
  const [isBarClicked, setIsBarClicked] = useState(false);
  const [activeNav, setActiveNav] = useState(navTextArray[0]);
  return (
    <header className="header">
      <div className={`topnav ${isBarClicked ? "responsive" : ""}`}>
        <div className="bg-white p-fixed px-12">
          <Icon width="48px" height="48px" />
        </div>
        <div className="bg-white p-fixed px-12 fake">
          <Icon width="48px" height="48px" />
        </div>
        <Bars onClick={() => setIsBarClicked(!isBarClicked)} isBarClicked={isBarClicked} />
        <div className="navContainer">
          {navTextArray.map((navText, index) => (
            <a
              key={index}
              href={`#${navText.toLowerCase()}`}
              className={activeNav === navText ? "active" : ""}
              onClick={() => setActiveNav(navText)}
            >
              {navText}
            </a>
          ))}
        </div>
      </div>
      <div className="topnav fake">
        <a href={navTextArray[0]}>{navTextArray[0]}</a>
      </div>
    </header>
  );
}

export default Header;
