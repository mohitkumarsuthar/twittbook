import axios from "axios";
import {USER_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBookmarkTweet } from "../redux/tweetSlice";

const useGetAllBookmark = (id) => {
    const dispatch = useDispatch()

    useEffect(()=>{
        const getBookmark = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/allbookmark/${id}`,{
                    withCredentials:true
                });

                dispatch(getBookmarkTweet(res?.data?.bookmarkalltweet));
            } catch (error) {
                console.log(error);
            }
            // return res?.data?.comment
        }
        getBookmark();
    },[id]);
};
export default useGetAllBookmark;