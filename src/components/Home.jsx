import React, { useEffect } from 'react'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import { Outlet } from "react-router-dom";
import useGetOtherUser from '../hooks/useGetOtherUser';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useGetAllTweets from '../hooks/useGetAllTweets';
import useGetProfile from '../hooks/useGetProfile';

const Home = () => {
    const navigate = useNavigate();
    console.log("hello");
    
    const {user,otherUsers} = useSelector(store=>store.user)
    if(!user){
        navigate('/login')
    }
        useGetOtherUser(user?._id)
        useGetProfile(user?._id)
        useGetAllTweets(user?._id)

    
    return (
        <>
            <div className='flex justify-center w-[90%] h-100 mx-auto right-0 relative'>
                <LeftSidebar />
                <Outlet />
                <RightSidebar otherUsers={otherUsers}/>
            </div>
        </>
  
    )
}

export default Home

