import { configureStore } from "@reduxjs/toolkit";
import productSlice from './fetchProduct'
const store = configureStore({
    reducer:{ 
        product:productSlice,
        // graph:graphDataSlice,
    }
})

export default store;