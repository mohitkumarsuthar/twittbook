import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllTweets } from "../redux/tweetSlice"

const useGetAllTweets = (id) => {
    const dispatch = useDispatch()
    const { refresh,isActive } = useSelector(store => store.tweet)



        const fetchAllTweet = async () => {
            try {
                const res = await axios.get(`${TWEET_API_END_POINT}/alltweets/${id}`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    },

                });


                dispatch(getAllTweets(res?.data));


            } catch (error) {
                console.log(error);
            }
        }
        
    const followingTweetHandler = async () => { 
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.get(`${TWEET_API_END_POINT}/followingtweets/${id}`);
            console.log(res);
            dispatch(getAllTweets(res?.data));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (isActive) {
            fetchAllTweet();
        } else {
            followingTweetHandler();
        }
    }, [isActive, refresh]);
};
export default useGetAllTweets;