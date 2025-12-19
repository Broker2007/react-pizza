import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

type FetchPizzasArgs = {
  categoryId: number;
  type: string;
  search: string;
};

interface Pizza {
  _id: string;
  imageUrl: string;
  name: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}
export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
  "pizza/fetchByStatus",
  async ({ categoryId, type, search }) => {
    console.log(type);
    let response = await axios.post<Pizza[]>("http://localhost:3000/pizzas", {
      categoryId: categoryId,
      type: type,
      search: search,
    });
    return response.data;
  }
);

interface PizzaSliceState {
  items: Pizza[];
  status: "loading" | "success" | "error";
}

const initialState:PizzaSliceState = {
  items: [],
  status: "loading",
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setPizza(state, action:PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = "loading";
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = "error";
      state.items = [];
    });
  },
});

// Action creators are generated for each case reducer function
export const { setPizza } = pizzaSlice.actions;

export default pizzaSlice.reducer;
