import React, { useState, useRef } from 'react'
import Avatar from 'react-avatar'
import { CiImageOn } from "react-icons/ci";
import { TWEET_API_END_POINT } from '../utils/constant'
import toast from "react-hot-toast"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getRefresh, getIsActive } from '../redux/tweetSlice';

const CreatePost = () => {

    const [imageUrl, setImageUrl] = useState(localStorage.getItem('imagurl') || "");

    console.log("1");
    //tweet image
    //+++++++++++++

    const inputFileRef = useRef(null);
    const imageViewRef = useRef(null);
    console.log("1");


    //+++++++++++++

    const { user } = useSelector(store => store.user);
    const { isActive } = useSelector(store => store.tweet);
    const [description, setdescription] = useState("")
    const [tweetImage, settweetImage] = useState(null)
    const dispatch = useDispatch();



    const userId = user ? user._id : null;

    //++++++++++++++++++++++++++++++++++
    const handleFileChange = (event, setFile) => {
        setFile(event.target.files[0]);
        const file = event.target.files[0];
        if (file) {
            settweetImage(file);  // Set the file to the tweetImage state
            const image = URL.createObjectURL(file);
            setImageUrl(image);
        }
    };

    console.log("1");



    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImageUrl(imageUrl);
        }
    };

    const submithandler = async (e) => {
        e.preventDefault();
        try {
            setImageUrl(null)
            
            //+++++++++++++++++++++++++++
            //formData
            console.log(description);
            

            const formData = new FormData();

            formData.append("tweetImage", tweetImage);
            formData.append("description", description);
            formData.append("id", user._id);
            console.log(tweetImage);

            console.log(formData);




            const res = await axios.post(`${TWEET_API_END_POINT}/create`
                , formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                    // 'Content-Type': 'application/json'
                },

            });
            console.log(res);
            setdescription("")

            dispatch(getRefresh());
            if (res.data.success) {
                toast.success(res.data.message);
                console.log("2");
            }
            // toast.success(res.response.data.message);



        } catch (error) {

            toast.error("tweets not created server not response");

            console.log(error, "tweets not created internaly error in code");


        }

    }

    const forYouHandler = () => {
        dispatch(getIsActive(true))

    }

    const followingHandler = () => {
        dispatch(getIsActive(false))

    }


    return (
        <div>
            <div className='w-[100%] h-[100%] border-s border-t border-e border-b border-gray-200'>
                <div>
                    <div className='flex items-center top-0 sticky justify-evenly border-b border-gray-200'>

                        <div onClick={forYouHandler} className={`${isActive ? "border-b-4 border-blue-600" : "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`} >
                            <h1 className='font-semibold text-gray-600 text-lg'>For you</h1>
                        </div>
                        <div onClick={followingHandler} className={`${!isActive ? "border-b-4 border-blue-600" : "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
                            <h1 className='font-semibold text-gray-600 text-lg'>Following</h1>
                        </div>
                    </div>
                    <div >
                        <div className='flex items-center p-4'>
                            <div>
                                <Avatar src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="40" round={true} />
                            </div>
                            <input onChange={(e) => setdescription(e.target.value)} className='w-full outline-none border-none text-xl ml-2' type="text" placeholder='What is happening?!' />
                        </div>
                        {
                            imageUrl ?
                                <div className=' w-full rounded-lg flex justify-center  '>
                                    <div ref={imageViewRef} className=" bg-cover border">
                                        {imageUrl && <img src={imageUrl} alt="Tweet" className={imageUrl ? `w-96 rounded-lg w-full h-full object-cover` : " hidden"} />}
                                    </div>
                                </div> : ""
                        }

                        <div className='flex items-center justify-between p-4 border-b border-gray-300'>
                            <div>
                                <label
                                    htmlFor="tweetImage"
                                    id="lable-con"
                                    className='cursor-pointer'
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                ><CiImageOn size="24px" /></label>
                                <input type="file"
                                    id='tweetImage'
                                    onChange={(e) => handleFileChange(e, settweetImage)}
                                    className='hidden'
                                    ref={inputFileRef}
                                />
                            </div>
                            <button onClick={submithandler} className='bg-[#1D9BF0] px-4 py-1 text-lg text-white text-right border-none rounded-full '>Post</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CreatePost
