import React, { useState } from "react";
import letterHead from "../../assets/letterHead.png";
import { convertNumberToWords } from "../../utils";
import { INVOICE_STRINGS } from "../../utils/invoiceConstants";

const highlightedText = ["Total Invoice Value (INR)", "Invoice No"];
const FrontPage = (props) => {
  const {
    total,
    gstDetails,
    invoiceNumber,
    invoiceDate,
    companyData,
    sgst,
    cgst,
    igst,
    totalWithTax,
    totalAmount,
    invoiceFuelCharge,
    fuelCharge,
    dueDate,
  } = props;

  const [billBreakup, setPriceBreakup] = useState({
    "Invoice No": invoiceNumber,
    "Invoice Date": invoiceDate,
    "Invoice Amount": total,
    [`Fuel Surcharge @ ${invoiceFuelCharge}%`]: fuelCharge && "₹ " + fuelCharge,
    Insurance: 0.0,
    "Additional Surcharges": 0.0,
    "Taxable Value": "₹ " + totalAmount,
    [`SGST @ ${gstDetails.SGST}%`]: sgst && "₹ " + sgst,
    [`CGST @ ${gstDetails.CGST}%`]: cgst && "₹ " + cgst,
    [`IGST @ ${gstDetails.IGST}%`]: igst && "₹ " + igst,
    "": "",
    "Total Invoice Value (INR)": "₹ " + totalWithTax,
    "SAC No": 996812,
    "Description of Services": "Courier Services",
  });
  return (
    <div
      id="Book1_17204"
      style={{
        paddingTop: "4vh",
        height: "100vh",
        width: "21cm",
        pageBreakAfter: "always",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img src={letterHead} style={{ width: "21cm", display: "block", borderBottom: "2px solid #0e2c53" }} />
      <table
        border={0}
        cellPadding={0}
        cellSpacing={0}
        className="wt-90vw mt-5"
        style={{ borderCollapse: "collapse", tableLayout: "fixed", width: "21cm" }}
      >
        <colgroup>
          <col style={{ width: "9cm" }} />
          <col style={{ width: "2cm" }} />
          <col style={{ width: "4cm" }} />
          <col style={{ width: "6cm" }} />
        </colgroup>
        <tbody>
          <tr height={22}>
            <td colSpan={4} height={22} className="bt-1 bb-1 bl-0 br-0 t-center v-middle fs-13pt fw-bolder">
              TAX INVOICE
            </td>
          </tr>
          <tr height={22}>
            <td rowSpan={15} height={352} className="border-1 fs-13pt pl-8 v-top">
              TO <br />
              {companyData.company_name} <br />
              {companyData.company_address} <br />
              <br />
              State Code: {gstDetails.stateCode} <br />
              GSTIN/Unique ID: {companyData.company_gst} <br />
              Place of supply: {gstDetails.stateName + " & " + gstDetails.stateCode}
            </td>
            <td colSpan={2} className="br-1 bb-1 bl-0 bt-1 fs-12pt pl-8">
              Invoice Period
            </td>
            <td className="br-1 bb-1 bl-0 bt-1 fs-12pt t-right pr-8">{`${props.fromDate} to ${props.toDate}`}</td>
          </tr>
          {Object.keys(billBreakup).map((key, index) => (
            <tr height={22} className={highlightedText.includes(key) ? "fw-bolder" : ""} key={index}>
              <td colSpan={2} height={22} className="br-1 bb-1 bl-0 bt-1 fs-12pt pl-8">
                {key}
              </td>
              <td className="br-1 bb-1 bl-0 bt-1 fs-12pt t-right pr-8">{billBreakup[key]}</td>
            </tr>
          ))}
          <tr height={45}>
            <td colSpan={4} height={30} className="fs-12pt">
              Amount in Words (Rounded Off): {convertNumberToWords(totalWithTax)} Rupees only
            </td>
          </tr>
          <tr height={291}>
            <td colSpan={3} height={291} className="bt-1 bb-1 bl-0 br-1 px-1">
              <font className="fs-12pt fw-bolder">
                Statutory Guidelines
                <br />
              </font>
              <font className="fs-12pt ">
                {INVOICE_STRINGS.statutoryGuidelines[0]}
                <br />
                {INVOICE_STRINGS.statutoryGuidelines[1]}
                <br />
              </font>
              <font className="fs-12pt fw-bolder">
                {INVOICE_STRINGS.statutoryGuidelines[2]} {dueDate}
                <br />
              </font>
              <font className="fs-12pt ">
                {INVOICE_STRINGS.statutoryGuidelines[3]}
                <br />
              </font>
              <font className="fs-12pt fw-bolder">
                General Guidelines
                <br />
              </font>
              <font className="fs-12pt">
                {INVOICE_STRINGS.generalGuidelines.map((text, idx) => (
                  <React.Fragment key={idx}>
                    {text}
                    <br />
                  </React.Fragment>
                ))}
              </font>
            </td>
            <td colSpan={2} className="bb-1 bl-0 bt-0 br-0 px-4">
              Beneficiary Name: {INVOICE_STRINGS.bankDetails.beneficiaryName} <br />
              Bank Name: {INVOICE_STRINGS.bankDetails.bankName} <br />
              A/c No.: {INVOICE_STRINGS.bankDetails.accountNo} <br />
              Type: {INVOICE_STRINGS.bankDetails.accountType} <br />
              IFSC: {INVOICE_STRINGS.bankDetails.ifsc}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FrontPage;
