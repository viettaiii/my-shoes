
import {createStore , combineReducers , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { getProductsReducer  , getProductDetailsReducer} from './reducers/productReducer';
import {getCartReducer} from './reducers/cartReducer';
const reducer = combineReducers( {
    cart : getCartReducer,
    getProducts : getProductsReducer,
    getProductDetails : getProductDetailsReducer
})

const middleware = [thunk];


const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;