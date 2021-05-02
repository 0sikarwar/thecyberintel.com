import React from "react";
import { invoicePrintColumnHead } from "../../utils/dataEntryHelper";
import PrintWrapper from "../PrintWrapper";
import { ReactComponent as Icon } from "../../assets/CiLogo.svg";

const InvoicePrint = (props) => {
  const tableColumnList = ["sno", "docket_num", "docket_date", "destination", "docket_mode", "weight", "amount"];
  return (
    <PrintWrapper setPrintingFlag={props.setPrintInvoiceFlag} title={`${props.companyName}_${props.invoiceNumber}`}>
      <div className="position-fixed wt-100p">
        <div className="flex flex-between">
          <div className="flex flex-middle">
            <div className="in-block mr-1 br-5">
              <Icon width="16px" height="16px" />
            </div>
            <div className="company-name fs-16 fw-bolder">
              <p className="m-0 mb-1 name">The Cyberintel</p>
            </div>
          </div>
          <div className="fs-14 fw-bolder">SUMMARY</div>
          <div className="fs-12 fw-bolder">www.thecyberintel.com</div>
        </div>
        <div className="flex flex-between mb-1 bg-silver py-1 px-2">
          <div className="mt-2">
            To: <b>{props.companyName}</b>
          </div>
          <div className="lh-16 fs-12">
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
    </PrintWrapper>
  );
};

export default InvoicePrint;
