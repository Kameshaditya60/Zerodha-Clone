import React from "react";
function FAQSection() {
  return (
    <div className="container mb-5">
      <h2>FAQ Section</h2>
     <div id="accordion">
  <div className="card">
    <div className="card-header" id="headingOne">
      <h5 className="mb-0">
        <button className="btn " data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          What is a Zerodha account?
        </button>
      </h5>
    </div>

    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordion">
      <div className="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
  <div className="card">
    <div className="card-header" id="headingTwo">
      <h5 className="mb-0">
        <button className="btn   collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
         What documents are required to open a demat account?
        </button>
      </h5>
    </div>
    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-bs-parent="#accordion">
      <div className="card-body">
        <p>The following documents are required to open a Zerodha account online:</p>
        <ul>
          <li>PAN number</li>
          <li>Aadhaar Card (Linked with a phone number for OTP verification)</li>
          <li>Cancelled cheque or bank account statement (To link your bank account)</li>
          <li>Income proof (Required only if you wish to trade in Futures &amp; options)</li>
        </ul>
      </div>
    </div>
  </div>
  <div className="card">
    <div className="card-header" id="headingThree">
      <h5 className="mb-0">
        <button className="btn   collapsed" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Is Zerodha account opening free?
        </button>
      </h5>
    </div>
    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-bs-parent="#accordion">
      <div className="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>

  <div className="card">
    <div className="card-header" id="headingFour">
      <h5 className="mb-0">
        <button className="btn   collapsed" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
         Is Zerodha account opening free?
        </button>
      </h5>
    </div>
    <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-bs-parent="#accordion">
      <div className="card-body">
        <p>Yes, It is completely free.</p>
      </div>
    </div>
  </div>

  <div className="card">
    <div className="card-header" id="headingFive">
      <h5 className="mb-0">
        <button className="btn   collapsed" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
        Are there any maintenance charges for a demat account?
        </button>
      </h5>
    </div>
    <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-bs-parent="#accordion">
      <div className="card-body">
        <p>The account maintaince charges is appliacable based on the account type.
For Basic Services Demat Account: Zero charges if the holding value is less than ₹4,00,000.
For non-Basic Services Demat Account demat accounts: ₹300 per year + GST.
To learn more about BSDA, <a href="https://support.zerodha.com/category/account-opening/online-account-opening/online-account-opening-process/articles/how-to-open-a-basic-service-demat-account-at-zerodha">Click Here</a>.</p>
      </div>
    </div>
  </div>

  <div className="card">
    <div className="card-header" id="headingSix">
      <h5 className="mb-0">
        <button className="btn   collapsed" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
       Can I open a demat account without a bank account?
        </button>
      </h5>
    </div>
    <div id="collapseSix" className="collapse" aria-labelledby="headingSix" data-bs-parent="#accordion">
      <div className="card-body">
        <p>To open a demat account, you must have a bank account in your name.
If UPI verification is completed successfully, no proof of bank is needed. However, if bank verification fails, you'll need to provide either a cancelled cheque or a bank statement to link your bank account to Zerodha.</p>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}

export default FAQSection;
