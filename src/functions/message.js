import axios from "axios";
// import { useAuthContext } from "../main";

// const { setAuthUser } = useAuthContext()
const apiUrl = import.meta.env.VITE_API_URL;
// const token = localStorage.getItem("chat-user")
const token = JSON.parse(localStorage.getItem("chat-user"));
export const getMessage = async (id) => {
  try {
    const message = await axios.post(
      `${apiUrl}/api/message/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          authorization: token.token,
          // withCredentials: true,
        },
      }
    );
    // console.log(message.data)
    return message.data;
  } catch (err) {
    console.log("at getMessage" + err.message);
  }
};

export const sendMessage = async (id, message) => {
  // console.log(token.token)
  // console.log(message)
  // console.log(id)
  try {
    const response = await axios.post(
      `${apiUrl}/api/message/send/${id}`,
      { message },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: token.token,
        },
      }
    );
    // console.log(send.data)
    console.log("Message sent successfully:", response.data);
  } catch (err) {
    console.log("at sendMessage " + err.message);
  }
};

export const removeMessage = async (id) => {
  try {
    // console.log(id)
    // console.log(token.token)
    await axios.delete(
      `${apiUrl}/api/message/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: token.token,
        },
      }
    );

  } catch (err) {
    console.log("at getMessage" + err.message);
  }
};
