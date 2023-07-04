import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Assets/Styles/SCSS/_base.scss";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
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
      <Router>
        <Suspense fallback={<LoadingPage />}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
        </Suspense>
      </Router>
    </React.StrictMode>
  );
}

export default App;
