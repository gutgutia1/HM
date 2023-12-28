import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  heat: null,
  edit:false,
  item:null
}

const op1Slice = createSlice({
  name: "op1",
  initialState: initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },
    setHeat: (state, action) => {
      state.heat = action.payload
    },
    setitem: (state, action) => {
      state.item = action.payload
    },
    setEdit:(state,action)=>{
      state.edit = action.payload
    },
    resetHeatState: (state) => {
      state.heat = null
      state.step = 1
      state.edit=false
      state.item= null
    },
  }
});

export const { setStep, setHeat, resetHeatState,setEdit,setitem } = op1Slice.actions;

export default op1Slice.reducer;
