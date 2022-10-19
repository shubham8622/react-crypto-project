import { configureStore } from "@reduxjs/toolkit";
import productSlice from './fetchProduct'
import graphPriceSlice from './productPriceForGraph';
const store = configureStore({
    reducer:{ 
        product:productSlice,
        priceForGraph:graphPriceSlice,
    }
})

export default store;