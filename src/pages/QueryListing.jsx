import React, { useEffect, useState } from "react";
import RenderToast from "../components/Toast";
import { getContactQueries } from "../utils/axiosCalls";
import ReactDataTable from "data-table-reactjs";
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
      setIsLoading(false);
    })();
  }, []);
  const getFormattedColumns = (list) => {
    const firstRow = list[0];
    const firstCol = {
      name: "ID",
      selector: "id",
      sortable: true,
      width: "60px",
    };
    const columnsList = Object.keys(firstRow)
      .map((key) => {
        if (key !== "id")
          return {
            name: key.toUpperCase(),
            selector: key,
            sortable: ["name", "query_date", "id"].includes(key) && true,
            width: key === "query_date" ? "170px" : "",
          };
        return null;
      })
      .filter(Boolean);
    return [firstCol, ...columnsList];
  };
  const Test = () => <h1>Test</h1>;
  return (
    <>
      <RenderToast showToast={showToast} setShowToast={setShowToast} {...toastData} />
      <div>
        <div className="card px-16">
          <ReactDataTable title={<Test />} columns={columns} list={listingData} isLoading={isLoading} pagination />
        </div>
      </div>
    </>
  );
};

export default QueryListing;
