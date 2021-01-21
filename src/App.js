import { useEffect, useState } from "react";
import Header from "./components/Header";
import Pageloader from "./components/Pageloader";
import Home from "./pages/Home";
import "./styles/index.scss";
import { setMsgJson } from "./utils";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setMsgJson(setIsLoading);
  }, []);
  return isLoading ? (
    <Pageloader />
  ) : (
    <>
      <Header />
      <main className="App">
        <Home />
      </main>
    </>
  );
}

export default App;
