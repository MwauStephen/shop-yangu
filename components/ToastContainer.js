// "use client";
import React from "react";
// import { Toaster } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const ToastContainer = () => {
  return (
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{ margin: "8px" }}
      toastOptions={{
        success: {
          duration: 3000,
        },
        error: {
          duration: 5000,
        },
        style: {
          fontSize: "16px",
          maxWidth: "500px",
          padding: "16px 24px",
          color: "var(--color-grey-700)",
          backgroundColor: "var(--color-grey-0)",
        },
      }}
    />
  );
};

export default ToastContainer;
