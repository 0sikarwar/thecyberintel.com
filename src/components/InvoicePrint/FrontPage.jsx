import { useState } from "react";
import letterHead from "../../assets/letterHead.png";
import { convertNumberToWords } from "../../utils";
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
    <div id="Book1_17204" align="center" className="ht-100vh" style={{ paddingTop: "4vh" }}>
      <img src={letterHead} />
      <table
        border={0}
        cellPadding={0}
        cellSpacing={0}
        className="wt-90vw mt-5"
        style={{ borderCollapse: "collapse", tableLayout: "fixed" }}
      >
        <colgroup>
          <col width={293} />
          <col width={175} />
          <col width={63} />
          <col width={153} />
        </colgroup>
        <tbody>
          <tr height={22}>
            <td colSpan={4} height={22} className="bt-1 bb-1 bl-0 br-0 t-center v-middle fs-13pt fw-bolder" width={684}>
              TAX INVOICE
            </td>
          </tr>
          <tr height={22}>
            <td rowSpan={15} height={352} className="border-1 fs-13pt pl-8 v-top" width={293}>
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
          {Object.keys(billBreakup).map((key) => (
            <tr height={22} className={highlightedText.includes(key) ? "fw-bolder" : ""}>
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
            <td colSpan={2} height={291} className="bt-1 bb-1 bl-0 br-1 px-1" width={468}>
              <font className="fs-12pt fw-bolder">
                Statutory Guidelines
                <br />
              </font>
              <font className="fs-12pt ">
                1. PAN No.:<span></span>AUWPV4858K
                <br />
                2. Payment Should be made ONLY by crossed cheque or DD in favour of THE CYBERINTEL after obtaining tax
                invoice<span></span>positively OR NEFT to designated account OR pay with UPI using given QR Code.
                <br />
              </font>
              <font className="fs-12pt fw-bolder">
                3. PAYMENT DUE DATE: {dueDate}
                <br />
              </font>
              <font className="fs-12pt ">
                4. Any delay in payment after due date : will be charged 24% per annum on prorata basis.
                <br />
              </font>
              <font className="fs-12pt fw-bolder">
                General Guidelines
                <br />
              </font>
              <font className="fs-12pt">
                1. Kindly acknowledge the receipt of the bill by handing over the bill acknowledgement. Duly filled up.
                To our representive who delivers the bill to you.
                <br />
                3. While making the payment please handover the payment advice with full details.
                <br />
                4. Any mistakes/correction found in the invoice has to be reported in writing within 7 days from the
                receipt of the invoice. <br />
                4. This is a computer-generated invoice and hence does not require signature.
                <br />
                5. For any queries please mial to contact@thecyberintel.com.
              </font>
            </td>
            <td colSpan={2} className="bb-1 bl-0 bt-0 br-0 px-4">
              Beneficiary Name: The Cyberintel <br />
              Bank Name: HDFC Bank Ltd. <br />
              A/c No.: 50200057918781 <br />
              Type: Current Account <br />
              IFSC: HDFC0000108
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FrontPage;
