import React, { useState } from 'react'
import { getHeatDetails } from '../../../Services/GetDetails/HeatDetails';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { setEdit, setHeat, setitem } from '../../../Slices/op1Slice';
function EditItemsPage() {
    const [isHeat, setIsHeat] = useState(true)
    const [loading, setLoading] = useState(false)
    const [showEdiList, setShowEdit] = useState(false)
    const { heat,edit } = useSelector((state) => state.op1)
    const handleSelectOnchange = (event) => {
        event.target.value == "heat" ? setIsHeat(true) : setIsHeat(false)
    }
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        heatNo: heat ? heat.heatNo : null,
        itemDescription:heat ? heat.itemDescription[0]:null
    });


    const handleChange = (e) => {
        // console.log(e.target.name,e.target.value)
        const { name, value } = e.target;
        if(name=="itemDescription"){
            setFormData({
                ...formData,
                [name]: heat.itemDescription[value],
            });
        }
        else{
            setFormData({
                ...formData,
                [name]: value,
            });
        }
       
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Send the form data to your API or handle it as needed
        // console.log(formData)
        setLoading(true)
        dispatch(setEdit(true))
        dispatch(setitem(formData.itemDescription))
        navigate("/registerItem")
        
        setLoading(false)
        // console.log(result
    };
    // console.log(heat)
    if (heat !== null) {
        return (
            <div className="w-full sm:w-2/3 md:w-1/2 mx-auto">


                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="heatNo" className="block text-gray-700 text-sm font-bold mb-2">Heat No</label>
                        <input
                            type="heatNo"
                            id="heatNo"
                            name="heatNo"
                            value={formData.heatNo}
                            onChange={handleChange}
                            disabled={true}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                    </div>
                    {
                        heat["itemDescription"].length > 0 ? <div>  <label htmlFor="itemDescription" className="block mb-2">Select Item to be edited</label>
                            <select onChange={handleChange} name="itemDescription" id="itemDescription" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500">

                                <option value="" disabled>
                                    Choose a Item
                                </option>
                                {heat["itemDescription"].map((items, idx) => (
                                    <option key={idx} value={idx}>
                                        {items['itemName']}
                                    </option>
                                ))}

                            </select>

                            <div className="flex items-center mt-2">
                                <button type="submit" className="bg-blue-500 text-white font-bold px-4 py-2 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600">Submit</button>
                            </div>
                        </div> : <div>
                            <label htmlFor="dropdown" className="block mb-10">No items for this heat Please first enter items</label>
                            <Link to="/registerItem" className="bg-blue-500 text-white p-4 rounded-md hover:bg-blue-600 transition duration-300 w-full">
                                Add item/s for this heat
                            </Link>
                        </div>
                    }

                </form>







            </div>
        )
    }
    else {
        return <Navigate to="/dashboard" />
    }

}

export default EditItemsPage