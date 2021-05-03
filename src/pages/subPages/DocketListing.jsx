import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import RenderToast from "../../components/Toast";
import { getDockets } from "../../utils/axiosCalls";
const QueryListing = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ type: "", heading: "", msg: "" });
  const [listingData, setListingData] = useState({});
  const [columns, setColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      let res = {};
      try {
        res = await getDockets();
      } catch (e) {
        console.error(e);
      }
      if (res?.data?.status === "SUCCESS") {
        setListingData(res.data.list);
        setColumns(getFormattedColumns(res.data.list));
      } else {
        setShowToast(true);
        setToastData({ type: "danger", heading: "Oh snap!", msg: "Something went wrong please try again" });
      }
      setIsLoading(false);
    })();
  }, []);
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
            sortable: ["destination", "client_name", "docket_date"].includes(key) && true,
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
      <RenderToast showToast={showToast} setShowToast={setShowToast} {...toastData} />
      <div>
        <div className="card px-16">
          <DataTable
            title="Docket List"
            columns={columns}
            data={listingData}
            progressPending={isLoading}
            pagination
            striped
            highlightOnHover
          />
        </div>
      </div>
    </>
  );
};

export default QueryListing;