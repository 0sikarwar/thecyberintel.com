import DataTable from "react-data-table-component";
const Invoice = (props) => {
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
            maxWidth: key === "docket_date" ? "170px" : "",
          };
        return null;
      })
      .filter(Boolean);
    return [firstCol, ...columnsList];
  };
  return (
    <>
      <div>
        {props.invoiceData.docketList?.length ? (
          <div className="card px-16">
            <DataTable
              title="Invoice Details"
              columns={getFormattedColumns(props.invoiceData.docketList)}
              data={props.invoiceData.docketList}
              pagination
              striped
              highlightOnHover
            />
          </div>
        ) : (
          <h3>No docket available for selected client in selcted month</h3>
        )}
      </div>
    </>
  );
};

export default Invoice;
