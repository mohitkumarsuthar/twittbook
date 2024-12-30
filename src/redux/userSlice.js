import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        otherUsers: null,
        profile: null,
        active: false,
        refreshUser: false,
        followingcheck: null,
        allnotification:null,
        userTweet:null
    },
    reducers: {
        // multiple actions
        getUser: (state, action) => {
            state.user = action.payload;
        },
        getOtherUsers: (state, action) => {
            state.otherUsers = action.payload;
        },
        getMyProfile: (state, action) => {
            state.profile = action.payload;
        },
        getuserTweet: (state, action) => {
            state.userTweet = action.payload;
        },
        getProfileActive: (state, action) => {
            state.active = action.payload;
        },
        getRefreshUser:(state)=> {
            state.refresh = !state.refresh;
        },
        getFollowingCheck: (state, action) => {
            state.followingcheck = action.payload;
        },
        getAllNotification: (state, action) => {
            state.allnotification = action.payload;
        },
    }
});
export const { getUser, 
    getOtherUsers, getMyProfile, 
    getProfileActive, getRefreshUser,
    getFollowingCheck, getAllNotification,
    getuserTweet } = userSlice.actions;
export default userSlice.reducer;
