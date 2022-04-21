import axios from 'axios'
import Cookie from "js-cookie"

const JLogAPI = {}
// const BASE_URL = "http://127.0.0.1:8000/jlog_api/"
// const BASE_URL = "http://localhost:8000/jlog_api/"
const BASE_URL = "/jlog_api/"

const getCsrfConfig = () => {
  return { 
    withCredentials: true, // this needs to be done for the separate project setup
    headers: {
      'X-CSRFToken': Cookie.get("csrftoken")
    }
  }
}

const tryCatchFetch = async (axiosCall) => {
  try {
    const response = await axiosCall()
    console.log("RESPONSE:", response)
    console.log("RESPONSE DATA:", response.data)
    return response.data ? response.data : { message: "success" } // this doesn't look like we're returning a promise, but automatically gets converted to a promise due to "async" function behavior
  }
  catch (e) {
    console.log(e.response)
    console.error("error", e.response ? e.response.data : e)
    return null
  }
}

JLogAPI.login = async (data) => {
  return await tryCatchFetch(() => axios.post(`${BASE_URL}login/`, data, getCsrfConfig()))
}

JLogAPI.signUp = async (data) => {
  return await tryCatchFetch(() => axios.post(`${BASE_URL}sign_up/`, data, getCsrfConfig()))
}

JLogAPI.logout = async () => {
  return await tryCatchFetch(() => axios.post(`${BASE_URL}logout/`, getCsrfConfig()))
}

export default JLogAPI;