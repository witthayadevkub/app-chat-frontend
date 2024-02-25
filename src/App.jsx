import { useState, useContext, useEffect } from 'react'
import './App.css'
import Chat from './components/Chat'
import Login from './pages/Login'
import Signup from './pages/SignUp'
import Home from './pages/Home'
import { Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './main'

function App() {
const { authUser, setAuthUser } = useAuthContext()
const token = localStorage.getItem('chat-user')
// useEffect(() =>{
//     window.location.reload()
// },[token])
// console.log(authUser)
  return (
    <>
      <div className ='bg-slate-300 w-full h-svh flex justify-center items-center'>
        <Routes>
            <Route path="/" element={authUser ? <Home/> : <Navigate to="/login"/>}/>
            <Route path="/signup" element={authUser ? <Navigate to="/"/>:<Signup/>}/>
            <Route path="/login" element={authUser ? <Navigate to="/"/>:<Login/>}/>

             {/* <Route path="/" element={ <Home/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/> */}
        </Routes>
      </div>

    </>
  )
}

export default App
