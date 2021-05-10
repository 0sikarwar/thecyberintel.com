import { useState } from "react";
import Button from "react-bootstrap/Button";
import DataTable from "react-data-table-component";
const Invoice = (props) => {
  const [fuelCharge, setFuelCharge] = useState("");
  const getFormattedColumns = (list) => {
    const firstRow = list[0];
    const firstCol = {
      name: "ID",
      selector: "id",
      sortable: true,
      maxWidth: "60px",
      minWidth: "60px",
    };
    const columnsList = Object.keys(firstRow)
      .map((key) => {
        if (key !== "id")
          return {
            name: key.toUpperCase(),
            selector: key,
            sortable: ["docket_date"].includes(key) && true,
            wrap: true,
            width: ["docket_num", "weight", "company_id", "docket_mode", "docket_discount", "amount"].includes(key)
              ? "100px"
              : "170px",
            cell: (d) => <span>{key === "docket_discount" && d[key] ? d[key] + " ₹/Kg" : d[key]}</span>,
          };
        return null;
      })
      .filter(Boolean);
    return [firstCol, ...columnsList];
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
    <>
      <div className="position-relative">
        <div className="position-absolute z-1 r-0 p-2">
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
        {props.invoiceData.docketList?.length ? (
          <div className="card px-16">
            <DataTable
              title={<TableTitle />}
              columns={getFormattedColumns(props.invoiceData.docketList)}
              data={props.invoiceData.docketList}
              pagination
              striped
              highlightOnHover
            />
          </div>
        ) : (
          <h3>No docket available for selected client in selected month.</h3>
        )}
      </div>
    </>
  );
};

export default Invoice;
