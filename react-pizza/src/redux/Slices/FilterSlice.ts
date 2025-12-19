import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type SortItem = {
    name: string,
    sortProperty: string,
}
interface FilterSliceState {
    categoryId: number;
    sort: SortItem
    search: string
}

const initialState:FilterSliceState = {
    categoryId: 0,
    sort: {
        name: "цене",
        sortProperty: "price",
    },
    search: ''
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action:PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSort(state, action:PayloadAction<SortItem>) {
            state.sort = action.payload
        },
        setSearch(state, action:PayloadAction<string>) {
            state.search = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setCategoryId,setSort ,setSearch} = filterSlice.actions

export default filterSlice.reducer