import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Cursor from "./components/Cursor";
import Escene from "./components/Escene";

function App() {
  return (
    <>
      <BrowserRouter>
        <Cursor />
        <Escene />
      </BrowserRouter>
    </>
  );
}

export default App;
