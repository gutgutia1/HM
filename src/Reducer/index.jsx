import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "../Slices/authSlice"
import profileReducer from "../Slices/profileSlice"
import op1Reducer from "../Slices/op1Slice"

const rootReducer = combineReducers({
  auth: authReducer, 
  profile: profileReducer,
  op1:op1Reducer   
})

export default rootReducer
