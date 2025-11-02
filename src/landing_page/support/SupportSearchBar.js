import React from "react";
function SupportSearchBar() {
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mt-5">
        <h1>Support Portal</h1>
        <a
          className="btn btn-primary "
          href="https://support.zerodha.com/login?next=https%3A%2F%2Fsupport.zerodha.com%2Ftickets%2F"
        >
          My tickets
        </a>
      </div>
      <div className="mt-5 mb-4">
        <form className="d-flex ">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Eg: How do i open my account, How do i activate F&O..."
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default SupportSearchBar;
