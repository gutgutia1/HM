
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { resetHeatState } from '../../Slices/op1Slice'



function Op1Dashboard() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(resetHeatState())
  },[])
  return(
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
  <div className="w-full sm:max-w-md bg-white p-8 rounded-lg shadow-md">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 text-center">
      Welcome to Operator 1 Dashboard
    </h1>
    <div className="flex flex-col sm:flex-row justify-center items-center">
      <Link to="/registerHeat" className="bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition duration-300 mb-4 sm:mb-0 sm:mr-4">
        Enter heat values
      </Link>
      <Link to="/editHeat"className="bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 transition duration-300 mb-4 sm:mb-0 sm:mr-4">
        Edit heat
      </Link>
      <Link to="/generateReport"className="bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-600 transition duration-300">
        Generate Report for day
      </Link>
    </div>
  </div>
</div>


  )
  
    
}

export default Op1Dashboard