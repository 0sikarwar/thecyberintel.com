import React from "react";
import { servicesData } from "../utils/data";
import worldMap from "../assets/worldMapGrayed.png";
import SummaryCard from "../components/ServiceSummaryCard";
import ContactUsForm from "../components/ContactUsForm";
import whatWeDo from "../assets/wwd.png";

function Services() {
  return (
    <div className="bg-white wt-100vw">
      <section className="services-section container style4 services" id="services">
        <header className="page-heading">
          <h2 className="heading8 lime text-capitalize font-medium margin-bottom-20">WHAT WE DO</h2>
          <p>
            Innovative and interactive designs are our specialty. We build professional remote IT teams. We pride
            ourselves in helping our clients fulfill their needs. We also augment our clients’ team bandwidth and
            capacity, quickly catching up with any current project’s status and existing codebase.
          </p>
        </header>
        <div className="row holder" style={{ backgroundImage: `url(${worldMap})` }}>
          <div className="col-xs-12 col-md-4">
            {servicesData.slice(0, servicesData.length / 2).map((service, i) => (
              <SummaryCard key={i} {...service} />
            ))}
          </div>
          <div className="col-xs-12 col-md-4 d-none d-lg-block d-xl-block">
            <img src={whatWeDo} alt="description" className="img" style={{ width: "inherit" }} />
          </div>
          <div className="col-xs-12 col-md-4">
            {servicesData.slice(servicesData.length / 2).map((service, i) => (
              <SummaryCard key={i} {...service} />
            ))}
          </div>
        </div>
      </section>
      <div className="flex flex-center w-100p gradient-row">
        <div className="col-lg-6">
          <ContactUsForm
            heading="Enquiry Form"
            className="flex flex-column flex-middle"
            headingClassName="c-white mt-2 fw-bolder"
            buttonText="Get in Touch"
          />
        </div>
      </div>
    </div>
  );
}

export default Services;
