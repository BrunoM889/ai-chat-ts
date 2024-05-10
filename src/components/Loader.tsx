import React from "react";
import "@/app/globals.css";

function Loader(): JSX.Element {
  return (
    <div className="container min-w-[48px]">
      <div className="slice"></div>
      <div className="slice"></div>
      <div className="slice"></div>
      <div className="slice"></div>
      <div className="slice"></div>
      <div className="slice"></div>
    </div>
  );
}

export default Loader;
