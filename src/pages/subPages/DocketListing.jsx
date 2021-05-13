import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import RenderToast from "../../components/Toast";
import { getCompanyDetails } from "../../utils";
import { getCompanyNames, getDockets } from "../../utils/axiosCalls";
const QueryListing = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ type: "", heading: "", msg: "" });
  const [listingData, setListingData] = useState({});
  const [columns, setColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      let res = {},
        companyData = {};
      try {
        res = await getDockets();
        companyData = await getCompanyNames();
      } catch (e) {
        console.error(e);
      }
      if (res?.data?.status === "SUCCESS") {
        setListingData(res.data.list);
        setColumns(getFormattedColumns(res.data.list, companyData?.data?.list));
      } else {
        setShowToast(true);
        setToastData({ type: "danger", heading: "Oh snap!", msg: "Something went wrong please try again" });
      }
      setIsLoading(false);
    })();
  }, []);
  const getFormattedColumns = (list, companyList) => {
    const firstRow = list[0];
    const columnsList = Object.keys(firstRow)
      .map((key) => {
        if (key !== "id")
          return {
            name: key.toUpperCase(),
            selector: key,
            sortable: ["destination", "client_name", "docket_date", "docket_num"].includes(key) && true,
            wrap: true,
            width: ["docket_num", "weight", "company_id", "docket_mode", "docket_discount", "amount"].includes(key)
              ? "110px"
              : "170px",
            cell: (d) => (
              <span>
                {key === "docket_discount" && d[key]
                  ? d[key] + " ₹/Kg"
                  : key === "company_id" && companyList
                  ? getCompanyDetails(d[key], companyList).company_name
                  : d[key]}
              </span>
            ),
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
          <DataTableExtensions columns={columns} data={listingData} exportHeaders>
            <DataTable title="Docket List" progressPending={isLoading} pagination striped highlightOnHover />
          </DataTableExtensions>
        </div>
      </div>
    </>
  );
};

export default QueryListing;
