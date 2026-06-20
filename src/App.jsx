import React from "react";
import "./Assets/Styles/SCSS/_base.scss";
import MacMenuBar from "./components/MacMenuBar";
import MacDock from "./components/MacDock";
import Home from "./pages/Home";

function App() {
  return (
    <React.StrictMode>
      <MacMenuBar />
      <Home />
      <MacDock />
    </React.StrictMode>
  );
}

export default App;
