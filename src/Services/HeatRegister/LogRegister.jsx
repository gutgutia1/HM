import { apiConnector } from "../apiConnector"
import { toast } from "react-hot-toast"
const BASE_URL = process.env.REACT_APP_BASE_URL


export const registerLog = async(formdata, token) =>{
  const toastId = toast.loading("Loading...")
  try {
    // console.log(formdata)
    const response = await apiConnector("POST",  BASE_URL + "/opone/registerLog", formdata, {
      Authorization: `Bearer ${token}`,
    })
    // console.log("CREATE COURSE API RESPONSE............", response)
    // console.log(response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add log Registration")
    }
    toast.dismiss(toastId)
    toast.success("Log registered Successfully")
    // console.log(response)
    return response.data.updatedHeat
  } catch (error) {
    console.log("Log register error............", error)
    toast.dismiss(toastId)
    toast.error(error.response.data.message)
    return false
  }
  
}


