// import React from 'react'
import CreatePost from './CreatePost'
import Tweet from './Tweet'
import { useSelector, useDispatch } from 'react-redux' 
import GetAllOfComment from '../hooks/GetAllOfComment';
import {getIsActive} from '../redux/tweetSlice'
import '../style/feed.css'

function Feed() {
  const dispatch = useDispatch();
  const {alltweet} = useSelector(store=>store.tweet);
  const {check,allofcomment} = useSelector(store=>store.comment);
  const {profile} = useSelector(store=>store.user);
  console.log(alltweet);
  // dispatch(getIsActive(false))
  GetAllOfComment()
  return (
    <div className={`scrollr w-[42%] me-6 relative h-auto ${check ? "fixed" : ""}`}>
      <CreatePost />
      {
        alltweet?.tweets?.slice().reverse().map((tweet) => <Tweet key={tweet._id} tweet={tweet} profile1={profile} allofcomment={allofcomment}/>
      ) 
    }
    </div>
  )
}

export default Feed
