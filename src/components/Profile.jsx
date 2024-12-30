import React, { useEffect } from 'react'
import axios, { all } from "axios";
import toast from "react-hot-toast"
import { USER_API_END_POINT } from "../utils/constant";
import { Link, useParams } from 'react-router-dom'
import { IoMdArrowBack } from "react-icons/io";
import Tweet from './Tweet';
import Avatar from 'react-avatar'
import { getRefreshUser, getMyProfile } from '../redux/userSlice';
import { getIsActive } from '../redux/tweetSlice';
import useGet from '../hooks/useGet';
import useGetProfile from '../hooks/useGetProfile';
import useGetFollowingCheck from '../hooks/useGetFollowingCheck';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserTweet } from "../redux/tweetSlice";
const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, profile, userTweet, followingcheck } = useSelector(store => store.user);
    const { usertweet } = useSelector(store => store.tweet);
    const { allofcomment } = useSelector(store => store.comment);
    const loginUserId = user._id
    const { id } = useParams();
    console.log(profile.userTweet);
    console.log(allofcomment);
    // dispatch(getIsActive(true))

    console.log(id);
    useGetProfile(id)
    useGet(id)
    useGetFollowingCheck(id)
    // dispatch(getUserTweet(profile?.userTweet))
    const fetchMyprofile = async () => {

        try {
            const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`, {
                withCredentials: true
            });
            dispatch(getMyProfile(res?.data))
            // dispatch(getUserTweet(res?.data))
        } catch (error) {
            console.log(error);
        }
    }
    //Follow
    // useEffect(() => {
    //     fetchMyprofile();
    // }, [id])

    const Follow = async () => {

        try {
            console.log("follow");

            const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, { loginUserId }, {
                headers: {
                    'Content-Type': "application/json"
                },
                withCredentials: true
            });
            dispatch(getRefreshUser())
            toast.success(res.data.message)
            fetchMyprofile();


        } catch (error) {
            toast.error("internel code error")
            console.log(error);


        }
    }

    //Unfollow
    const UnFollow = async () => {

        try {
            console.log("unfollow");
            console.log(loginUserId);


            const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, { loginUserId }, {
                headers: {
                    'Content-Type': "application/json"
                },
                withCredentials: true
            });
            dispatch(getRefreshUser())
            toast.success(res.data.message)
            fetchMyprofile();
        } catch (error) {
            toast.error("internel code error")
            console.log(error);


        }
    }
    return (
        <div className='w-[40%] border-l border-r border-gray-200'>
            <div>
                <div className='flex items-center py-2 p-2'>
                    <Link to="/" className='p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer'>
                        <IoMdArrowBack size="24px" />
                    </Link>
                    <div className='ml-2'>
                        <h1 className='font-bold text-lg'>{profile?.user?.name}</h1>
                        <p className='text-gray-500 text-sm'>10 post</p>
                    </div>
                </div>

                <div className='w-100 h-100 overflow-hidden flex justify-center'>
                    <img className='h-64 w-100 bg-center bg-cover bg-no-repeat' src={`${profile?.user?.backSidePhoto}`} alt="banner" />
                </div>
                <div className='absolute top-64 ml-2 border-4 border-white rounded-full'>
                    <Avatar src={`${profile?.user?.avatarLocalPath}`} size="100" round={true} />
                </div>
                {
                    user?._id == profile?.user?._id ?

                        <div className='text-right m-4'>
                            <Link to={`/profile/update/${user._id}`}>
                                <button className='px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400'>Edit Profile</button>
                            </Link>
                            {/* <button className='px-4 py-1 bg-black text-white rounded-full'></button> */}
                        </div>
                        :
                        followingcheck == "false" ?
                            <div
                                className='text-right m-4'
                                onClick={() => Follow(profile?.user?._id)}>
                                <button className='px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400'>follow</button>
                            </div>
                            : <div
                                className='text-right m-4'
                                onClick={() => UnFollow(profile?.user?._id)}>
                                <button className='px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400'>unfollow</button>
                            </div>

                }
                <div className='m-4'>
                    <h1 className='font-bold text-xl'>{profile?.user?.name}</h1>
                    <p>{"@" + profile?.user?.username}</p>
                </div>
                <div className='flex h-11 ms-4'>

                    <div className='m-1 me-5'>
                        <h4 className='font-bold'>{profile?.user?.followers?.length}</h4>
                        <p>folowers</p>
                    </div>
                    <div className='m-1'>
                        <h4 className='font-bold'>{profile?.user?.following?.length}</h4>
                        <p>folowing</p>
                    </div>
                </div>
                <div className='m-4 text-sm'>
                    <p>{profile?.user?.bio}</p>
                </div>
            </div>
            <hr />
            <div>

                {
                    profile?.userTweet?.map((tweet) => <Tweet key={tweet._id} tweet={tweet} allofcomment={allofcomment}/>
                    )
                }
            </div>
        </div>
    )
}

export default Profile
