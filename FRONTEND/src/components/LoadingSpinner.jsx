// src/components/LoadingSpinner.jsx
import React from "react";
import "./LoadingSpinner.css";

export default function LoadingSpinner({ size = "normal" }) {
  return (
    <span className={`inline-spinner inline-spinner-${size}`} />
  );
}
