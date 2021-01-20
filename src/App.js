import "./styles/index.scss";
import Home from "./pages/Home";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <main className="App">
        <Home />
      </main>
    </>
  );
}

export default App;
