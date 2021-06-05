import React, { useEffect, useState } from "react";
import { invoicePrintColumnHead } from "../../utils/dataEntryHelper";
import { getCompanyDetails, getGstDetails } from "../../utils";

import PrintWrapper from "../PrintWrapper";
import { ReactComponent as Icon } from "../../assets/CiLogo.svg";
import FrontPage from "./FrontPage";
import BillSlipPage from "./BillSlipPage";

const tableColumnList = ["sno", "docket_num", "docket_date", "destination", "docket_mode", "weight", "amount"];
const InvoicePrint = (props) => {
  const companyData = getCompanyDetails(props.companyId, props.companyList);
  const gstDetails = getGstDetails(companyData.company_gst);
  let totalAmount = Number(props.total.replace(/^\D+/g, ""));
  let fuelCharge = 0;
  if (props.invoiceFuelCharge) {
    fuelCharge = (Number(props.invoiceFuelCharge) / 100) * totalAmount;
    totalAmount += fuelCharge;
  }
  const sgst = gstDetails.SGST ? (gstDetails.SGST / 100) * totalAmount : 0.0;
  const cgst = gstDetails.CGST ? (gstDetails.CGST / 100) * totalAmount : 0.0;
  const igst = gstDetails.IGST ? (gstDetails.IGST / 100) * totalAmount : 0.0;
  const totalWithTax = sgst + cgst + igst + totalAmount;
  return (
    <PrintWrapper setPrintingFlag={props.setPrintInvoiceFlag} title={`${props.companyName}_${props.invoiceNumber}`}>
      <FrontPage
        {...props}
        companyData={companyData}
        gstDetails={gstDetails}
        sgst={sgst}
        cgst={cgst}
        igst={igst}
        totalWithTax={totalWithTax}
        totalAmount={totalAmount}
        invoiceFuelCharge={props.invoiceFuelCharge || 0}
        fuelCharge={fuelCharge}
      />
      <BillSlipPage {...props} companyData={companyData} gstDetails={gstDetails} totalWithTax={totalWithTax} />
      <div>
        <div className="position-fixed wt-100p">
          <div className="flex flex-between">
            <div className="flex flex-middle">
              <div className="in-block mr-1 br-5">
                <Icon width="16px" height="16px" />
              </div>
              <div className="company-name fs-17 fw-bolder">
                <p className="m-0 mb-1 name">The Cyberintel</p>
              </div>
            </div>
            <div className="fs-15 fw-bolder">SUMMARY</div>
            <div className="fs-13 fw-bolder">www.thecyberintel.com</div>
          </div>
          <div className="flex flex-between mb-1 bg-silver py-1 px-2">
            <div className="mt-2">
              To: <b>{props.companyName}</b>
            </div>
            <div className="lh-16 fs-13">
              <div> Invoice No.: {props.invoiceNumber}</div>
              <div>Invoice Date: {props.invoiceDate}</div>
              <div>
                <span className="mr-2">From: {props.fromDate}</span>
                <span>To: {props.toDate}</span>
              </div>
            </div>
          </div>
        </div>
        <table className="invoice-print">
          <thead>
            <div className="ht-90" />
            <tr>
              {tableColumnList.map((item, index) => (
                <th key={index}>{invoicePrintColumnHead[item]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.invoiceData.docketList.map((obj, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {tableColumnList.slice(1).map((item) => (
                  <td key={item + index}>{obj[item]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <b style={{ float: "right" }} className="mt-1">
          Total Taxable amount: {props.total}
        </b>
      </div>
    </PrintWrapper>
  );
};

export default InvoicePrint;
