import { apiConnector } from "../apiConnector"
import { toast } from "react-hot-toast"
const BASE_URL = process.env.REACT_APP_BASE_URL

export const getItemList = async(token) =>{
    let result = null
    // const toastId = toast.loading("Loading...")

  try {
    // console.log("hire")
    const response = await apiConnector("GET",  BASE_URL + "/admin/getItemList", null,{
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) {
      throw new Error("Could Not find Item ")
    }
    // toast.success("Item fetched successfully")
    result = response?.data?.itemList
  } catch (error) {
    console.log("Item find error............", error)
    toast.error(error.response.data.message)
  }
  // toast.dismiss(toastId)
  return result
}