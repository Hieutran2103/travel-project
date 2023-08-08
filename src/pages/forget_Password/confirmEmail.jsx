import React from "react";
import { Link } from "react-router-dom";

export default function ConfirmEmail() {
  return (
    <div>
      <Link to="/resetpassword" style={{ color: "#f72d7a" }}>
        COFIRM
      </Link>
    </div>
  );
}
