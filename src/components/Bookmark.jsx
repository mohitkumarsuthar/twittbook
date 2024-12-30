import React, { useEffect } from 'react'
import Tweet from './Tweet'
import { USER_API_END_POINT } from '../utils/constant'
import { useSelector, useDispatch } from 'react-redux'
import useGetAllBookmark from '../hooks/useGetAllBookmark'
import { getBookmarkTweet,getIsActive } from '../redux/tweetSlice'
import axios from "axios";
import toast from "react-hot-toast"
const Bookmark = () => {
  const dispatch = useDispatch();
  const { user, profile } = useSelector(store => store.user);
  const { refresh, bookmarktweet } = useSelector(store => store.tweet);
  const { allofcomment } = useSelector(store => store.comment);

  useGetAllBookmark(user._id)
  // dispatch(getIsActive(false))
  const getBookmark = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/allbookmark/${user._id}`, {
        withCredentials: true
      });

      dispatch(getBookmarkTweet(res?.data?.bookmarkalltweet));
    } catch (error) {
      console.log(error);
    }
    // return res?.data?.comment
  }
  useEffect(() => {
    getBookmark();
  }, [refresh])


  console.log(bookmarktweet);
  return (
    <div className='w-[40%]'>
      
      { 
        bookmarktweet?.slice().reverse().map((tweet) => tweet == null ? "" : <Tweet key={tweet._id} tweet={tweet} profile1={profile} allofcomment={allofcomment} />
        )
      }
    </div>
  )
}

export default Bookmark