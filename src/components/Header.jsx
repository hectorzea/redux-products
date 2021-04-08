import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
      <div className="container">
        <h1>
          <Link to={"/"} className="text-light">
            crud react redux, REST API, AXIOS
          </Link>
        </h1>
        <Link
          to={"/products/new"}
          className="btn btn-danger nuevo-post d-block d-md-inline-block"
        >
          Add Product
        </Link>
      </div>
    </nav>
  );
};
