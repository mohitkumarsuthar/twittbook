import React from 'react'

const Comment = ({ comment }) => {
    
    return(
        <div>

        {

        <div className=' flex justify-center'>
            <div className='w-[94%] bg-slate-200 p-5 rounded-xl mt-4 mb-4'>
                <div className='mb-2'>
                    <p>@{comment?.userName}</p>
                </div>
                <div className=''>{comment?.description}</div>
            </div>
        </div>
}
        </div>
                   
);
    
}
    
  

export default Comment
