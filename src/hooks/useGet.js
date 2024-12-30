import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyProfile,getuserTweet } from "../redux/userSlice";
import { getUserTweet } from "../redux/tweetSlice";

const useGet = (id) => {
    const dispatch = useDispatch()

    useEffect(()=>{
        const fetchMyprofile = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`,{
                    withCredentials:true
                });
                console.log(res);
                
                dispatch(getuserTweet(res?.data?.userTweet));
            } catch (error) {
                console.log(error);
            }
        }
        fetchMyprofile();
    },[id]);
}
export default useGet;