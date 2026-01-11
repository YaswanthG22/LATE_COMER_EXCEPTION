import React from "react";
import "./Upload.css";

export default function Upload({ onChange }) {
  return (
    <input
      type="file"
      accept="application/pdf"
      className="ui-upload"
      onChange={onChange}
    />
  );
}
