import React, { useEffect, useState } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Header from '../components/header/Header'

import { IoIosSend } from "react-icons/io";
import { FaRegFileImage } from "react-icons/fa6";
import MessageContainer from '../components/messagebox/MessageContainer';
import { useAuthContext } from '../main';
import { sendMessage } from '../functions/message';
const Home = () => {
    const { userIdMessage, setUserIdMessage } = useAuthContext()
    const [message, setMessage] = useState('')
    const token = localStorage.getItem('chat-user')
    useEffect(() => {
        return () => setUserIdMessage(null)
    }, [setUserIdMessage])

    const handleSendMessage = async (e) => {
        e.preventDefault()
        try {
            if (!message) return
            await sendMessage(userIdMessage._id, message, token)
            setMessage('')
        } catch (error) {
            console.log("console"+error)
        }
    }

    return (
        <div className="rounded-lg overflow-hidden shadow-xl m-2 h-svh  w-screen sm:max-w-[1000px] sm:h-auto ">
            <Header />
            <div className={` grid ${userIdMessage ? "sm:grid-cols-[1fr]" :"sm:grid-cols-[1fr_2fr]"}  gap-2 overflow-hidden`}>
                {!userIdMessage && <Sidebar className={`${userIdMessage ? "block": "hidden"} `}/>}
                
                {!userIdMessage
                    ? <div className="grid place-content-center text-lg bg-slate-400">
                        <h2>choose other user for send message</h2>
                    </div>
                    :
                    <div className={`bg-slate-500 ${userIdMessage ? "block": "hidden"}hidden sm:block relative`}>
                        

                        <MessageContainer />

                        <form onSubmit={handleSendMessage}  className="absolute w-full bottom-0 sm:bottom-6 h-[10%]">
                            <div className="grid grid-cols-[1fr_10%] p-2 items-center bg-white m-2 rounded-lg">
                                <div className="flex gap-3 items-center">
                                    <FaRegFileImage className='text-3xl flex-none text-blue-800' />
                                    <input type="text" placeholder="Type here" className=" outline-none p-2 focus:border-b-2 focus:border-b-blue-400 w-full"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                </div>
                                <button type='submit' className="flex h-full items-center justify-center">
                                    <IoIosSend className='text-3xl flex-none text-blue-800' />
                                </button>
                            </div>
                        </form>

                    </div>
                }
            </div>
        </div>

    )
}

export default Home