import React from 'react'

import './App.css';
import HeatRegister from './Screens/Heat/HeatRegister';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import ItemRegister from './Screens/Item/ItemRegister';
import LogRegister from './Screens/Log/LogRegister';
import SignIn from './Screens/Login/Login';
import { Provider } from 'react-redux';
import store from './store';

function App(props) {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>

        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<SignIn />}> */}
            <Route path="/" element={<SignIn props />} />

            <Route path="/HeatRegister" element={<HeatRegister props />} />
            <Route path="/ItemRegister" element={<ItemRegister />} />
            <Route path="/LogRegister" element={<LogRegister />} />

            {/* </Route> */}
          </Routes>

        </BrowserRouter>
      </LocalizationProvider>
    </Provider>
  );
}


export default App;
