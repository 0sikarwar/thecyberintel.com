import React, { useEffect, useState } from "react";
import { invoicePrintColumnHead } from "../../utils/dataEntryHelper";
import { getCompanyDetails, getGstDetails } from "../../utils";

import PrintWrapper from "../PrintWrapper";
import logo from "../../assets/CiLogo.png";
import FrontPage from "./FrontPage";
import BillSlipPage from "./BillSlipPage";

const tableColumnList = ["sno", "docket_num", "docket_date", "destination", "docket_mode", "weight", "amount"];
const InvoicePrint = (props) => {
  const companyData = getCompanyDetails(props.companyId, props.companyList);
  const gstDetails = getGstDetails(companyData.company_gst || "");
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
        sgst={Math.ceil(sgst)}
        cgst={Math.ceil(cgst)}
        igst={Math.ceil(igst)}
        totalWithTax={Math.ceil(totalWithTax)}
        totalAmount={Math.ceil(totalAmount)}
        invoiceFuelCharge={Math.ceil(props.invoiceFuelCharge) || 0}
        fuelCharge={Math.ceil(fuelCharge)}
      />
      <BillSlipPage
        {...props}
        companyData={companyData}
        gstDetails={gstDetails}
        totalWithTax={Math.ceil(totalWithTax)}
      />
      <div>
        <div
          className="position-fixed wt-100p"
          style={{
            width: "21cm",
          }}
        >
          <div className="flex flex-between">
            <div className="flex flex-middle">
              <div className="in-block mr-4 br-5">
                <img src={logo} style={{ width: "0.5cm", display: "block" }} />
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
                <span className="mr-4">From: {props.fromDate}</span>
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
