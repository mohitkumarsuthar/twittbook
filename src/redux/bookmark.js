import {createSlice} from "@reduxjs/toolkit";

const bookmarkSlice = createSlice({
    name:"bookmark",
    initialState:{
        allbookmark:null,
        bookmarkRefresh:false,
    },
    reducers:{
        getAllbookmark:(state,action)=>{
            state.allbookmark = action.payload;
        },
        getbookmarkRefresh:(state)=>{
            state.refresh = !state.refresh;
        },
    }
});
export const {getAllbookmark,getbookmarkRefresh} = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
