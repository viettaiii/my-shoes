import * as typesActions from "../constants/productConstants";

export const getProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case typesActions.GET_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case typesActions.GET_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case typesActions.GET_PRODUCT_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getProductDetailsReducer = (state = { product:{} }, action) => {
    switch (action.type) {
      case typesActions.GET_PRODUCT_DETAILS_REQUEST:
        return {
          loading: true,
          product: {},
        };
      case typesActions.GET_PRODUCT_DETAILS_SUCCESS:
        return {
          loading: false,
          product: action.payload,
        };
      case typesActions.GET_PRODUCT_DETAILS_FAIL:
        return {
          loading: true,
          error: action.payload,
        };
       case typesActions.REMOVE_PRODUCT_DETAILS :
           return {
               product: {}
           }
      default:
        return state;
    }
  };

  export const removeDetails = () => (dispatch) =>{
    dispatch({
        type : typesActions.REMOVE_PRODUCT_DETAILS
    })
  }
