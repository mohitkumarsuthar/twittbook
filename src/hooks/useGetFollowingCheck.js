import axios from "axios";
import {USER_API_END_POINT} from "../utils/constant";import { useDispatch,useSelector } from "react-redux";
import { getFollowingCheck } from "../redux/userSlice";

const useGetFollowingCheck = (id) => {
    const dispatch = useDispatch();
    const {user} = useSelector(store=>store.user);
    const loggedInUserId = user._id;
    
        const checkfollower = async () => {
            try {
                const res = await axios.post(`${USER_API_END_POINT}/checkfollow/${id}`,{loggedInUserId},{
                    withCredentials:true
                });

                dispatch(getFollowingCheck(res?.data?.message));
                
            } catch (error) {
                console.log(error);
            }
        }
        checkfollower();
};
export default useGetFollowingCheck;