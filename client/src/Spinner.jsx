import React from "react";

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-50/80 backdrop-blur-sm z-50">
      <div className="w-12 h-12 border-4 border-sky-600 border-t-transparent rounded-full animate-spin shadow-lg"></div>
    </div>
  );
};

export default Spinner;