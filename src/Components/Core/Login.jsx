import React, { useState } from 'react';
import { login } from "../../Services/Auth/Login"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
 

function Login() {
    const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    employeeId: '',
    password: '',
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('Form submitted:', formData);
    dispatch(login(formData.employeeId, formData.password, navigate))
    // You can add your login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="employeeId" className="block text-gray-700 text-sm font-bold mb-2">Employee Id</label>
            <input
              type="employeeId"
              id="employeeId"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="flex items-center">
            <button type="submit" className="bg-blue-500 text-white font-bold px-4 py-2 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
