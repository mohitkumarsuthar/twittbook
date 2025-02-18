// import React, { useState } from 'react'
import { useState } from 'react'
import TB from '../public/TB.png'
import axios from "axios";
import {USER_API_END_POINT} from "../utils/constant.js"
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/userSlice.js';
const Login = () => {

    const [isLogin,setisLogin] = useState(true)
    const [name,setname] = useState("")
    const [username,setusername] = useState("")
    const [email,setemail] = useState("")
    const [password,setpassword] = useState("")
    const navigation = useNavigate();
    const dispatch = useDispatch();

    const loginSignupHandler = () => {
        setisLogin(!isLogin)
        setemail("")
        setname("")
        setusername("")
        setpassword("")
    }

    const submitHandler = async (e) => {
      e.preventDefault();
      console.log(name,username,email,password);
      if (isLogin) {
        //login
        try {
          console.log("1");
          
          const res = await axios.post(`${USER_API_END_POINT}/login`,{email,password},{
            headers:{
              'Content-Type':"application/json"
            },
            withCredentials:true
          })
          console.log("1");
          console.log(res?.data?.user);
          
          dispatch(getUser(res?.data?.user))
          console.log(res.data);
          if(res.data.success){
            toast.success(res.data.message)
            navigation('/')
          }
          
        } catch (error) {
          toast.success(error.response.data.message)
          console.log("login error",error.response.data.message);
          
        }
        
      } else {
        //signup
        console.log("2");
        console.log("2");
        
        
        try {
          const res = await axios.post(`${USER_API_END_POINT}/register`,{name,username,email,password},{
            headers:{
              'Content-Type':"application/json"
            },
            withCredentials:true,
          })
          console.log("2");
          console.log(res);

          if(res.data.success){
            toast.success(res.data.message)
            setisLogin(true)
            
          }
          
        } catch (error) {
          console.log("login error",error.response.data.message);
        }
        
      }


    }



  return (
    <div className='w-screen h-screen flex items-center justify-center'>
    <div className='flex items-center justify-evenly w-[80%]'>
      <div>
        <img className='ml-5' width={"300px"} src={TB} alt="twitter-logo" />
      </div>
      <div>
        <div className='my-5'>
          <h1 className='font-bold text-6xl'>Happening now.</h1>
        </div>
        <h1 className='mt-4 mb-2 text-2xl font-bold'></h1>
        <form onSubmit={submitHandler} className='flex flex-col w-[55%]'>
            {
                !isLogin && (<>
                <input type="text" value={name} onChange={(e) => setname(e.target.value)} placeholder='Name' className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold" />
                <input type="text" value={username} onChange={(e) => setusername(e.target.value)} placeholder='Username' className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold" />
                </>)
            }
              
          
          <input type="email" value={email} onChange={(e) => setemail(e.target.value)} placeholder='Email' className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold" />
          <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder='Password' className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold" />
          <button className='bg-[#1D9BF0] border-none py-2 my-4 rounded-full text-lg text-white'>{isLogin ? "Login" : "Signup"}</button>
          <h1>{isLogin ? "Do not have a Account" : "Alrady Have a Account"} <span onClick = {loginSignupHandler} className='font-bold text-blue-600 cursor-pointer'>{isLogin ?  "Signup" : "Login"} </span></h1>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Login
