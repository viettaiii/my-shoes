import * as typesAction from '../constants/productConstants';
import axios from 'axios';
import { URL } from "../../urlApi";
export const getProducts = () =>  async (dispatch) => {
    try {
        dispatch({type : typesAction.GET_PRODUCT_REQUEST });
        const {data} = await axios.get(`${URL}/api/product`);
        dispatch( {
            type : typesAction.GET_PRODUCT_SUCCESS,
            payload : data
        })
    }catch(error) {
       dispatch({type : typesAction.GET_PRODUCT_FAIL , payload : error.response && error.response.data.message ? error.response.data.message : error.message});
    }
}
export const getProductDetails = (id) =>  async (dispatch) => {
    try {
        dispatch({type : typesAction.GET_PRODUCT_DETAILS_REQUEST});
        const {data } = await axios.get(`${URL}/api/product/${id}/`);
        dispatch( {
            type : typesAction.GET_PRODUCT_DETAILS_SUCCESS,
            payload : data[0]
        })
    }catch(error) {
        dispatch({type : typesAction.GET_PRODUCT_DETAILS_FAIL , payload : error.response && error.response.data.message ? error.response.data.message : error.message});
    }
}