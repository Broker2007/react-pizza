import {CartPizza, setLenCart, setPrice} from "../redux/Slices/CartSlice";
import {RootState, useAppDispatch} from "../redux/store";
import {useSelector} from "react-redux";
export const cartPriceRender = (cartItems:CartPizza[]) => {
    let price:number = 0;
    for (let i = 0; i < cartItems.length; i++ ){
        let item = cartItems[i];
        price += item.price
    }
    return {price:price, items:cartItems.length}
}