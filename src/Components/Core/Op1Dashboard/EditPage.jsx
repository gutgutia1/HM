import React, { useEffect, useState } from 'react'
import { getHeatDetails } from '../../../Services/GetDetails/HeatDetails';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEdit, setHeat, setitem } from '../../../Slices/op1Slice';

function EditPage() {
    const [isHeat, setIsHeat] = useState(true)
    const [loading, setLoading] = useState(false)
    const [showEdiList, setShowEdit] = useState(false)
    const handleSelectOnchange = (event) => {
        event.target.value == "heat" ? setIsHeat(true) : setIsHeat(false)
    }
    const { token } = useSelector((state) => state.auth)
    const{heat,edit,item} = useSelector((state)=>state.op1)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        heatNo: '',
        itemDescription:showEdiList?showEdiList['itemDescription'][0] : null
    });

    useEffect(()=>{
        formData.itemDescription=showEdiList?showEdiList['itemDescription'][0] : null
    },[ ])


    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name=="itemDescription"){
            setFormData({
                ...formData,
                [name]: showEdiList.itemDescription[value],
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
        setLoading(true)
        const result = await getHeatDetails(formData, token)
        setLoading(false)
        // console.log(result)
        if (result && isHeat) {
            dispatch(setEdit(true))
            dispatch(setHeat(result))
            navigate("/registerHeat")
        }
        else if (showEdiList) {
            dispatch(setEdit(true))
            dispatch(setHeat(result))
            // console.log(formData)
            dispatch(setitem(formData.itemDescription))
            if(formData.itemDescription)
                navigate("/registerItem")
        }
        else if (result) {
            setShowEdit(result)
        }
    };

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
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <label htmlFor="dropdown" className="block mb-2">Edit Heat or Item</label>
                <select onChange={handleSelectOnchange} id="dropdown" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500">
                    <option value="heat">Heat</option>
                    <option value="item">Item</option>
                </select>
                {
                    !loading && !showEdiList && <div className="flex items-center mt-2">
                        <button type="submit" className="bg-blue-500 text-white font-bold px-4 py-2 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600">Submit</button>
                    </div>
                }
            </form>

            {
                showEdiList && <form onSubmit={handleSubmit}>
                    <label htmlFor="dropdown" className="block mb-2">Select Items to edit</label>
                    <select id="dropdown" onChange={handleChange} name="itemDescription" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500">
                        <option value="" >
                            Select one item to be edited
                        </option>
                        {
                            showEdiList["itemDescription"].map((items, idx) => (
                                <option key={idx} value={idx}>
                                    {items['itemName']}
                                </option>
                            ))
                        }
                    </select>
                    {
                        !loading && <div className="flex items-center mt-2">
                            <button type="submit" className="bg-blue-500 text-white font-bold px-4 py-2 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600">Submit</button>
                        </div>
                    }
                </form>
            }





        </div>
    )
}

export default EditPage