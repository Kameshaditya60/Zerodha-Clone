import React from "react";
import SupportCategories from "./SupportCategories";
import InformationBoard from "./InformationBoard";
import SupportQuickLinks from "./SupportQuickLinks";
function SupportSection() {
  return (
    <div className="container mt-5 ">
      <div className="row d-flex">
        <div className="col-8 mb-4">
          <SupportCategories />
        </div>
        <div className="col-4 ">
          <div className="mb-3">
            <InformationBoard />
          </div>
          <div>
            <SupportQuickLinks />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportSection;
