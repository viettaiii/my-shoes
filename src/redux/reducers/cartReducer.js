import * as typesActions  from '../constants/cartConstants';



export const getCartReducer = (state = {cartItems : []} ,action) => {
    switch(action.type) {
        case typesActions.GET_CART_REQUEST: 
            return {
                loading:true,
                cartItems : []
            }
        case typesActions.GET_CART_SUCCESS :
            return {
                loading:false,
                cartItems : action.payload
            }    
            case typesActions.GET_CART_FAIL :
                return {
                    loading:true,
                    cartItems : action.payload
                } 
        default : 
            return state
      
    }
}