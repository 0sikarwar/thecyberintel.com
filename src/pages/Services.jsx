import { useState } from "react";
import { servicesData } from "../data";
import worldMap from "../assets/worldMapGrayed.png";
import SummaryCard from "../components/ServiceSummaryCard";
import ContactUsForm from "../components/ContactUsForm";

function Services() {
  return (
    <div className="bg-white wt-100vw">
      <section class="services-section container style4 services" id="services">
        <header class="page-heading">
          <h2 class="heading8 lime text-capitalize font-medium margin-bottom-20">WHAT WE DO</h2>
          <p>
            We build professional remote IT teams. We also augment our clients’ team bandwidth and capacity, <br />{" "}
            quickly catching up with any current project’s status and existing codebase.
          </p>
        </header>
        <div class="row holder" style={{ backgroundImage: `url(${worldMap})` }}>
          <div class="col-xs-12 col-md-4">
            {servicesData.slice(0, servicesData.length / 2).map((service, i) => (
              <SummaryCard key={i} {...service} />
            ))}
          </div>
          <div class="col-xs-12 col-md-4 d-none d-lg-block d-xl-block">
            <img src="https://smartthinking.mx/images/iphone-mockup-01.png" alt="description" class="img" />
          </div>
          <div class="col-xs-12 col-md-4">
            {servicesData.slice(servicesData.length / 2).map((service, i) => (
              <SummaryCard key={i} {...service} />
            ))}
          </div>
        </div>
      </section>
      <div className="flex flex-center w-100p gradient-row">
        <div className="col-lg-6">
          <ContactUsForm />
        </div>
      </div>
    </div>
  );
}

export default Services;
