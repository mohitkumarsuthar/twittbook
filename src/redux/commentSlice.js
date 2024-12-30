import {createSlice} from "@reduxjs/toolkit";

const commentSlice = createSlice({
    name:"comment",
    initialState:{
        allofcomment:null,
        allcomment:null,
        check:false,
        commentRefresh:false
    },
    reducers:{
        // multiple actions
        getAllComments:(state,action)=>{
            state.allcomment = action.payload;
        },
        getAllOfComments:(state,action)=>{
            state.allofcomment = action.payload;
        },
        getcommentsCheck:(state,action)=>{
            state.check = action.payload;
        },
        getCommentRefresh:(state)=>{
            state.refresh = !state.refresh;
        },
        
        
    }
});
export const {getAllComments,getcommentsCheck,
    getCommentRefresh, getAllOfComments} = commentSlice.actions;
export default commentSlice.reducer;
