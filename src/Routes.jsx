import React, { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Services from "./pages/Services";
import WebsitePricing from "./pages/WebsitePricing";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Footer from "./components/Footer";
import WebDev from "./pages/subPages/WebDev";
import history from "./utils/history";
import NotFound from "./pages/NotFound";
import Seo from "./pages/subPages/Seo";
import Cep from "./pages/subPages/Cep";
import DocketListing from "./pages/subPages/DocketListing";
import QueryListing from "./pages/QueryListing";
import DataEntry from "./pages/DataEntry";
import FrontPage from "./components/InvoicePrint/FrontPage";
import BillSlipPage from "./components/InvoicePrint/BillSlipPage";
import RenderModal from "./components/Modal";
import SignupForm from "./components/SignupForm";
import RenderToast from "./components/Toast";
import Verify from "./pages/Verify";
import { getuser } from "./utils/axiosCalls";
import ResetPassword from "./pages/ResetPassword";
import Pageloader from "./components/Pageloader";
function AppRouter() {
  const [modalType, setModalType] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ type: "", heading: "", msg: "" });
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const makeGetuseCall = async () => {
    try {
      setIsLoading(true);
      const resp = await getuser();
      if (resp.status === 200) {
        setUserDetails(resp.data.user);
        setModalType("");
      }
    } catch (error) {
      console.log("error", error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    window.addEventListener("afterprint", function () {
      document.getElementById("print-area").innerHTML = "";
      document.body.classList.remove("printing");
    });
    makeGetuseCall();
    // setUserDetails(localStorage.getItem("userDetails"));
  }, []);

  return (
    <Router history={history}>
      <Header
        setModalType={setModalType}
        userDetails={userDetails}
        setUserDetails={setUserDetails}
        setShowToast={setShowToast}
        setToastData={setToastData}
      />
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/estimate" element={<WebsitePricing />} />
          <Route exact path="/services" element={<Services />} />
          <Route exact path="/web-design" element={<WebDev />} />
          <Route exact path="/seo" element={<Seo />} />
          <Route exact path="/cep" element={<Cep />} />
          <Route exact path="/contact" element={<ContactUs />} />
          <Route exact path="/about" element={<AboutUs />} />
          <Route exact path="/querylisting" element={<QueryListing />} />
          <Route exact path="/docketlisting" element={<DocketListing />} />
          <Route
            exact
            path="/dataentry"
            element={<DataEntry setModalType={setModalType} userDetails={userDetails} />}
          />
          <Route
            exact
            path="/verify/:token"
            element={<Verify setModalType={setModalType} setUserDetails={setUserDetails} />}
          />
          <Route
            exact
            path="/reset-password/:token"
            element={
              <ResetPassword setModalType={setModalType} setShowToast={setShowToast} setToastData={setToastData} />
            }
          />
          <Route exact path="/test" element={<FrontPage />} />
          <Route exact path="/test1" element={<BillSlipPage />} />
          <Route element={NotFound} />
        </Routes>
      </div>
      <Footer />
      <RenderModal
        show={!!modalType & !isLoading}
        hidebuttons
        handleClose={() => setModalType("")}
        title={modalType === "login" ? "Log in" : modalType === "register" ? "Sign up" : "Reset Passowrd"}
        dialogClassName="signup"
      >
        <SignupForm
          isLogin={modalType === "login"}
          modalType={modalType}
          setModalType={setModalType}
          setToastData={setToastData}
          setShowToast={setShowToast}
          setUserDetails={setUserDetails}
        />
      </RenderModal>
      {isLoading && <Pageloader title="Please wait" message="Getting user data..." />};
      <RenderToast showToast={showToast} setShowToast={setShowToast} {...toastData} />
    </Router>
  );
}

export default AppRouter;
