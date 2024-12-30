import React from 'react'

const Noti = ({ noti }) => {

    const createdAt = noti?.createdAt;
    console.log(createdAt);
    const date = createdAt.slice(0,10)
    console.log(date);
    const time = createdAt.slice(11,16)
    console.log(time);
    console.log(noti);
    
    

    return (
        <div>
            <div key={noti?._id} className='bg-gray-100 border p-2 rounded-xl m-3  border-gray-200 w-[100%]'>

                <div className='m-2'>
                    {noti?.note}
                </div>
                <div className='w-100 flex justify-between m-2'>
                <p className='text-xs'>{date}</p>
                <p className='text-xs'>{noti?.time}</p>
                </div>
            </div>
        </div>
    )
}

export default Noti
