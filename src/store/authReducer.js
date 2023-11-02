import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'auth',
  initialState: {
    token:"",
  },

  reducers: {
    tokenUpdate:(state, action)=>{
        console.log('state',state);
        state.token = action.payload
    },
    increment: (state) => {
      return state + 1;
    },
    decrement: (state) => {
      return state - 1;
    },
  },
});

export const { increment, decrement, tokenUpdate } = counterSlice.actions;
export default counterSlice.reducer;
