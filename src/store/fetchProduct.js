import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const STATUSES = Object.freeze({
    IDEL:'idel',
    ERROR:'error',
    LOADING:'loading'
});


const productSlice = createSlice({
    name:"product",
    initialState:{
        data:[],
        status:STATUSES.IDEL,
    },
    extraReducers: (builder) =>{
        builder
        .addCase(fetchProducts.pending,(state,action)=>{
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.data = action.payload;
            state.status = STATUSES.IDEL
        })
        .addCase(fetchProducts.rejected,(state,action)=>{
            state.status = STATUSES.ERROR;
        })
    }
})
export default productSlice.reducer;

export const fetchProducts = createAsyncThunk('/product/fetch',async()=>{
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
    const data = await res.json();
    return data;
})
