import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chat = () => {

  const [chat, setChat]  = useState()
  useEffect(() => {
    // Connect to the Socket.IO server
    const socket = io('http://localhost:5000')
    socket.on('chat',(data)=>{
       setChat(data) 
    })
    
  }, []);
  

  return (
    <div>
      {chat}
    </div>
  );
};

export default Chat;
