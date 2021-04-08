import Swal from "sweetalert2";
import axiosClient from "../config/axios";
import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  START_PRODUCTS_DOWNLOAD,
  PRODUCTS_DOWNLOAD_SUCCESS,
  PRODUCTS_DOWNLOAD_ERROR,
  GET_DELETE_PRODUCT,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_ERROR,
  GET_EDIT_PRODUCT,
  START_PRODUCT_EDITION,
  PRODUCT_EDIT_SUCCESS,
} from "../types";

//create product
export const createNewProductAction = (product) => {
  return async (dispatch) => {
    dispatch(addProduct(product));
    try {
      await axiosClient.post("/products", product);
      dispatch(addProductSuccess(product));
      Swal.fire("Success", "The product has been added", "success");
    } catch (error) {
      console.log(error);
      dispatch(addProductError(true));
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error",
      });
    }
  };
};

const addProduct = () => ({
  type: ADD_PRODUCT,
  payload: true,
});

const addProductSuccess = (product) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product,
});
const addProductError = (status) => ({
  type: ADD_PRODUCT_ERROR,
  payload: status,
});

//handlers for the product download

export const getProductsAction = () => {
  return async (dispatch) => {
    dispatch(getProducts());
    try {
      const response = await axiosClient.get("/products");
      dispatch(successDownloadProducts(response.data));
    } catch (error) {
      dispatch(errorDownloadProducts());
    }
  };
};

const getProducts = () => ({ type: START_PRODUCTS_DOWNLOAD, payload: true });

const errorDownloadProducts = () => ({
  type: PRODUCTS_DOWNLOAD_ERROR,
  payload: true,
});

const successDownloadProducts = (products) => ({
  type: PRODUCTS_DOWNLOAD_SUCCESS,
  payload: products,
});

//handlers for the product delete

export const deleteProductAction = (id) => {
  return async (dispatch) => {
    dispatch(selectProductToDelete(id));
    try {
      await axiosClient.delete(`/products/${id}`);
      dispatch(successDeleteProduct());
      Swal.fire("Deleted!", "Your product has been deleted.", "success");
    } catch (error) {
      console.log(error);
      dispatch(errorDeleteProduct());
    }
  };
};

const successDeleteProduct = () => ({
  type: PRODUCT_DELETE_SUCCESS,
});

const errorDeleteProduct = () => ({
  type: PRODUCT_DELETE_ERROR,
  payload: true,
});

const selectProductToDelete = (id) => ({
  type: GET_DELETE_PRODUCT,
  payload: id,
});

//handlers for the product edition

export const editProductSelectAction = (product) => {
  return (dispatch) => {
    dispatch(selectProductToEdit(product));
  };
};

const selectProductToEdit = (product) => ({
  type: GET_EDIT_PRODUCT,
  payload: product,
});

export const editProductAction = (product) => {
  return async (dispatch) => {
    dispatch(editProduct(product));
    try {
      await axiosClient.put(`/products/${product.id}`, product);
      dispatch(editProductSuccess(product));
    } catch (error) {}
  };
};

const editProduct = (product) => ({
  type: START_PRODUCT_EDITION,
});

const editProductSuccess = (product) => ({
  type: PRODUCT_EDIT_SUCCESS,
  payload: product,
});
