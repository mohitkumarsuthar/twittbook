import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../redux/userSlice";
import { getUserTweet } from "../redux/tweetSlice";

const useGetProfile = (id) => {
    const dispatch = useDispatch()

    useEffect(()=>{
        const fetchMyprofile = async () => {
            // e.preventDefault()
            try {
                const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`,{
                    withCredentials:true
                });
                
                console.log(res?.data);
                dispatch(getMyProfile(res?.data));
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchMyprofile();
    },[id]);
}
export default useGetProfile;