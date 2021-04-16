import { useEffect, useState } from "react";
import RenderToast from "../components/Toast";
import { getTestData } from "../utils/axiosCalls";
const Test = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ type: "", heading: "", msg: "" });
  const [listingData, setListingData] = useState({});
  useEffect(() => {
    getTestData()
      .then((res) => {
        if (res?.data?.status === "SUCCESS") {
          setListingData(res.data.list);
        } else {
          setShowToast(true);
          setToastData({ type: "danger", heading: "Oh snap!", msg: "Something went wrong please try again" });
        }
      })
      .catch((err) => {
        setShowToast(true);
        setToastData({ type: "danger", heading: "Oh snap!", msg: "Something went wrong please try again" });
        console.log(err);
      });
  }, []);
  return (
    <>
      <RenderToast showToast={showToast} setShowToast={setShowToast} {...toastData} />
      <div>
        <div className="card px-16">{JSON.stringify(listingData)}</div>
      </div>
    </>
  );
};

export default Test;
