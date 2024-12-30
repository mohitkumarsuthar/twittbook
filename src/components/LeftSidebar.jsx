import { CiHome } from "react-icons/ci";
import { CiHashtag } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from "axios";
import TB from '../public/TB.png'
import { USER_API_END_POINT } from "../utils/constant";
import { useNavigate } from "react-router-dom";
const LeftSidebar = () => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.user);

    const logouthandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, {
                withCredentials: true
            });
            if (res) {
                navigate('/login')

            }
        } catch (error) {
            console.log(error);

        }

    }

    return (
        <div className="w-[17%] h-[100%] ms-10 fixed left-28 ">
            <div className='w-[100%]  top-0'>
                <div>
                    <div>
                        <img className='ml-5 mt-4' width={"27px"} src={TB} alt="twitter-logo" />
                    </div>
                    <div className='my-4'>
                        <Link to="/" className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                            <div>
                                <CiHome size="24px" />
                            </div>
                            <h1 className='font-bold text-lg ml-2 '>Home</h1>
                        </Link>
                        <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                            <div>
                                <CiHashtag size="24px" />
                            </div>
                            <h1 className='font-bold text-lg ml-2 '>Explore</h1>
                        </div>
                        <Link to={`/notification/${user?._id}`} className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                            <div>
                                <IoIosNotificationsOutline size="24px" />
                            </div>
                            <h1 className='font-bold text-lg ml-2'>Notifications</h1>
                        </Link>
                        <Link to={`/profile/${user?._id}`} className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                            <div>
                                <CiUser size="24px" />
                            </div>
                            <h1 className='font-bold text-lg ml-2'>Profile</h1>
                        </Link>
                        <Link to={`/bookmark/${user?._id}`}>
                            <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                                <div>
                                    <CiBookmark size="24px" />
                                </div>
                                <h1 className='font-bold text-lg ml-2'>Bookmarks</h1>
                            </div>
                        </Link>
                        <div onClick={logouthandler} className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                            <div>
                                <AiOutlineLogout size="24px" />
                            </div>
                            <h1  className='font-bold text-lg ml-2'>Logout</h1>
                        </div>
                        <Link to='/'>
                            <button className='px-4 py-2 border-none text-md bg-[#1D9BF0] w-full rounded-full text-white font-bold'>Post</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftSidebar
