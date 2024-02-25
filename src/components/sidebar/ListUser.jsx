import React, { useEffect, useState } from 'react'
import { useAuthContext, useSocketContext } from '../../main'

const ListUser = ({ user }) => {

const { userIdMessage,setUserIdMessage, setUserWhochatToCurrenUserNow,} = useAuthContext()
const { online } = useSocketContext()
// const isOnline = online.includes(userIdMessage?._id);
function getUserStatus(userID, array) {
    return array.includes(userID) ? "online" : "offline";
}

// console.log(online) is show all user online
    return (
        <div className="overflow-y-scroll h-[500px]">
            {user?.map(user => (
                <div key={user?._id} className={`flex gap-4 p-3 items-center  ${userIdMessage?._id === user?._id ?"bg-cyan-500":''}`}  
                  onClick={()=>{setUserIdMessage(user),setUserWhochatToCurrenUserNow({id:user?._id,photo:user?.photo,name:user?.username})}}>
                  {/* onClick={()=>{setUserIdMessage(user?._id),setUserWhochatToCurrenUserNow({id:user?._id,photo:user?.photo,name:user?.username})}}> */}
                    <div className={`avatar ${getUserStatus(user._id,online)}`}>
                    {/* <div className={`avatar ${isOnline ? "online": ""}`}> */}
                        <div className="w-12 rounded-full">
                            <img src={user?.photo} alt="user-avatar" />
                        </div>
                    </div>
                    <div className="">
                        <p className='text-gray-500 font-semibold text-xl'>{user?.username}</p>
                    </div>
                </div>
            ))}


        </div>
    )
}

export default ListUser