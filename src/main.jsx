
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import React, { createContext, useState, useEffect, useContext } from 'react';
import io from 'socket.io-client'

const AuthContext = createContext();
// ใช้ useAuthContext แทน การเรียกใช้  useContext
export const useAuthContext = () => {
  return useContext(AuthContext)
}
// context
export const AuthContextProvider = ({ children }) => {

  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('chat-user') || null))
  // const [authUser, setAuthUser] = useState(localStorage.getItem('chat-user') || null)
  const [userIdMessage, setUserIdMessage] = useState()
  const [currentUser, setCurrentUser] = useState()
  const [userWhochatToCurrenUserNow, setUserWhochatToCurrenUserNow] = useState()
  const [openSearch, setOpenSeach] = useState(false)
  return (
    <AuthContext.Provider
      value={{
        authUser, setAuthUser,
        userIdMessage, setUserIdMessage,
        currentUser, setCurrentUser,
        userWhochatToCurrenUserNow, setUserWhochatToCurrenUserNow,
        openSearch, setOpenSeach
      }}>
      {children}
    </AuthContext.Provider>
  )
}

// socket
const SocketContext = createContext()
export const useSocketContext = () => {
  return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [online, setOnline] = useState([])
  const { authUser, currentUser } = useAuthContext()
  const [snake, setSnake] = useState(false)
const url =  import.meta.env.VITE_API_URL
// const token = JSON.parse(localStorage.getItem("chat-user"))
  useEffect(() => {
    if (authUser) {
        const socket = io('http://localhost:8000', {
          query: {
            userId: authUser.id,
          }
        })

        setSocket(socket)
        //used to listen to the events from server
        socket.on('getOnlineUsers', (users) => {
          // console.log(users)
          setOnline(users)
        })

        return () => socket.close()
      } else {
        if (socket) {
          socket.close()
          setSocket(null)
        }
      }
  
  }, [authUser])

  // console.log('online: '+online)
  return (
    <SocketContext.Provider value={{ socket, online, setOnline, snake, setSnake }}>
      {children}
    </SocketContext.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
