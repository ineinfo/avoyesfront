// LoadingSpinner.js
import React from "react";

const LoadingSpinner = () => {
  const styles = {
    loadingScreen: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(255, 255, 255, 0.7)",
      zIndex: 9999,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    spinner: {
      width: "50px",
      height: "50px",
      border: "8px solid lightgray", // Background circle color
      borderTop: "8px solid blue", // Spinner color
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
    "@keyframes spin": {
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(360deg)" },
    },
  };

  const styleTag = (
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  );

  return (
    <div style={styles.loadingScreen}>
      {styleTag}
      <div style={styles.spinner}></div>
    </div>
  );
};

export default LoadingSpinner;
