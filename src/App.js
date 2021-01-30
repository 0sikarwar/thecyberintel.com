import React, { useEffect, useState } from "react";
import "./styles/index.scss";
import { setMsgJson } from "./utils";
import Home from "./pages/Home";
import Shimmer from "./components/Shimmer";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setMsgJson(setIsLoading);
  }, []);
  return isLoading ? <Shimmer /> : <Home />;
}
