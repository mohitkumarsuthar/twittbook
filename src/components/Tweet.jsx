// import React from 'react'
import Avatar from 'react-avatar'
import axios from 'axios';
import { FaRegComment, FaSleigh } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { CiBookmarkCheck } from "react-icons/ci";
import { TWEET_API_END_POINT, USER_API_END_POINT, COMMENT_API_END_POINT } from '../utils/constant'
import toast from "react-hot-toast"
import { useSelector, useDispatch } from 'react-redux';
import { getRefresh, getIsMark, getActiveTweetid } from '../redux/tweetSlice';
import { getuserTweet } from '../redux/userSlice';
import { getcommentsCheck } from '../redux/commentSlice';
import { getMyProfile } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useGetProfile from '../hooks/useGetProfile';

const Tweet = ({ tweet, profile1, allofcomment }) => {

    const { user, profile } = useSelector(store => store.user)
    const { mark, refresh, isActive } = useSelector(store => store.tweet)
    const { check } = useSelector(store => store.comment)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const id = user._id;
    const pId = profile?.user?._id;
    const tweetId = tweet._id;
    // getMyProfile(user._id)
    var marks = false
    var count = 0




    profile1?.bookmarks?.map((item) => {
        if (item == tweetId) {
            marks = true
        }
    })

    profile?.user?.bookmarks?.map((item) => {
        if (item == tweetId) {
            marks = true
        }
    })

    allofcomment?.map((item) => {
        if (item?.postId == tweet?._id) {
            count++;
        }
    })


    const fetchMyprofile = async () => {
        // e.preventDefault()
        try {
            const res = await axios.get(`${USER_API_END_POINT}/profile/${pId}`, {
                withCredentials: true
            });
            dispatch(getMyProfile(res?.data));
            // dispatch(getuserTweet(res?.data?.userTweet));
        } catch (error) {
            console.log(error); 
        }
    }
    // useEffect(() => {
    //     fetchMyprofile();
    // }, [refresh]);



    const likeHandler = async (id) => {
        try {
            const res = await axios.put(`${TWEET_API_END_POINT}/like/${id}`, { id: user?._id }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                },

            });
            if (res) {

                toast.success(res.data.message)
                // dispatch(getMyProfile(user?._id))
                dispatch(getRefresh())
                fetchMyprofile();
                // dispatch(getRefreshUser())
            }
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error);
        }
    }

    const bookmarkhandler = async (id, ID) => {
        console.log(id,ID);
        
        try {
            const res = await axios.put(`${USER_API_END_POINT}/bookmark/${id}`, { id: user?._id }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            toast.success(res.data.message)
            if (res != null) {
                const res = await axios.get(`${USER_API_END_POINT}/profile/${ID}`, {
                    withCredentials: true
                });
                // if (isActive == true) {
                    // dispatch(getMyProfile(res?.data));
                // }
                // markHandler()
                dispatch(getRefresh())
                fetchMyprofile();   
                // profile?.user?.bookmarks?.map((item) => {
                //     if (item == tweetId) {
                //         marks = true
                //     }
                // })
                // dispatch(getRefreshUser())
            }

        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error);
        }
    }

    const deletetweethandler = async (id) => {
        try {
            const conform = confirm("delete tweet parmanent");

            if (conform) {
                const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                if (res) {
                    toast.success(res.data.message)
                    dispatch(getRefresh())
                    fetchMyprofile();

                }
            }
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error);
        }
    }

    const commenthandler = (id) => {
        if (check) {
            navigate("/")
            dispatch(getcommentsCheck(false))
        } else {
            navigate("/comment")
            dispatch(getcommentsCheck(true))
            dispatch(getActiveTweetid(id))
        }
    }

    return (

        <div className='border-b border-s border-e  border-gray-200'>

            <div key={tweet?._id} className=''>
                <div className='flex p-4'>
                    <Avatar src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="40" round={true} />
                    <div className=' ml-2 w-full'>
                        <div className='flex items-center'>
                            <h1 className='font-bold'>{tweet?.userDetails[0]?.name}</h1>
                            <p className='text-gray-500 text-sm ml-1'>{`@${tweet?.userDetails[0]?.username}`}</p>
                        </div>
                        {
                            tweet?.tweetImage ?
                                <div className='flex justify-center  w-auto h-80'>
                                    <img className='rounded-md m-4' src={tweet?.tweetImage} />
                                </div> : ""
                        }
                        <div>
                            <p>{tweet?.description}</p>
                        </div>
                        <div className='flex justify-between my-3'>

                            <div onClick={() => commenthandler(tweet?._id)} className='flex items-center'>
                                <div className='p-2 hover:bg-green-200 rounded-full cursor-pointer'>
                                    <FaRegComment size="20px" />
                                </div>
                                <p>{count}</p>
                            </div>
                            <div className='flex items-center'>
                                <div onClick={() => likeHandler(tweet?._id)} className='p-2 hover:bg-pink-200 rounded-full cursor-pointer'>
                                    <CiHeart size="24px" />

                                </div>
                                <p>{tweet?.like?.length}</p>
                            </div>
                            <div onClick={() => bookmarkhandler(tweet._id, pId)} className='flex items-center'>
                                <div className='p-2 hover:bg-yellow-200 rounded-full cursor-pointer'>
                                    {
                                        // profile.bookmarks.map((book)=>{
                                        //     book == tweet._id ? 
                                        marks ? <CiBookmarkCheck size="24px" />
                                            :
                                            <CiBookmark size="24px" />

                                        // }) 
                                    }
                                </div>
                                <p>{tweet?.bookmarks?.length}</p>
                            </div>
                            {
                                user._id === tweet?.userId ?
                                    <div onClick={() => deletetweethandler(tweet._id)} className='flex items-center'>
                                        <div className='p-2 hover:bg-red-300 rounded-full cursor-pointer'>
                                            <MdOutlineDeleteOutline size="24px" />
                                        </div>
                                    </div> : ""
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Tweet
