import { apiConnector } from "../apiConnector"
import { toast } from "react-hot-toast"
const BASE_URL = process.env.REACT_APP_BASE_URL


export const registerHeat = async(formdata, token) =>{
    let result = null
  const toastId = toast.loading("Loading...")
  try {
    // console.log(formdata)
    const response = await apiConnector("POST",  BASE_URL + "/opone/registerHeat", formdata, {
      Authorization: `Bearer ${token}`,
    })
    // console.log("CREATE COURSE API RESPONSE............", response)
    // console.log(response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Heat Registration")
    }
    toast.success("Heat registered Successfully")
    result = response?.data?.heat
  } catch (error) {
    console.log("Heat register error............", error)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
  return result
}

export const getExcel  = async(formdata,token)=>{
  const toastId = toast.loading("Loading...")
  try {
    // console.log(formdata)
    const response = await apiConnector("GET",  BASE_URL + "/opone/getDateExcel", { inputDate : formdata.inputDate}, {
      Authorization: `Bearer ${token}`,
    },
    {
      inputDate : formdata.inputDate
    },{
      responseType: 'blob'
    })
    
    toast.success("Excel downloaded")
    toast.dismiss(toastId)
    return response
  } catch (error) {
    console.log("excel error", error)
    toast.error(error.response.data.message)
    toast.dismiss(toastId)
    return error
  }
  
}

export const editHeat = async(formdata, token) =>{
  let result = null
const toastId = toast.loading("Loading...")
try {
  // console.log(formdata)
  const response = await apiConnector("POST",  BASE_URL + "/opone/editHeatDetails", formdata, {
    Authorization: `Bearer ${token}`,
  })
  // console.log("CREATE COURSE API RESPONSE............", response)
  // console.log(response)
  if (!response?.data?.success) {
    throw new Error("Could Not Edit Heat ")
  }
  toast.success("Heat Edited Successfully")
  result = response?.data?.heat
} catch (error) {
  console.log("Heat edit error............", error)
  toast.error(error.response.data.message)
}
toast.dismiss(toastId)
return result
}


