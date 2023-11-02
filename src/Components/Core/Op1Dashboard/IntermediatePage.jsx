import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'

function IntermediatePage() {
    const { heat } = useSelector((state) => state.op1)
    if (heat !== null) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold mb-6">Please select your option</h1>
                <div className="space-y-4 space-x-4">
                    <Link to="/registerItem" className="bg-blue-500 text-white p-4 rounded-md hover:bg-blue-600 transition duration-300 w-full">
                        Add item/s for this heat
                    </Link>
                    <Link to="/editItem" className="bg-green-500 text-white p-4 rounded-md hover:bg-green-600 transition duration-300 w-full">
                        Edit Items for this heat
                    </Link>
                    <Link to="/registerLog"className="bg-red-500 text-white p-4 rounded-md hover:bg-red-600 transition duration-300 w-full">
                        Add log details for this heat
                    </Link>
                </div>
            </div>
        )
    }
    else {
        <Navigate to="/dashboard" />
    }

}

export default IntermediatePage