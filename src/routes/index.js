import routesConfig from "../config/routes";
import Home from "../pages/home";
import Nike from "../pages/nike";
import Cart from "../pages/cart";
import ProductDetail from "../pages/productDetail";
import Product from "../pages/Product";
import NikeNam from "../pages/nike/nikeNam";
import NikeNu from "../pages/nike/nikeNu";



import Adidas from "../pages/adidas";
import AdidasNam from "../pages/adidas/adidasNam";
import AdidasNu from "../pages/adidas/adidasNu";
import Jordan from "../pages/jordan";
import AirJordan from "../pages/jordan/airJordan";
import Yeezy from "../pages/yeezy";
import OtherBrands from "../pages/otherBrands";
import Checkout from "../pages/checkout";
import Login from "../pages/logIn";
import Signup from "../pages/signUp";
import Profile from "../pages/profile";
import Manager from "../pages/admin";
export const publicRoutes = [
    {path : routesConfig.home, component:Home },
    {path : routesConfig.nike , component:Nike },
    {path : routesConfig.nikeNam , component:NikeNam },
    {path : routesConfig.nikeNu , component:NikeNu },


    {path : routesConfig.adidas , component:Adidas },
    {path : routesConfig.adidasNam , component:AdidasNam },
    {path : routesConfig.adidasNu , component:AdidasNu},

    {path : routesConfig.jordan , component:Jordan },
    {path : routesConfig.airJordan , component:AirJordan },
    
    {path : routesConfig.yeezy , component:Yeezy },
    {path : routesConfig.otherBrands , component:OtherBrands },
    
    {path : routesConfig.cart , component:Cart },
    {path : routesConfig.productDetail , component:ProductDetail },
    {path : routesConfig.product , component:Product },

    
    {path : routesConfig.login , component:Login },
    {path : routesConfig.signup, component:Signup },    



    {path : routesConfig.checkOut , component:Checkout  , wrapper :null},
    {path : routesConfig.profile , component:Profile  , wrapper :null},
    {path : routesConfig.admin , component:Manager  , wrapper :null},
]

