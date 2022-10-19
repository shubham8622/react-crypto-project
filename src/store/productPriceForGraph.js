import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const STATUSES = Object.freeze({
    IDEL:'idel',
    ERROR:'error',
    LOADING:'loading'
});

const initialState = {
    info:"",
    status:STATUSES.IDEL
}

const graphSlice = createSlice({
    name:"pricehForGraph",
    initialState,
    extraReducers:(builder)=>{
    builder
    .addCase(fetchAllPrices.pending,(state,action)=>{
        state.status = STATUSES.LOADING
    })
    .addCase(fetchAllPrices.fulfilled,(state,action)=>{
        state.info = action.payload;
        state.status = STATUSES.IDEL
    })   
    .addCase(fetchAllPrices.rejected,(state,action)=>{
        state.status = STATUSES.ERROR
    })      
    }
})

export default graphSlice.reducer;

export const fetchAllPrices = createAsyncThunk("fetch/price",async ([params,days])=>{
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${params}/market_chart?vs_currency=usd&days=${days}`);
    const data = await res.json();
    return data;
})  