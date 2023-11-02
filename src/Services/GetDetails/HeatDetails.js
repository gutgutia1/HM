import { apiConnector } from "../apiConnector"
import { toast } from "react-hot-toast"
const BASE_URL = process.env.REACT_APP_BASE_URL

export const getHeatDetails = async(formdata, token) =>{
    let result = null
    const toastId = toast.loading("Loading...")

  try {

    const response = await apiConnector("POST",  BASE_URL + "/opone/getHeatDetails", formdata, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) {
      throw new Error("Could Not find Heat ")
    }
    toast.success("Heat fetched successfully")
    result = response?.data?.heat
  } catch (error) {
    console.log("Heat find error............", error)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
  return result
}