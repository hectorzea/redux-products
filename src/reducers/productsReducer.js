//each reduces has its own state
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
  PRODUCT_EDIT_ERROR,
} from "../types";
const initialState = {
  products: [],
  error: null,
  loading: false,
  deleteProduct: null,
  editProduct: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
    case START_PRODUCTS_DOWNLOAD:
      return { ...state, loading: action.payload };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload],
      };
    case ADD_PRODUCT_ERROR:
    case PRODUCTS_DOWNLOAD_ERROR:
    case PRODUCT_DELETE_ERROR:
    case PRODUCT_EDIT_ERROR:
      return { ...state, loading: false, error: action.payload };
    case PRODUCTS_DOWNLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload,
      };
    case GET_DELETE_PRODUCT:
      return {
        ...state,
        deleteProduct: action.payload,
      };
    case GET_EDIT_PRODUCT:
      return {
        ...state,
        editProduct: action.payload,
      };
    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== state.deleteProduct
        ),
        deleteProduct: null,
      };
    case START_PRODUCT_EDITION:
      return { ...state, editProduct: action.payload };
    case PRODUCT_EDIT_SUCCESS:
      return {
        ...state,
        editProduct: null,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? (product = action.payload)
            : product
        ),
      };
    default:
      return state;
  }
};
