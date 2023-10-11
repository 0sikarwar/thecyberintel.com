import React, { useState } from "react";
import ReactDataTable from "data-table-reactjs";
import Button from "react-bootstrap/Button";
const Invoice = (props) => {
  const [fuelCharge, setFuelCharge] = useState("");
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
        {`Invoice Details /${" Total Amount: " + props.invoiceData.totalAmount} ${
          props.invoiceData.invoice_number ? "/ Invoice Number: " + props.invoiceData.invoice_number : ""
        }`}
      </div>
    );
  };
  return (
    <div className="position-relative">
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
            </div>
            {!!props.invoiceFuelCharge && (
              <div className="ml-8">
                <b>{props.invoiceFuelCharge} % Fuel charge</b> will be added in print screen
              </div>
            )}
          </div>
          <div className="card px-16">
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
