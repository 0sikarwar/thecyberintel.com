/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
export default function PricingCard(props) {
  return (
    <div className="col-lg-4 mb-5 mb-lg-0">
      <div className="bg-white p-5 rounded-lg shadow">
        <h1 className="h6 text-uppercase font-weight-bold mb-4 c-tr">{props.name}</h1>
        <h2 className="h1 font-weight-bold c-sc">
          ₹ {props.charges}
          <span className="text-small font-weight-normal ml-2">/ {props.planType}</span>
        </h2>
        <hr className="bg-tr" />
        <ul className="list-unstyled my-5 text-small text-left">
          {props.featuresList.map((feature, index) => {
            const isDisabled = props.disabledFeatureIndex.includes(index);
            return (
              <li className={`mb-3 ${isDisabled ? "text-muted" : ""}`}>
                <i className={`${isDisabled ? "cross-icon" : "check-icon c-tr"} mr-2`}></i>{" "}
                <span className={`${isDisabled ? "decoration-del" : ""}`}>{feature}</span>
              </li>
            );
          })}
        </ul>
        <a href="#" className="btn bg-sc btn-block p-2 shadow c-white">
          Subscribe
        </a>
      </div>
    </div>
  );
}
