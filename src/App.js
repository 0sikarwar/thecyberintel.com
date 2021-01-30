import React, { useEffect, useState } from "react";
import "./styles/index.scss";
import { setMsgJson } from "./utils";
import Pageloader from "./components/Pageloader";
import Home from "./pages/Home";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setMsgJson(setIsLoading);
  }, []);
  return isLoading ? <Pageloader /> : <Home />;
}
