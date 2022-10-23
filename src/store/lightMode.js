import { createSlice } from "@reduxjs/toolkit";
const statuses = {
    ERROR:"error",
    LOADING:"loading",
    IDEL:"idel"
}

const initialState = {
    modeIs:(localStorage.getItem("theme"))?localStorage.getItem("theme"):localStorage.setItem("theme","dark"),
    status:statuses.IDEL
}

const lightMode = createSlice({
    name:"lightMode",
    initialState,
    reducers:{
        changeMode(state,action){
            localStorage.setItem("theme",action.payload);
            state.modeIs = action.payload;
            state.status = statuses.IDEL;
        }
    }
});

export const {changeMode} = lightMode.actions;
export default lightMode.reducer;
