import axios from "axios";
import {COMMENT_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllComments } from "../redux/commentSlice";

const useGetAllComment = (id) => {
    const dispatch = useDispatch()

    useEffect(()=>{
        const getComment = async () => {
            try {
                const res = await axios.get(`${COMMENT_API_END_POINT}/allcomment/${id}`,{
                    withCredentials:true
                });

                dispatch(getAllComments(res?.data?.comment));
                
            } catch (error) {
                console.log(error);
            }
            // return res?.data?.comment
        }
        getComment();
    },[id]);
};
export default useGetAllComment;