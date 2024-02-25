import React, { useState, useEffect } from 'react'
import { RiUserSearchLine } from "react-icons/ri";
import ListUser from './ListUser';
import { getOtherUsers } from '../../functions/auth';
import { useAuthContext } from '../../main';
const Sidebar = () => {
    const { authUser, setAuthUser, openSearch, setOpenSeach } = useAuthContext()
    const [otherUsers, setOhterUsers] = useState()
    const token = localStorage.getItem('chat-user')
    const [search, setSearch] = useState()

    const getUsers = async () => {
        const data = await getOtherUsers()
        setOhterUsers(data)
    }


    const userSearch = otherUsers?.filter(user => user?.username == search)

    useEffect(() => {
        getUsers()
    }, [search])

    // console.log(userSearch)
    return (

        <div className="p-2">
            {openSearch && <form className='flex items-center gap-2  justify-center'>
                <input type='text' onChange={(e) => setSearch(e.target.value)} value={search} placeholder='Search...' className="shadow rounded-md outline-none p-2" />
                <RiUserSearchLine className='size-10 text-slate-500' />
            </form>}

            <div className="divider px-3 min-w-[250px]"></div>
            {userSearch?.length > 0 ? <ListUser user={userSearch} /> : <ListUser user={otherUsers} />}

        </div>
    )
}

export default Sidebar