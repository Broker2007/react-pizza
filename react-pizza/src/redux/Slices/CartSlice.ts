import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {fetchPizzas} from "./PizzaSlice";
import {cartPriceRender} from "../../utils/cartPriceRender";

type CartRemoveArgs = {
    _id:string
}
export interface CartPizza {
    _id:string;
    imageUrl:string;
    name:string;
    type:string;
    size:number;
    price:number;
}
export type CartPizzaAdd = {
    imageUrl:string;
    name:string;
    types:string
    sizes:number;
    price:number;
}
export const addCart = createAsyncThunk(
    'cart/fetchByStatus',
    async (params:CartPizzaAdd) => {
        let {name ,price, types, sizes, imageUrl} = params
        try {
            let response = await axios.post('http://localhost:3000/cart/add', {
                type: types,
                size:sizes,
                price: price,
                name:name,
                imageUrl: imageUrl
            })
        }catch (err){
            return "Все плохо" as string
        }
    }
)

export const fetchCart = createAsyncThunk(
    'cart/fetchPizzas',
    async () => {
            let {data} = await axios.get<CartPizza[]>('http://localhost:3000/cart')
            return data as CartPizza[]
    }
)

export const removeCart = createAsyncThunk(
    'cart/removePizzas',
    async (params:CartRemoveArgs) => {

        try {
            let { _id } = params
            let response = await axios.get('http://localhost:3000/cart/remove', {
                params: {
                    id:_id
                }
            })
            return response.data as CartPizza[]
        }catch (err){
            return "Все плохо" as string
        }
    }
)

export const removeAll = createAsyncThunk(
    'cart/removeAll',
    async () => {

        try {
            let response = await axios.get('http://localhost:3000/cart/removeAll')
        }catch (err){
            return "Все плохо" as string
        }
    }
)


interface CartSliceState {
    cartItems: CartPizza[];
    cartPrice: number;
    status: 'loading' | 'success' | 'error',
    lenCart: number;
}
const initialState:CartSliceState = {
    cartItems: [],
    cartPrice: 0,
    status: 'loading',
    lenCart: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart(state, action:PayloadAction<CartPizza[]>) {
            state.cartItems = action.payload
        },
        setPrice(state, action:PayloadAction<number> ) {
            state.cartPrice = action.payload
        },
        setLenCart(state, action:PayloadAction<number> ) {
            state.lenCart = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchCart.pending, (state, action) => {
            state.status = 'loading'
            state.cartItems = []
        })
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.cartItems = action.payload
            state.status = 'success'
        })
    },
})

// Action creators are generated for each case reducer function
export const { setCart ,setPrice,setLenCart } = cartSlice.actions

export default cartSlice.reducer