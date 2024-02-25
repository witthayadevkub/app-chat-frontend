import React, { useState } from 'react'
import moment from "moment"
import { useAuthContext, useSocketContext } from '../../main'
import { removeMessage } from '../../functions/message'

import { IoIosRemoveCircle } from "react-icons/io";

const Message = ({ message, receiverId }) => {
    const { socket, snake } = useSocketContext()
    const { currentUser, userWhochatToCurrenUserNow } = useAuthContext()
    // console.log(message)
    const [open, setOpen] = useState({})
    const shakeClass = snake

   
    // const shakeClass = message.shouldShake ;
    return (
        <div>

            <div className={`chat p-2 ${receiverId === message?.receiverId ? "chat-end" : "chat-start"}`}>

                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS chat bubble component" src={receiverId === message?.receiverId ? currentUser?.photo : userWhochatToCurrenUserNow?.photo} />
                    </div>
                </div>

                <div className="chat-header">
                    <p>{receiverId === message?.receiverId ? currentUser?.name : userWhochatToCurrenUserNow.name}</p>
                </div>

                <div onClick={()=>setOpen(!open)} className={`relative chat-bubble ${receiverId === message?.receiverId ? "bg-blue-500" : ""}  ${shakeClass ? "shake" : ""}`}>{message?.message}
                    <div className='absolute left-[-15%] bottom-0'>

                        {!open && <div>
                            {receiverId === message?.receiverId && <div>
                                <IoIosRemoveCircle onClick={() => removeMessage(message._id)} className='text-2xl text-red-500' />
                            </div>}
                        </div>}

                    </div>
                </div>

                <div className="chat-footer opacity-70">
                    <time className="text-xs ">{moment(message?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</time>
                </div>

            </div>
        </div>
    )
}

export default Message