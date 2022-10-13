import { configureStore } from "@reduxjs/toolkit";
import productSlice from '../store/fetchProduct'
const store = configureStore({
    reducer:{ 
        product:productSlice
    }
})

export default store;