import axios from "axios";
import {NOTIFICATION_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllNotification } from "../redux/userSlice";

const useGetAllNotification = (id) => {
    const dispatch = useDispatch()

    useEffect(()=>{
        const getNotification = async () => {
            try {
                const res = await axios.get(`${NOTIFICATION_API_END_POINT}/allnotification/${id}`,{
                    withCredentials:true
                });

                dispatch(getAllNotification(res?.data?.notification));
                
            } catch (error) {
                console.log(error);
            }
        }
        getNotification();
    },[id]);
};
export default useGetAllNotification;