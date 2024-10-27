"use client";

import { useEffect, useState } from "react";

import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button onClick={scrollToTop}>
          <ArrowUpCircleIcon className="h-7 w-7 text-gray-500 transition-all duration-150 hover:text-gray-900 hover:dark:text-gray-100" />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
