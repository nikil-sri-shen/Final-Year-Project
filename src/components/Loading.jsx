import React from "react";
import { FaSpinner } from "react-icons/fa";

function Loading() {
  return (
    <div className="flex justify-center items-center p-64">
      <FaSpinner className="animate-spin text-7xl" />
      <p className="ml-2">Loading...</p>
    </div>
  );
}

export default Loading;
