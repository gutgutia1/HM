import { apiConnector } from "../apiConnector"
import { toast } from "react-hot-toast"
import { setLoading, setToken, setAccounType } from "../../Slices/authSlice"
import {setUser} from "../../Slices/profileSlice" 
import { resetHeatState } from "../../Slices/op1Slice"
const BASE_URL = process.env.REACT_APP_BASE_URL


export function login(employeeId, password, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", BASE_URL + "/auth/login", {
          employeeId,
          password,
        })
  
        // console.log("LOGIN API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Login Successful")
        dispatch(setToken(response.data.token))
        dispatch(setUser({ ...response.data.user }))
        dispatch(setAccounType(response.data.user?.accountType))
        localStorage.setItem("token", JSON.stringify(response.data.token))
        localStorage.setItem("accountType", JSON.stringify(response.data.user?.accountType))
        // localStorage.setItem("user",{ ...response.data.user})
        navigate("/dashboard/my-profile")
      } catch (error) {
        console.log("LOGIN API ERROR............", error)
        if(error?.response?.data?.message){
          toast.error(error?.response?.data?.message)
        }
        else{
          toast.error("Issue from server")
        }
        
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }


export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      dispatch(resetHeatState())
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/login")
    }
  }