import { createSlice } from "@reduxjs/toolkit";

const tweetSlice = createSlice({
    name: "tweet",
    initialState: {
        alltweet: null,
        refresh: false,
        isActiveTweet: null,
        isActive: true,
        mark: false,
        usertweet:null,
        bookmarktweet:null,
    },
    reducers: {
        // multiple actions
        getAllTweets: (state, action) => {
            state.alltweet = action.payload;
        },
        getActiveTweetid: (state, action) => {
            state.isActiveTweet = action.payload;
        },
        getIsActive: (state, action) => {
            state.isActive = action.payload;
        },
        getActiveCheck: (state, action) => {
            state.isActive = action.payload;
        },
        getIsMark: (state, action) => {
            state.mark = action.payload;
        },
        getUserTweet: (state, action) => {
            state.usertweet = action.payload;
        },
        getBookmarkTweet: (state, action) => {
            state.bookmarktweet = action.payload;
        },
        getRefresh: (state) => {
            state.refresh = !state.refresh;
        },

    }
});
export const { getAllTweets, getRefresh,
    getUserTweet, getBookmarkTweet,
    getIsActive, getIsMark,
    getActiveTweetid } = tweetSlice.actions;
export default tweetSlice.reducer;
