import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Content from "./components/Content";
import "./App.css";
import Cursor from "./components/Cursor";

function App() {
  return (
    <>
      <BrowserRouter>
        <Cursor />
        <Content />
      </BrowserRouter>
    </>
  );
}

export default App;
