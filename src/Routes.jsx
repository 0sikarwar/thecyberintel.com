import React, { useEffect, useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
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
import Test from "./pages/Test";
import DataEntry from "./pages/DataEntry";
function AppRouter(props) {
  const [addMargin, setAddMargin] = useState(true);

  useEffect(() => {
    window.addEventListener("afterprint", function () {
      document.getElementById("print-area").innerHTML = "";
      document.body.classList.remove("printing");
    });
  }, []);

  return (
    <Router basename="/thecyberintel" history={history}>
      <Header />
      <div className={addMargin ? "mt-72" : ""}>
        <Switch>
          <Route
            exact
            path="/"
            component={() => {
              setAddMargin(false);
              return <Home />;
            }}
          />
          <Route
            exact
            path="/estimate"
            component={() => {
              setAddMargin(true);
              return <WebsitePricing />;
            }}
          />
          <Route
            exact
            path="/services"
            component={() => {
              setAddMargin(true);
              return <Services />;
            }}
          />
          <Route
            exact
            path="/web-design"
            component={() => {
              setAddMargin(false);
              return <WebDev />;
            }}
          />
          <Route
            exact
            path="/seo"
            component={() => {
              setAddMargin(false);
              return <Seo />;
            }}
          />
          <Route
            exact
            path="/cep"
            component={() => {
              setAddMargin(false);
              return <Cep />;
            }}
          />
          <Route
            exact
            path="/contact"
            component={() => {
              setAddMargin(true);
              return <ContactUs />;
            }}
          />
          <Route
            exact
            path="/about"
            component={() => {
              setAddMargin(true);
              return <AboutUs />;
            }}
          />
          <Route
            exact
            path="/querylisting"
            component={() => {
              setAddMargin(true);
              return <QueryListing />;
            }}
          />
          <Route
            exact
            path="/docketlisting"
            component={() => {
              setAddMargin(true);
              return <DocketListing />;
            }}
          />
          <Route
            exact
            path="/dataentry"
            component={() => {
              setAddMargin(true);
              return <DataEntry />;
            }}
          />
          <Route
            exact
            path="/test"
            component={() => {
              setAddMargin(true);
              return <Test />;
            }}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default AppRouter;
