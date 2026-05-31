import React, { useState } from "react";
import ReactDataTable from "data-table-reactjs";
import Button from "react-bootstrap/Button";
import { getCompanyDetails, getGstDetails } from "../utils";
import { getInvoiceNumber } from "../utils/dataEntryHelper";
import { exportInvoiceToExcel } from "../utils/excelExport";

const Invoice = (props) => {
  const [fuelCharge, setFuelCharge] = useState("");

  const handleExcelExport = () => {
    const { invoiceData, companyList, invoiceFuelCharge } = props;
    const companyData = getCompanyDetails(invoiceData.company_id, companyList);
    const gstDetails = getGstDetails(companyData.company_gst || "");
    let totalAmount = Number(invoiceData.totalAmount.replace(/^\D+/g, ""));
    let fuelChargeVal = 0;
    if (invoiceFuelCharge) {
      fuelChargeVal = (Number(invoiceFuelCharge) / 100) * totalAmount;
      totalAmount += fuelChargeVal;
    }
    const sgst = gstDetails.SGST ? (gstDetails.SGST / 100) * totalAmount : 0.0;
    const cgst = gstDetails.CGST ? (gstDetails.CGST / 100) * totalAmount : 0.0;
    const igst = gstDetails.IGST ? (gstDetails.IGST / 100) * totalAmount : 0.0;
    const totalWithTax = sgst + cgst + igst + totalAmount;

    exportInvoiceToExcel({
      ...props,
      invoiceData,
      companyData,
      gstDetails,
      companyName: invoiceData.company_name,
      fromDate: invoiceData.from,
      toDate: invoiceData.to,
      invoiceDate: invoiceData.invoice_date,
      dueDate: invoiceData.due_date,
      invoiceNumber: invoiceData.invoice_number ? getInvoiceNumber(invoiceData.invoice_number) : "",
      total: invoiceData.totalAmount,
      sgst: Math.ceil(sgst),
      cgst: Math.ceil(cgst),
      igst: Math.ceil(igst),
      totalWithTax: Math.ceil(totalWithTax),
      totalAmount: Math.ceil(totalAmount),
      fuelCharge: Math.ceil(fuelChargeVal),
    });
  };

  const getFormattedColumns = (list) => {
    const firstRow = list[0];
    const columnsList = Object.keys(firstRow)
      .map((key) => {
        if (key !== "id")
          return {
            name: key.toUpperCase(),
            selector: key,
            sortable: ["docket_date"].includes(key) && true,
            filterable: key === "docket_num",
            width: ["docket_num", "weight", "company_id", "docket_mode", "docket_discount", "amount"].includes(key)
              ? "100px"
              : "170px",
            customCell:
              key === "docket_discount" ? (d, sel) => <div className="w-100">{d[sel] + " ₹/Kg"}</div> : undefined,
          };
        return null;
      })
      .filter(Boolean);
    return columnsList;
  };
  const TableTitle = () => {
    return (
      <div className="flex flex-wrap mb-5">
        {`Invoice Details | ${" Total Amount: " + props.invoiceData.totalAmount} ${
          props.invoiceData.invoice_number ? "| Invoice Number: " + props.invoiceData.invoice_number : ""
        }`}
      </div>
    );
  };
  return (
    <div className="position-relative h-100">
      {props.invoiceData.docketList?.length ? (
        <>
          <div className="position-absolute z-1 p-2 t-60 r-32">
            <div className="flex">
              <input
                className="form-control wt-180"
                type="number"
                name="fuel_charge"
                placeholder="Fuel charge in %"
                value={fuelCharge}
                onChange={(e) => {
                  setFuelCharge(e.target.value);
                }}
              />
              <Button variant="outline-primary" className="ml-2" onClick={() => props.setInvoiceFuelCharge(fuelCharge)}>
                Add fuel Charge
              </Button>
              <Button variant="success" className="ml-2" onClick={handleExcelExport}>
                Export to Excel
              </Button>
            </div>
            {!!props.invoiceFuelCharge && (
              <div className="ml-8">
                <b>{props.invoiceFuelCharge} % Fuel charge</b> will be added in print screen
              </div>
            )}
          </div>
          <div className="card px-16 h-100">
            <ReactDataTable
              title={<TableTitle />}
              columns={getFormattedColumns(props.invoiceData.docketList)}
              list={props.invoiceData.docketList}
              pagination
            />
          </div>
        </>
      ) : (
        <h3>No docket available for selected client in selected month.</h3>
      )}
    </div>
  );
};

export default Invoice;
