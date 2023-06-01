import React, { useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
		in place of 'smooth' */
    });
    console.log("Scrolling..");
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <button
      className="btn btn-primary position-fixed opacity-75"
      onClick={scrollToTop}
      style={{ bottom: 20 + "px", right: 20 + "px", zIndex: 100 }}
    >
      <FaArrowCircleUp style={{ display: visible ? "inline" : "none" }} />
    </button>
  );
};

export default ScrollButton;
