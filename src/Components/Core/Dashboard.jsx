import React from 'react'
import { useSelector } from 'react-redux'
import Op1Dashboard from './Op1Dashboard'

function Dashboard() {
    const {accountType} =useSelector((state)=>state.auth)
    // console.log(accountType)
  return (
    <div>
      {accountType && accountType ==="Operator1" && <Op1Dashboard/> }
    </div>
  )
}

export default Dashboard