/* eslint-disable react/prop-types */
import React from "react";

export default function InputPassword({
  spanName,
  type,
  placeholder,
  errormessage,
  register,
}) {
  return (
    <div className="input-group">
      <span>{spanName}</span>
      <input type={type} placeholder={placeholder} {...register} />
      <div style={{ minHeight: 25, color: "#f72d7a" }}>{errormessage}</div>
    </div>
  );
}
