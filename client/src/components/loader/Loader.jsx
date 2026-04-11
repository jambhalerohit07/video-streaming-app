import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50">
      <ThreeDots
        height="100"
        width="100"
        radius="9"
        color="#4169e1"
        ariaLabel="loading"
        visible={true}
      />
    </div>
  );
};

export default Loader;
