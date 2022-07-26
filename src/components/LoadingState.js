import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
const Loading = () => {
  return (
    <div
      style={{
        width: "100%",
        color: "#0095F6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        zIndex: "1000",
        marginTop: "20px",
      }}
    >
      <div>
        <ClipLoader color="#0095F6" />
      </div>
    </div>
  );
};

export default Loading;
