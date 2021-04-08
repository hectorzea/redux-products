import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewProductAction } from "../actions/productActions";
import { showAlertAction, hideAlertAction } from "../actions/alertActions";
export const NewProduct = ({ history }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const dispatch = useDispatch();

  const addProduct = (product) => dispatch(createNewProductAction(product));

  //access to the store state
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
  const alert = useSelector((state) => state.alert.alert);

  const submitNewProduct = (e) => {
    e.preventDefault();
    if (name.trim() === "" || price < 0) {
      const alert = {
        msg: "Please fill the fields",
        classes: "alert alert-danger text-center text-uppercase p3",
      };
      dispatch(showAlertAction(alert));
      return;
    }
    dispatch(hideAlertAction());
    //validate form data
    //if no errors
    //create new producto
    addProduct({ name, price });
    history.push("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Add new product
            </h2>
            {alert ? <p className={alert.classes}>{alert.msg}</p> : null}
            <form onSubmit={submitNewProduct}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Add Product
              </button>
            </form>
            {loading ? <p>Loading...</p> : null}
            {error ? (
              <p className="alert alert-danger p2 mt-4 text-center">
                An error has occurred
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
