import axios from "axios";
import {COMMENT_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllOfComments } from "../redux/commentSlice";

const useGetAllOfComment = (id) => {
    const dispatch = useDispatch()

    useEffect(()=>{
        const getComment = async () => {
            try {
                const res = await axios.get(`${COMMENT_API_END_POINT}/allofcomment`,{
                    withCredentials:true
                });

                dispatch(getAllOfComments(res?.data?.comment));
                
            } catch (error) {
                console.log(error);
            }
            // return res?.data?.comment
        }
        getComment();
    },[id]);
};
export default useGetAllOfComment;