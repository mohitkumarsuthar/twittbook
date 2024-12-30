import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './Login';
import Home from './Home';
import Feed from './Feed';
import Profile from './Profile';
import Bookmark from './Bookmark';
import ProfileUpdate from './ProfileUpdate';
import CreateComment from './CreateComment';
import Notification from './Notification';
// import '../style/createComment.css'

const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Home/>,
            children:[
                {
                    path:"/",
                    element:<Feed/>
                },
                {
                    path:"/comment",
                    element:<><Feed/>
                    <CreateComment /></>
                },
                {
                    path:"/notification/:id",
                    element:<Notification/>
                },
                {
                    path:"/profile/:id",
                    element:<Profile/>
                },
                {
                    path:"/bookmark/:id",
                    element:<Bookmark/>
                },
                {
                    path:"/profile/update/:id",
                    element:<><Profile/>
                    <ProfileUpdate />
                    </>
                }
            ]
        },
        {
            path: "/login",
            element: <Login />
        }
    ])
    return (
        <div className='scollremove w-[100%] '>
            <RouterProvider router={appRouter} />
        </div>
    )
}

export default Body