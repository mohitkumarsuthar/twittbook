import React, { useEffect } from 'react'
import useGetAllNotification from '../hooks/useGetAllNotification'
import { useDispatch, useSelector } from 'react-redux'
import Noti from './Noti'
const Notification = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.user)
    useGetAllNotification(user._id);
    const { allnotification } = useSelector(store => store.user)
    console.log(allnotification);



    return (
        <div className='w-[37%] h-100'>
            <div className='ms-4'>
                Notification
            </div>
            {
                allnotification?.slice().reverse().map((noti) => <Noti key={noti._id} noti={noti} />
                )
            }
        </div>
    )
}
export default Notification
