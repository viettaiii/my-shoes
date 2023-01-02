import * as typeActions from "../constants/cartConstants";
import axios from "axios";
import { URL } from "../../urlApi";
import user from '../../user';
export const getCart = () => async (dispatch) => {
      var dat;
      try {
        dispatch({
          type : typeActions.GET_CART_REQUEST,
        })
        if(user.TOKEN !== null && user.TOKEN !== undefined && user.TOKEN !== ""){
          const {data} = await axios.get(`${URL}/api/cart`, {
            headers:{Authorization:`Bearer ${user.TOKEN}`}
          });
          dat = data;
        }else{
          dat = [];
        }
       
        dispatch({
          type : typeActions.GET_CART_SUCCESS,
          payload : dat 
        })
      }catch(err) {
        dispatch ({
          type : typeActions.GET_CART_FAIL ,
          payload : "ERROR GET CART"
        })
      }
  
};
