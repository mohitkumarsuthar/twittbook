import React from 'react'

import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RightSideBar = ( {otherUsers} ) => {
  
  const { check } = useSelector(store => store.comment)


  return (
    <div className='w-[22%] h-96 fixed right-20 '>
      <div className='h-16 bg-gray-300 rounded-lg z-0 top-0  flex justify-center align-middle p-3 sticky'>
        
    <div className='flex items-center p-2 bg-gray-100 bg-black rounded-full outline-none w-full '>
      <CiSearch size="20px" />
      <input type="text" className='bg-transparent outline-none px-2' placeholder='Search' />
    </div>
      </div>
    <div className={` ${check ? "fixed" : ""} p-4 bg-gray-100 rounded-2xl my-4 `}>
      <h1 className='font-bold text-lg '>Who to follow</h1>
      
      {
          
          // otherUsers.length > 0 ? (
            otherUsers?.map((user) => (
              <div key={user._id} className='flex items-center justify-between p-2 my-3'>
                <div className='flex'>
                  <Avatar src={user.avatar || "https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg"} size="40" round={true} />
                  <div className='ml-2'>
                    <h1 className='font-bold'>{user?.name}</h1>
                    <p className='text-sm'>{`@${user?.username}`}</p>
                  </div>
                </div>
                <div>
                  <Link to={`/profile/${user?._id}`}>
                    <button className='px-4 py-1 bg-black text-white rounded-full'>Profile</button>
                  </Link>
                </div>
              </div>
            ))
          
        }
        
        <div className='flex items-center justify-between p-2 my-3 cursor-pointer'>
          <button className='p-3 bg-slate-300 rounded-lg m-auto'>more</button>
        </div>
      </div>
    </div>
  )
}

export default RightSideBar
