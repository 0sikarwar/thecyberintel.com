import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import RenderToast from "../components/Toast";
import { getContactQueries } from "../utils/axiosCalls";
const QueryListing = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ type: "", heading: "", msg: "" });
  const [listingData, setListingData] = useState({});
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    (async () => {
      let res = {};
      try {
        res = await getContactQueries();
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
            sortable: ["name", "query_date", "id"].includes(key) && true,
            wrap: true,
            maxWidth: key === "query_date" ? "170px" : "",
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
          <DataTable title="Contact Us data" columns={columns} data={listingData} pagination striped highlightOnHover />
        </div>
      </div>
    </>
  );
};

export default QueryListing;
