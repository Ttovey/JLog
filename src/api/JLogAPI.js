import axios from 'axios'
import Cookie from "js-cookie"

const JLogAPI = {}
const BASE_URL = "http://127.0.0.1:8000/jlog_api/"
// const BASE_URL = "http://localhost:8000/jlog_api/"
// const BASE_URL = "/jlog_api/"

const getCsrfConfig = () => {
  console.log(Cookie.get("csrftoken"))
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

// AUTH ROUTES
JLogAPI.login = async (data) => {
  return await tryCatchFetch(() => axios.post(`${BASE_URL}login/`, data, getCsrfConfig()))
}

JLogAPI.signUp = async (data) => {
  return await tryCatchFetch(() => axios.post(`${BASE_URL}sign_up/`, data, getCsrfConfig()))
}

JLogAPI.logout = async () => {
  return await tryCatchFetch(() => axios.post(`${BASE_URL}logout/`, null, getCsrfConfig()))
}

// Jiu Jitsu Routes!
JLogAPI.createJiuJitsu = async (data) => {
  return await tryCatchFetch(() => axios.post(`${BASE_URL}jiujitsu/`, data, getCsrfConfig()))
}

JLogAPI.getJiuJitsu = async () => {
  return await tryCatchFetch(() => axios.get(`${BASE_URL}jiujitsu/`))
}

JLogAPI.updateJiuJitsu = async (id, data) => {
  return await tryCatchFetch(() => axios.put(`${BASE_URL}jiujitsu/${id}`, data, getCsrfConfig()))
}

JLogAPI.deleteJiuJitsu = async (id) => {
  return await tryCatchFetch(() => axios.delete(`${BASE_URL}jiujitsu/${id}`, getCsrfConfig()))
}

// Sub Routes!

JLogAPI.createSubmission  = async (data) => {
  return await tryCatchFetch(() => axios.post(`${BASE_URL}submission/`, data, getCsrfConfig()))
}

// Strength Training Routes!

JLogAPI.createStrengthTraining = async (data) => {
  return await tryCatchFetch(() => axios.post(`${BASE_URL}strengthtraining/`, data, getCsrfConfig()))
}

JLogAPI.getStrengthTraining = async () => {
  return await tryCatchFetch(() => axios.get(`${BASE_URL}strengthtraining/`))
}

JLogAPI.deleteStrengthTraining = async (id) => {
  return await tryCatchFetch(() => axios.delete(`${BASE_URL}strengthtraining/${id}`, getCsrfConfig()))
}

// Set Routes!

JLogAPI.createSet = async (data) => {
  return await tryCatchFetch(() => axios.post(`${BASE_URL}set/`, data, getCsrfConfig()))
}

export default JLogAPI;