import React, { Suspense, lazy } from "react";
import "./Assets/Styles/SCSS/_base.scss";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

const LoadingPage = () => (
  <div
    style={{
      width: "100vw",
      height: 100 + "vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#0f1630",
    }}
  >
    <h1 style={{ color: "white" }}>Loading...</h1>
  </div>
);

// #0f1630
function App() {
  return (
    <React.StrictMode>
        <Suspense fallback={<LoadingPage />}>
          <Navbar />
            <Home />
          <Footer />
        </Suspense>
    </React.StrictMode>
  );
}

export default App;
