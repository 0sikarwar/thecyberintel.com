import React from "react";
import { convertNumberToWords } from "../../utils";

const BillSlipPage = (props) => {
  const { total, invoiceNumber, invoiceDate, companyData, totalWithTax, dueDate } = props;

  return (
    <div
      id="tax invoice_2_7105"
      style={{
        paddingTop: "15vh",
        pageBreakAfter: "always",
        width: "21cm",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <table border={0} cellPadding={0} cellSpacing={0} className="fs-12pt wt-90vw" style={{ width: "21cm" }}>
        <colgroup>
          <col className="fs-12pt" width={120} style={{ padding: "1px 5px" }} />
          <col className="fs-12pt" width={110} style={{ padding: "1px 5px" }} />
          <col className="fs-12pt" width={90} style={{ padding: "1px 5px" }} />
          <col className="fs-12pt" width={130} style={{ padding: "1px 5px" }} />
          <col className="fs-12pt" width={148} style={{ padding: "1px 5px" }} />
          <col className="fs-12pt" width={90} style={{ padding: "1px 5px" }} />
          <col className="fs-12pt" width={104} style={{ padding: "1px 5px" }} />
          <col className="fs-12pt" width={110} style={{ padding: "1px 5px" }} />
        </colgroup>
        <tbody>
          <tr height={10}>
            <td colSpan={8} height={10} className="fs-12pt bt-1 bb-1 br-0 bl-0" width={889}>
              &nbsp;
            </td>
          </tr>
          <tr height={23}>
            <td colSpan={8} height={23} className="fs-12pt border-1 fw-bolder t-center v-middle bg-yellow">
              THE CYBERINTEL
            </td>
          </tr>
          <tr height={26}>
            <td colSpan={8} height={26} className="fs-12pt border-1 fw-bolder t-center v-middle">
              Payment Advice (Please detach and return with your payment)
            </td>
          </tr>
          <tr height={29}>
            <td colSpan={2} height={29} className="fs-12pt border-1 fw-bolder t-center v-middle">
              Invoice No.: {invoiceNumber}
            </td>
            <td colSpan={3} className="fs-12pt border-1 fw-bolder t-center v-middle bl-0">
              Date: {invoiceDate}
            </td>
            <td colSpan={3} className="fs-12pt border-1 fw-bolder t-center v-middle bl-0">
              Client Code: {companyData.id}
            </td>
          </tr>
          <tr height={23}>
            <td colSpan={4} height={23} className="fs-12pt border-1 fw-bolder t-center v-middle">
              Chanel Partner of DTDC Express Limited
            </td>
            <td colSpan={4} className="fs-12pt border-1 fw-bolder t-center v-middle bl-0">
              {companyData.company_name}
            </td>
          </tr>
          <tr height={29}>
            <td height={29} className="fs-12pt border-1 t-center v-middle bt-0">
              Bank Name
            </td>
            <td colSpan={2} className="fs-12pt border-1 t-center v-middle bl-0">
              Cheque/DD/Ref. No.
            </td>
            <td className="fs-12pt border-1 t-center v-middle bl-0 bt-0">Payment Date</td>
            <td className="fs-12pt border-1 t-center v-middle bl-0 bt-0">Invoice Amount</td>
            <td className="fs-12pt border-1 t-center v-middle bl-0 bt-0">TDS</td>
            <td colSpan={2} className="fs-12pt border-1 t-center v-middle bl-0">
              Net Amount
            </td>
          </tr>
          <tr height={35}>
            <td height={35} className="fs-12pt border-1 t-center v-middle bt-0">
              &nbsp;
            </td>
            <td colSpan={2} className="fs-12pt border-1 t-center v-middle bl-0">
              &nbsp;
            </td>
            <td className="fs-12pt border-1 t-center v-middle bl-0 bt-0">&nbsp;</td>
            <td className="fs-12pt border-1 t-center v-middle bl-0 bt-0">{"₹ " + totalWithTax}</td>
            <td className="fs-12pt border-1 t-center v-middle bl-0 bt-0">&nbsp;</td>
            <td colSpan={2} className="fs-12pt border-1 t-center v-middle bl-0">
              {"₹ " + totalWithTax}
            </td>
          </tr>
          <tr height={27}>
            <td colSpan={8} height={27} className="fs-12pt border-1 t-left v-middle pl-4">
              Amount in Words (Rounded Off):{" "}
              <font className="font57105">{convertNumberToWords(totalWithTax)} Rupees only</font>
            </td>
          </tr>
          <tr height={26}>
            <td colSpan={8} height={26} className="fs-12pt border-1 fw-bolder t-center v-middle">
              Please make crossed Cheque or DD in favour of 'THE CYBERINTEL'
            </td>
          </tr>
          <tr height={17}>
            <td colSpan={8} height={17} className="fs-12pt border-1 t-left v-middle ">
              &nbsp;
            </td>
          </tr>
          <tr height={29}>
            <td colSpan={3} height={29} className="fs-12pt border-1 t-left v-middle pl-4">
              Name:<span></span>
            </td>
            <td colSpan={3} className="fs-12pt border-1 t-left v-middle bl-0 pl-4">
              Signature:
            </td>
            <td colSpan={2} className="fs-12pt border-1 t-left v-middle bl-0 pl-4">
              Date:
            </td>
          </tr>
          <tr height={9}>
            <td colSpan={8} height={9} className="fs-12pt bb-0 bt-0 bl-0 br-0 t-center v-middle ">
              &nbsp;
            </td>
          </tr>
          <tr height={19}>
            <td height={19} className="fs-12pt" />
            <td className="fs-12pt" />
            <td className="fs-12pt" />
            <td className="fs-12pt" />
            <td className="fs-12pt" />
            <td className="fs-12pt" />
            <td className="fs-12pt" />
            <td className="fs-12pt" />
          </tr>
          <tr height={32}>
            <td colSpan={8} height={6} className="fs-12pt bb-1 bt-1 br-0 bl-0" style={{ borderStyle: "dotted" }}>
              &nbsp;
            </td>
          </tr>
          <tr height={24}>
            <td colSpan={8} height={24} className="fs-12pt border-1 fw-bolder t-center v-middle bg-yellow">
              THE CYBERINTEL
            </td>
          </tr>
          <tr height={29}>
            <td colSpan={8} height={29} className="fs-12pt border-1 fw-bolder t-center v-middle">
              BILL ACKNOWLEDGEMENT
            </td>
          </tr>
          <tr height={45}>
            <td colSpan={2} height={45} className="fs-12pt fw-bolder border-1 t-left v-top pl-4">
              Client Code: {companyData.id}
            </td>
            <td colSpan={4} className="fs-12pt border-1 fw-bolder bl-0 pl-4" width={305}>
              Invoice No: {invoiceNumber}
              <span className="px-5"> </span>Invoice Date: {invoiceDate}
              <br />
              Net Amount: {"₹ " + totalWithTax}
            </td>
            <td colSpan={2} className="fs-12pt fw-bolder border-1 t-left v-top bl-0 pl-4">
              Due Date: {dueDate}
            </td>
          </tr>
          <tr height={30}>
            <td colSpan={8} height={30} className="fs-12pt border-1 fw-bolder v-middle pl-4">
              Client Name: {companyData.company_name}
            </td>
          </tr>
          <tr height={62}>
            <td colSpan={4} height={62} className="fs-12pt border-1 fw-bolder pl-4" width={296}>
              Name of the Receiver
              <br />
              Received Date
            </td>
            <td colSpan={4} className="fs-12pt fw-bolder border-1 t-left v-top bl-0 pl-4">
              Sign &amp; Seal
            </td>
          </tr>
          <tr height={9}>
            <td colSpan={8} height={9} className="fs-12pt bb-1 bt-1 bl-0 br-0 t-center v-middle ">
              &nbsp;
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BillSlipPage;
