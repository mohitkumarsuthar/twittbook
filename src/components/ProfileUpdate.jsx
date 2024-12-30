import React, { useEffect, useState } from 'react'
import { USER_API_END_POINT } from '../utils/constant';
import { ImCancelCircle } from "react-icons/im";
import axios from "axios";
import toast from "react-hot-toast"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getRefreshUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [cover, setCover] = useState(null)
  const [profileimg, setProfileimg] = useState(null)
  console.log(cover);


  const {user} = useSelector(store=>store.user);
  const dispatch = useDispatch();

 
  const handleFileChange = (event, setFile) => {
    setFile(event.target.files[0]);
  };
  
  const updateProfileHandler = async (e) => {
    e.preventDefault();
    
    if (!cover || !profileimg) return alert("Please select a file first!");

    const formData = new FormData();
    formData.append("avatarLocalPath", profileimg);
    formData.append("backSidePhoto", cover);
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("id", user._id);
    console.log(formData);
    



    try {
      const res = await axios.post(`${USER_API_END_POINT}/updateProfile`
        , formData, {
        withCredentials: true,
        headers: {
          // 'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data'
        },

      });
      console.log(res);

      if (res) {
        dispatch(getRefreshUser())
        toast.success(res.data.message)
      }

    } catch (error) {
      toast.error(error.response.data.message)

    }

    navigate(`/profile/${user._id}`)

  }


  // useEffect(() => {
  //   updateProfileHandler();

  // }, [updateProfileHandler])

  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }} className=' text-black absolute justify-center fixed bg-opacity-70 flex bg-slate-800 z-10'>
        <form style={{ width: "30vw", height: "80vh" }} action="" className=' bg-white flex justify-center rounded-md mt-14 p-10opacity-100'>
          <div className=' w-96 h-100 mt-5 '>
            <div className='flex justify-between'>

              <h1>Profile Update</h1>
              <Link to={`/profile/${user._id}`}>
                <ImCancelCircle size="25px"
                  // onClick={dispatch(getProfileActive(false))} 
                  className='cursor-pointer' />
              </Link>
            </div>

            <div className="max-w-sm mx-auto">
              <label
                htmlFor="website-admin"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                </span>
                <input
                  type="text"
                  id="website-admin"
                  className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Name"
                />
              </div>
            </div>


            <div className="max-w-lg mx-auto">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="user_avatar"
              >
                Upload file
              </label>
              <input
                className="block w-full text-sm p-1 text-gray-200 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400"
                aria-describedby="user_avatar_help"
                id="user_avatar"
                onChange={(e) => handleFileChange(e, setProfileimg)}
                type="file"
              />
              <div
                className="mt-1 text-sm text-gray-500 dark:text-gray-600"
                id="user_avatar_help"
              >
                upload profile image
              </div>
            </div>
            <div className="max-w-lg mx-auto">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="user_avatar"
              >
                Upload file
              </label>
              <input
                className="block w-full text-sm p-1 text-gray-200 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-400"
                aria-describedby="user_avatar_help"
                id="user_avatar"
                onChange={(e) => handleFileChange(e, setCover)}
                type="file"
              />
              <div
                className="mt-1 text-sm text-gray-500 dark:text-gray-600"
                id="user_avatar_help"
              >
                upload cover image
              </div>
            </div>
            <div>
              <div className="w-full mb-4 border mt-4 border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-200 dark:border-gray-600">

                <div className="px-4 py-2 rounded-md bg-white rounded-b-lg dark:bg-gray-200">
                  <label htmlFor="editor" className="sr-only">
                    Publish post
                  </label>
                  <textarea
                    id="editor"
                    rows={4}
                    className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-200 focus:ring-0 ps-2 p-2 dark:placeholder-gray-400"
                    placeholder="Write an article..."
                    required=""
                    onChange={(e) => setBio(e.target.value)}
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
            <button
              onClick={updateProfileHandler}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              update
            </button>
          </div>
        </form>
      </div>


    </>
  )
}

export default ProfileUpdate
