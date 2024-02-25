import axios from "axios";
import { useAuthContext } from "../main";

// const { setAuthUser } = useAuthContext()
const apiUrl = import.meta.env.VITE_API_URL;
// const token = localStorage.getItem("chat-user")
const token = JSON.parse(localStorage.getItem("chat-user"))
export const signup = async (form) => {
  try {
    if (!form) {
      return console.log("no form in signup");
    }
    const res = await axios.post(`${apiUrl}/api/signup`, JSON.stringify(form), {
      headers: {
         "Content-Type": "application/json" ,
         withCredentials: true,
        },
      
    });
    //localStorage
    // localStorage.setItem("chat-user", JSON.stringify(res.data));
    // setAuthUser(res.data);
  } catch (err) {
    console.log("at signup" + err.message);
  }
};

export const login = async (form) => {
  try {
    if (!form) {
      return console.log("no form in login");
    }
    const res = await axios.post(`${apiUrl}/api/login`, JSON.stringify(form), {
      headers: {
         "Content-Type": "application/json", 
          withCredentials: true,
        },
     
    });
    // console.log(res.cookies.jwt)
    localStorage.setItem("chat-user", JSON.stringify({token:res.data.token,id:res.data.id}));
    return res.data;
    // setAuthUser(res.data);
  } catch (err) {
    console.error("at login" + err);
  }
};

export const logout = async () => {
  try {
    await axios.post(`${apiUrl}/api/logout`);
    localStorage.removeItem("chat-user");
    // setAuthUser(null);
  } catch (err) {
    console.error("at logut" + err);
  }
};

export const getOtherUsers = async () => {
  try {
    // console.log(token)
    const user = await axios.post(`${apiUrl}/api/users`,{},{
      headers: { 
        // "Content-Type": "application/json" ,
        authorization:token.token,
        // withCredentials: true,
      }});
    return user.data;
  } catch (err) {
    console.log("at getOtherUsers", err);
  }
};

export const UserCurrent = async () =>{
  try {
    if(!token){
      return console.log("no token")
    }
    const user = await axios.post(`${apiUrl}/api/users/current`,{},{
      headers: { 
        // "Content-Type": "application/json" ,
        authorization:token.token,
        // withCredentials: true,
      }});
    return user.data;
  } catch (error) {
    console.log("at getOtherUsers", error);
  }
}