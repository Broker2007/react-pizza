import { configureStore } from '@reduxjs/toolkit'
import filter from './Slices/FilterSlice'
import pizza from './Slices/PizzaSlice'
import cart from './Slices/CartSlice'
import {useDispatch} from "react-redux";

export const store = configureStore({
    reducer: {
        filter: filter,
        pizza:pizza,
        cart:cart
    },
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()