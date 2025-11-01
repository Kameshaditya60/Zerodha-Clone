import React from "react";
function GridCard({ cardIcon, cardTitle, cardText }) {
  return (
    <div className="container">
      <div className="card" style={{ width: "18rem", borderColor: "#74C0FC" }}>
        <div className="card-body">
            <span>{cardIcon}</span>
          <span><h5 className="card-title">{cardTitle}</h5></span>
          <p className="card-text">
            {cardText}
          </p>
        </div>
      </div>
    </div>
  );
}
export default GridCard;
