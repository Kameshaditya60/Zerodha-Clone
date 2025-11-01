import React from "react";
import GridCard from "./GridCard";
import './AccountTypes.css'

function AccountTypes() {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Explore different account types</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div className="col">
          <GridCard 
            cardIcon={<i className="fa-regular fa-circle-user"></i>} 
            cardTitle='Individual Account' 
            cardText='Invest in equity, mutual funds and derivatives' 
          />
        </div>
        <div className="col">
          <GridCard 
            cardIcon={<i className="fa-solid fa-people-group"></i>} 
            cardTitle="HUF Account" 
            cardText="Make tax-efficient investments for your family"
          />
        </div>
        <div className="col">
          <GridCard 
            cardIcon={<i className="fa-solid fa-globe"></i>} 
            cardTitle="NRI Account" 
            cardText="Invest in equity, mutual funds, debentures, and more"
          />
        </div>
        <div className="col">
          <GridCard 
            cardIcon={<i className="fa-solid fa-baby"></i>} 
            cardTitle="Minor Account" 
            cardText="Teach your little ones about money & invest for their future with them"
          />
        </div>
        <div className="col">
          <GridCard 
            cardIcon={<i className="fa-solid fa-city"></i>} 
            cardTitle="Corporate / LLP/ Partnership" 
            cardText="Manage your business surplus and investments easily"
          />
        </div>
      </div>
    </div>
  );
}

export default AccountTypes;
