import React, { useEffect, useState } from "react";
import "./styles/index.scss";
import { setMsgJson } from "./utils";
import Shimmer from "./components/Shimmer";
import AppRouter from "./Routes";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setMsgJson(setIsLoading);
  }, []);
  return isLoading ? <Shimmer /> : <AppRouter />;
}
