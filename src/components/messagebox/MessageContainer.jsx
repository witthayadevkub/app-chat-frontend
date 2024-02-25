import React, { useEffect, useState, useRef } from 'react'
import Message from './Message'

import { getMessage } from '../../functions/message'
import { useSocketContext } from "../../main";
import { useAuthContext } from '../../main';
import alertsound from "../../assets/sound/sound-alert.mp3";
const MessageContainer = () => {
  const { userIdMessage } = useAuthContext()
  const [message, setmessage] = useState()
  const { socket, setSnake } = useSocketContext()

  const token = localStorage.getItem('chat-user')
  const lastMessageRef = useRef();
  const getdata = async () => {
    const data = await getMessage(userIdMessage?._id, token)
    if (data) {
      setmessage(data)
    }
    // sound()
  }

  const sound = () => {
    const sound = new Audio(alertsound);
    sound.play();
  }

  useEffect(() => {
    getdata()

    socket?.on("newMessage", (newMessage) => {
      // newMessage.shouldShake = true;
      if (newMessage) {
        setSnake(true)
      }

      // const sound = new Audio(alertsound);
      // sound.play();
      sound()
      // console.log(newMessage)
      setmessage([...message, newMessage]);

      // when send new message will scroll
      setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });

    return () => socket?.off("newMessage");
  }, [userIdMessage, socket, setmessage, message])

  // console.log(message)

  return (
    <div className='overflow-auto h-[90svh] sm:h-[550px] pb-[20%] sm:pb-[10%] '>
      {/* <div className='absolute top-5'>to : {userIdMessage}</div> */}
      {message?.map((message) => (
        <div key={message._id} ref={lastMessageRef}>
          <Message message={message} receiverId={userIdMessage?._id} />
        </div>
      ))}
    </div>
  )
}

export default MessageContainer