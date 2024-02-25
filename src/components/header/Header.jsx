import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { logout } from '../../functions/auth'
import { useAuthContext } from '../../main'
import { UserCurrent } from '../../functions/auth'
import { FiLogOut } from "react-icons/fi";
// import alertsound from "../../assets/sound/sound-alert.mp3"

const Header = () => {
    const { authUser, setAuthUser, userIdMessage, currentUser, setCurrentUser, setUserIdMessage, openSearch, setOpenSeach } = useAuthContext()


    // const sound = () => {
    //     const sound = new Audio(alertsound);
    //     sound.play();
    // }
    const Logout = () => {
        logout()
        setAuthUser(null)
        // window.location.reload();
    }

    const user = async () => {
        const data = await UserCurrent()
        setCurrentUser(data)
    }

    useEffect(() => {
        user()

    }, [])
    // console.log(userCurrent)

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                {userIdMessage && <div onClick={() => {setUserIdMessage(null)}}
                    className="hover:bg-slate-100 p-2 rounded-full ">
                    <FiLogOut className='text-2xl rotate-180 font-bold text-blue-700 ' />
                </div>}

                {!userIdMessage && <div className=" ">
                    <div className="flex">
                        <h1 className='font-bold text-xl px-5'>APPCHAT</h1>
                        <p className="hidden sm:block ">Hello: {currentUser?.name}</p>
                    </div>
                </div>}


            </div>

            <div className="navbar-end">
                <button className="btn btn-ghost btn-circle" onClick={() => setOpenSeach(!openSearch)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
                <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        <span className="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                </button>

                <div className="dropdown dropdown-end">

                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src={currentUser?.photo} />
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li className="font-bold" onClick={Logout}><a>Logout</a></li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Header