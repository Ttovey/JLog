import axios from 'axios'

const JLogAPI = {}
const BASE_URL = ""

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

export default JLogAPI;