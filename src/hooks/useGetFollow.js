import axios from "axios";
import { USER_API_END_POINT } from '../utils/constant'
import { useSelector } from "react-redux";
import { useEffect } from "react";

const useGetFollow =  (id) => {

    useEffect(() => {
        const Follow = async () => {

            const { user } = useSelector(store => store.user);
            const loginUserId = user._id

            try {
                const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, { loginUserId }, {
                    withCredentials: true
                });
                console.log(res);
                toast.success(res.data.message)


            } catch (error) {
                toast.error("interner code error")
                console.log(error);


            }
        }
        Follow()

    }, [id])
}

export { useGetFollow }