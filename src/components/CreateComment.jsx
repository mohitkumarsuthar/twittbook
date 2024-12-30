import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useGetAllComment from '../hooks/useGetAllComments'
import { COMMENT_API_END_POINT } from '../utils/constant'
import { getRefresh } from '../redux/tweetSlice'
import { getAllComments, getCommentRefresh, getcommentsCheck, getAllOfComments } from '../redux/commentSlice'
import { Link } from 'react-router-dom'
import { ImCancelCircle } from "react-icons/im";
import { useNavigate } from 'react-router-dom'
import Comment from './Comment';
import toast from "react-hot-toast"
import '../style/createComment.css'
import axios, { all } from "axios";
const CreateComment = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [description, setdescription] = useState("")
  const { user } = useSelector(store => store.user);
  const { isActiveTweet } = useSelector(store => store.tweet)
  const { allcomment, alltweet, check } = useSelector(store => store.comment)
  // console.log(allcomment);
  // console.log(profile);

  console.log("check 1");
  console.log(user);

  const userid = user._id;
  console.log("check 2");
  const postid = isActiveTweet

  useGetAllComment(isActiveTweet)
  //get comment
  const getComment = async () => {
    try {
      const res = await axios.get(`${COMMENT_API_END_POINT}/allofcomment`, {
        withCredentials: true
      });

      dispatch(getAllOfComments(res?.data?.comment));

    } catch (error) {
      console.log(error);
    }
    // return res?.data?.comment
  }
  const commenthandler = async (e) => {
    e.preventDefault();
    console.log(user);


    try {
      const res = await axios.post(`${COMMENT_API_END_POINT}/createcomment`
        , { description, userid, postid }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        },

      });
      console.log(res);

      if (res) {
        toast.success(res.data.message)
        dispatch(getCommentRefresh())
        getComment()
      }

    } catch (error) {
      toast.error(error.response.data.message)

    }
    setdescription("")
    allcomments()
  }

  const allcomments = async () => {
    // e.preventDefault();

    try {
      const res = await axios.get(`${COMMENT_API_END_POINT}/allcomment/${isActiveTweet}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        },

      });
      console.log(res.data.comment);

      if (res) {
        dispatch(getAllComments(res.data.comment))
        console.log("ho gaya bhi ab itne tentan mat le");
      }

    } catch (error) {
      toast.error(error.response.data.message)

    }

  }

  useEffect(() => {
    allcomments()
  }, [isActiveTweet])


  const handler = () => {
    if (check) {

      navigate("/")
      dispatch(getcommentsCheck(false))
    } else {
      navigate("/comment")
      dispatch(getcommentsCheck(true))

    }

  }


  return (
    <>
      <form style={{ width: "100vw", height: "100vh" }} className=' h-100 w-100 fixed top-0 z-10 flex
       justify-center bg-slate-800 rounded-lg bg-opacity-60 '>
        <div className="w-[32%] opacity-95 mb-4 m-5 p-4 
        scollremove bg-black overflow-hidden  position-absolute
         border-gray-200 rounded-lg bg-gray-300 dark:border-gray-600 ">
          <div onClick={handler} className='flex justify-end m-2 cursor-pointer'>
            <ImCancelCircle size="25px" />
          </div>
          <div className="px-4 py-2 bg-white rounded-lg bg-light">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              onChange={(e) => setdescription(e.target.value)}
              rows={2}
              className="w-full px-0 text-sm p-4 text-gray-900   outline-none rounded-lg"
              placeholder="Write a comment..."
              required=""
            />
          </div>

          <div className=" flex items-center justify-between px-0 py-2 border-t bg-light">
            <button
              onClick={commenthandler}
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium rounded-lg bg-blue-700 text-center text-whiterounded-lg"
            >
              Post comment
            </button>

          </div>
          <div className='m-1 ms-2'>Comments</div>

          <div className=' h-[64%] bg-gray-100 overflow-scroll rounded-lg scollremove '>
            {allcomment?.length > 0
              ? allcomment.slice().reverse().map((comment) => <Comment key={comment._id} comment={comment} allcomment={allcomment} />)
              : <p className="text-center p-4">No comments yet</p>
            }
          </div>
        </div>
      </form>
    </>

  )
}

export default CreateComment
