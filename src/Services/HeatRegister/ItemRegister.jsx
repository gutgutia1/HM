import { apiConnector } from "../apiConnector"
import { toast } from "react-hot-toast"
const BASE_URL = process.env.REACT_APP_BASE_URL


export const registerItem = async(formdata, token) =>{
  const toastId = toast.loading("Loading...")
  try {
    // console.log(formdata)
    const response = await apiConnector("POST",  BASE_URL + "/opone/registerItem", formdata, {
      Authorization: `Bearer ${token}`,
    })
    // console.log("CREATE COURSE API RESPONSE............", response)
    // console.log(response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add log Registration")
    }
    toast.dismiss(toastId)
    toast.success("Item registered Successfully")
    // console.log(response)
    return response.data.updatedHeat
  } catch (error) {
    console.log("Item register error............", error)
    toast.dismiss(toastId)
    toast.error(error.response.data.message)
    return false
  }
  
}


export const editItem = async(formdata, token) =>{
  let result = null
const toastId = toast.loading("Loading...")
try {
  // console.log(formdata)
  const response = await apiConnector("POST",  BASE_URL + "/opone/editItemDetails", formdata, {
    Authorization: `Bearer ${token}`,
  })
  // console.log("CREATE COURSE API RESPONSE............", response)
  // console.log(response)
  if (!response?.data?.success) {
    throw new Error("Could Not Edit Item ")
  }
  toast.success("Item Edited Successfully")
  result = response?.data?.updatedHeat
} catch (error) {
  console.log("Item edit error............", error)
  toast.error(error.response.data.message)
}
toast.dismiss(toastId)
return result
}