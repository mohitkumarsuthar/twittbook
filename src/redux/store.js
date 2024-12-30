
import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import tweetSlice from './tweetSlice'
import commentSlice from './commentSlice'
import bookmarkSlice from './bookmark'
// import tweetSlice from "./tweetSlice";

// import {
//     persistStore,
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
//   } from 'redux-persist'
//   import storage from 'redux-persist/lib/storage'

// const persistConfig = {
//     key: 'root',
//     version: 1,
//     storage,
//   }

// const rootReducer = combineReducers({
//     user:userSlice,
//     tweet:tweetSlice,
// })
// const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer:{
        user:userSlice,
        tweet:tweetSlice,
        comment:commentSlice,
        bookmark:bookmarkSlice,

    }
    // reducer:persistedReducer,
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware({
    //   serializableCheck: {
    //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //   },
    // }),
});
export default store;
