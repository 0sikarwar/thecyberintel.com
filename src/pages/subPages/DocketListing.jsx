import { useEffect, useState } from "react";
import RenderToast from "../../components/Toast";
import { getDockets } from "../../utils/axiosCalls";
import ReactDataTable from "data-table-reactjs";
const QueryListing = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ type: "", heading: "", msg: "" });
  const [listingData, setListingData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const sortableColumns = ["destination", "client_name", "docket_date", "docket_num", "added_on", "updated_on"];
  const filterableColumns = [
    "destination",
    "client_name",
    "docket_date",
    "docket_num",
    "added_on",
    "updated_on",
    "company_id",
    "company_name",
  ];
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

  const getCellContent = (d, key) => {
    switch (key) {
      case "docket_discount":
        return d[key] && d[key] + " ₹/Kg";
      case "weight":
        return Number(d[key]).toFixed(3) + " Kg";
      case "added_on":
      case "updated_on":
        const arr = d[key].split(", ");
        arr[1] -= 1;
        const date = new Date(...arr);
        return date.getTime() ? date.toDateString() + ", " + date.toLocaleTimeString() : d[key];
      default:
        return d[key];
    }
  };

  const getColoumnWidth = (key) => {
    switch (key) {
      case "docket_num":
      case "weight":
        return "100px";
      case "docket_mode":
      case "docket_discount":
      case "amount":
        return "80px";
      case "docket_date":
      case "added_on":
        return "140px";
      case "updated_on":
        return "";
      default:
        return "170px";
    }
  };
  const getFormattedColumns = (list) => {
    const firstRow = list[0];
    const columnsList = Object.keys(firstRow)
      .map((key) => {
        if (key !== "id")
          return {
            name: key.toUpperCase().replace("DOCKET_", ""),
            selector: key,
            sortable: sortableColumns.includes(key),
            // wrap: true,
            width: getColoumnWidth(key),
            // customCell: getCellContent,
            omit: key === "company_id",
            filterable: filterableColumns.includes(key),
          };
        return null;
      })
      .filter(Boolean);
    return columnsList;
  };
  return (
    <>
      <RenderToast showToast={showToast} setShowToast={setShowToast} {...toastData} />
      <div>
        <div className="card px-16">
          <ReactDataTable
            columns={columns}
            list={listingData}
            showSerialNumber
            isLoading={isLoading}
            pagination
            showDownloadOption
          />
        </div>
      </div>
    </>
  );
};

export default QueryListing;
