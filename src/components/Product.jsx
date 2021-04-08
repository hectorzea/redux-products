import React from "react";
import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import {
  deleteProductAction,
  editProductSelectAction,
} from "../actions/productActions";
import Swal from "sweetalert2";

export const Product = ({ product }) => {
  const { name, price, id } = product;

  const dispatch = useDispatch();
  const history = useHistory();

  const confirmDeleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProductAction(id));
      }
    });
  };

  const redirectProductEdition = (product) => {
    dispatch(editProductSelectAction(product));
    history.push(`/products/edit/${id}`);
  };

  return (
    <tr>
      <td>{name}</td>
      <td>
        <span className="font-weight-bold">{price}</span>
      </td>
      <td className="acciones">
        <button
          type="button"
          onClick={() => {
            redirectProductEdition(product);
          }}
          className="btn btn-primary mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => {
            confirmDeleteProduct(id);
          }}
          type="button"
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
