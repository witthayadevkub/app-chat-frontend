import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';

import { signup } from '../functions/auth';
const SignUp = () => {


    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        username: '',
        gender: ''
    })


    const handleForm = (e) => {
        const { name, value, files } = e.target
        if (name === "photo") {
            setForm(inputs => ({ ...inputs, [name]: files[0] }))
        } else {
            setForm(inputs => ({ ...inputs, [name]: value }))
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (form.email != "" && form.password != "" && form.password == form.confirmPassword && form.gender == "male" || form.gender == "female") {
                signup(form)
                navigate('/login')
                console.log(form)
                //   window.location.reload();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleGender = (gender) => {
        setForm({ ...form, gender: gender })
    }

    return (
        <form onSubmit={handleSubmit} className='relative mt-3 max-w-[400px] shadow bg-white p-4 flex flex-col gap-2 m-[0_auto] rounded-lg '>
            <div className="">
                <h2 className='text-xl font-bold text-center'>SignUp</h2>
            </div>

            <label className="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                <input type="text" className="grow" placeholder="Email" name="email" onChange={handleForm} value={form.email} />
            </label>
            <label className="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                <input type="text" className="grow" placeholder="Username" name='username' onChange={handleForm} value={form.username} />
            </label>

            <label className="input input-bordered flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                <input type="password" className="grow" placeholder="Password" name='password' maxLength={6} onChange={handleForm} value={form.password} />
                <p className="text-gray-500 font-semibold">{form.password.length}/6</p>
            </label>

            {form.password && form.password.length == 6 &&
                <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input type="password" className="grow" placeholder="Confirm Password" maxLength={6} name='confirmPassword' onChange={handleForm} value={form.confirmPassword} />
                    {form.confirmPassword.length > 0 && <p className="">{form.confirmPassword.length}/6</p>}
                </label>}

            <div className="flex gap-3">
                <div className="form-control">
                    <label className={`cursor-pointer label gap-1 ${form.gender === "male" ? 'selected' : ""}`} >
                        <span className="label-text">Male</span>
                        <input type="checkbox" checked={form.gender === "male"} onChange={() => handleGender('male')} name='gender' className="checkbox checkbox-accent checkbox-sm" />
                    </label>
                </div>
                <div className="form-control">
                    <label className={`cursor-pointer label gap-1 ${form.gender === "female" ? 'selected' : ""}`}>
                        <span className="label-text">Female</span>
                        <input type="checkbox" checked={form.gender === 'female'} onChange={() => handleGender("female")} name='gender' className="checkbox checkbox-accent checkbox-sm" />
                    </label>
                </div>
            </div>

            <Link to='/login' className="underline hover:btn-link text-sm">Go Login</Link>
            <button type='submit' className="btn btn-outline btn-accent">Register</button>
        </form>
    )
}
export default SignUp
