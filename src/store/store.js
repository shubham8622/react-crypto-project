import { configureStore } from "@reduxjs/toolkit";
import productSlice from './fetchProduct'
import graphPriceSlice from './productPriceForGraph';
import lightModeSlice from './lightMode';
const store = configureStore({
    reducer:{ 
        product:productSlice,
        priceForGraph:graphPriceSlice,
        lightMode:lightModeSlice,
    }
})

export default store;