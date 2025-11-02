import React from "react";
import { Link } from "react-router-dom";
function SupportQuickLinks() {
  return (
    <div className="container">
      <h3>Quick Links</h3>
      <ol>
        <li>
          {" "}
          <Link to={"/signup"}>Track account opening</Link>
        </li>
        <li>
          {" "}
          <Link to={"/https://zrd.sh/segment-activation"}>
            Track segment activation
          </Link>
        </li>
        <li>
          {" "}
          <Link to={"/https://zrd.sh/latest-leverage"}>Intraday margins</Link>
        </li>
        <li>
          {" "}
          <Link to={"/https://zrd.sh/kite-manual"}>Kite user manual</Link>
        </li>
        <li>
          {" "}
          <Link
            to={
              "/https://support.zerodha.com/category/your-zerodha-account/your-profile/ticket-creation/articles/how-do-i-create-a-ticket-at-zerodha"
            }
          >
            Learn how to create a ticket
          </Link>
        </li>
      </ol>
    </div>
  );
}

export default SupportQuickLinks;
