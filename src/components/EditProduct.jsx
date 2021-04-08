import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProductAction } from "../actions/productActions";
import { useHistory } from "react-router-dom";
export const EditProduct = () => {
  const [product, setProduct] = useState({ name: "", price: "" });
  const productEdit = useSelector((state) => state.products.editProduct);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    setProduct(productEdit);
  }, [productEdit]);

  const onChangeForm = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const { name, price } = product;
  const submitEditProduct = (e) => {
    e.preventDefault();
    dispatch(editProductAction(product));
    history.push("/");
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">Edit product</h2>
            <form onSubmit={submitEditProduct}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product name"
                  name="name"
                  value={name}
                  onChange={onChangeForm}
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  name="price"
                  value={price}
                  onChange={onChangeForm}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
