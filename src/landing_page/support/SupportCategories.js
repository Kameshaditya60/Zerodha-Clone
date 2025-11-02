import React from "react";
function SupportCategories() {
  return (
    <div className="container accordion ">
      <div className="card">
        <div className="card-header d-flex" id="heading">
          <i className="fa-solid fa-circle-plus fa-xl pt-3 "></i>
          <h5>
            <button
              className="btn d-inline"
              data-bs-toggle="collapse"
              href="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              Account Opening
            </button>
          </h5>
        </div>
        <div className="collapse" id="collapseExample">
          <div className="card card-body">
            <ol>
              <li>Resident individual</li>
              <li>Minor</li>
              <li>Non Resident Indian (NRI)</li>
              <li>Company, Partnership, HUF and LLP</li>
              <li>Glossary</li>
              <li>Your new item here</li> {/* Added new list item */}
            </ol>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header d-flex" id="headingOne">
          <i className="fa-regular fa-circle-user fa-xl pt-3"></i>
          <h5 className="mb-0">
            <button
              className="btn"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Your Zerodha Account
            </button>
          </h5>
        </div>

        <div
          id="collapseOne"
          className="collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#accordion"
        >
          <div className="card-body">
            <ol>
              <li>Your Profile</li>
              <li>Account modification</li>
              <li>
                Client Master Report (CMR) and Depository Participant (DP)
              </li>
              <li>Nomination</li>
              <li>Transfer and conversion of securities</li>
              <li>Your new item here</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header d-flex" id="headingTwo">
          <i className="fa-regular fa-paper-plane fa-xl pt-3"></i>
          <h5 className="mb-0">
            <button
              className="btn"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="true"
              aria-controls="collapseTwo"
            >
              Kite
            </button>
          </h5>
        </div>

        <div
          id="collapseTwo"
          className="collapse show"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordion"
        >
          <div className="card-body">
            <ol>
              <li>IPO</li>
              <li>Trading FAQs</li>
              <li>Margin Trading Facility (MTF) and Margins</li>
              <li>Charts and orders</li>
              <li>Alerts and Nudges</li>
              <li>General</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header d-flex" id="headingThree">
          <i class="fa-solid fa-indian-rupee-sign fa-xl pt-3"></i>
          <h5 className="mb-0">
            <button
              className="btn"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="true"
              aria-controls="collapseThree"
            >
              Funds
            </button>
          </h5>
        </div>

        <div
          id="collapseThree"
          className="collapse show"
          aria-labelledby="headingThree"
          data-bs-parent="#accordion"
        >
          <div className="card-body">
            <ol>
              <li>Add money</li>
              <li>Withdraw money</li>
              <li>Add bank accounts</li>
              <li>eMandates</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header d-flex" id="headingFour">
         <i class="fa-brands fa-edge fa-xl pt-3"></i>
          <h5 className="mb-0">
            <button
              className="btn"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="true"
              aria-controls="collapseFour"
            >
              Console
            </button>
          </h5>
        </div>

        <div
          id="collapseFour"
          className="collapse show"
          aria-labelledby="headingFour"
          data-bs-parent="#accordion"
        >
          <div className="card-body">
            <ol>
              <li>Add money</li>
              <li>Withdraw money</li>
              <li>Add bank accounts</li>
              <li>eMandates</li>
            </ol>
          </div>
        </div>
      </div>


      
      <div className="card">
        <div className="card-header d-flex" id="headingFour">
         <i class="fa-brands fa-edge fa-xl pt-3"></i>
          <h5 className="mb-0">
            <button
              className="btn"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="true"
              aria-controls="collapseFour"
            > Coin
            </button>
          </h5>
        </div>

        <div
          id="collapseFour"
          className="collapse show"
          aria-labelledby="headingFour"
          data-bs-parent="#accordion"
        >
          <div className="card-body">
            <ol>
              <li>Add money</li>
              <li>Withdraw money</li>
              <li>Add bank accounts</li>
              <li>eMandates</li>
            </ol>
          </div>
        </div>
      </div>

    </div>
  );
}

export default SupportCategories;
