import { useState } from "react";
import RenderToast from "../components/Toast";
import { getMsgJson } from "../utils";
import { ReactComponent as Icon } from "../assets/CiLogo.svg";
import { ReactComponent as AboutIcon } from "../assets/About.svg";
import { ReactComponent as ServicesIcon } from "../assets/Sevices.svg";
import { ReactComponent as ContactUsIcon } from "../assets/ContactUs.svg";
function Home() {
  const { address, homeSummary, serviceProvided } = getMsgJson();
  const [showToast, setShowToast] = useState(false);
  return (
    <div id="body">
      <RenderToast
        showToast={showToast}
        setShowToast={setShowToast}
        heading="Oh snap! You got an error!"
        msg={":( Something went wrong But! you can still contact us using above details :)"}
      />
      <Header />
      <Card
        className="section mb-24"
        icon={<AboutIcon width="120px" height="125px" />}
        title="About Us"
        description={<p dangerouslySetInnerHTML={{ __html: homeSummary }} />}
      />

      <Card
        className="section bg-grey mb-16"
        icon={<ServicesIcon width="160px" height="165px" />}
        title="Our Sevices"
        description={
          <ul type="disk">
            {serviceProvided.map((text, index) => (
              <li key={index}> {text}</li>
            ))}
          </ul>
        }
      />
      <ContactContainer address={address} setShowToast={setShowToast} />
    </div>
  );
}

const Header = () => {
  return (
    <div className="header flex flex-column flex-center flex-middle">
      <div className="flex flex-middle">
        <div className="bg-white ht-max-content in-block mr-2 br-5">
          <Icon width="48px" height="48px" />
        </div>
        <span className="header-title">The Cyberintel</span>
      </div>
      <span className="header-text">Providing affordable IT solutions</span>
    </div>
  );
};

const Card = (props) => {
  return (
    <div className={props.className}>
      <div className="small-div flex flex-center">{props.icon}</div>

      <div className="big-div p-16">
        <span className="div-title">{props.title}</span>
        <br />
        <span>{props.description}</span>
      </div>
    </div>
  );
};

const ContactContainer = ({ address, setShowToast }) => {
  return (
    <div className="contact-container">
      <div className="flex flex-center flex-middle">
        <ContactUsIcon width="120px" height="125px" />
        <span className="div-title">Contact us</span>
      </div>
      <div className="contact-form">
        <div id="sect1">
          <span>Contact us and we will get back to you within 24 hours.</span>
          <span>
            <i className="">{address.name} </i>
            <i className="">{address.address} </i>
            <i className="">({address.landmark})</i>
          </span>
          <span>{address.mobile}</span>
          <span>
            <a href={`mailto:${address.email}`}>{address.email}</a>
          </span>
        </div>

        <div id="sect2" className="">
          <span>Contact</span>

          <input type="text" placeholder="email address" className="input-field px-4" />
          <textarea name="" id="" cols="30" rows="10" placeholder="comment" className="px-4 py-8"></textarea>
          <button className="contact-btn" onClick={() => setShowToast(true)}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
