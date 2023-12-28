import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { rows } from '../../../Assets/itemInput'
import NormalInput from '../NormalInput';
import ChipInput from '../ChipInput';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { editItem, registerItem } from '../../../Services/HeatRegister/ItemRegister';
import { setEdit, setHeat, setitem } from '../../../Slices/op1Slice';

function ItemsRegisterForm() {
    const { handleSubmit, register, setValue,
        getValues, formState: { errors } } = useForm();
        const navigate = useNavigate()
        const dispatch = useDispatch()
        const {heat,edit,item} = useSelector((state)=>state.op1)
        const {token} = useSelector((state)=>state.auth)

    const onSubmit = async (data) => {
        data.heatNo = heat._id
        data.inputDate=heat.inputDate
        if(edit && item){
            data._id= item._id
            const result = await editItem(data,token)
            dispatch(setHeat(result))
            // console.log(heat)
            dispatch(setitem(null))
            dispatch(setEdit(false))
            navigate("/intermediatePage")
            return
        }
        const result  = await registerItem(data,token)

        if(result){
            dispatch(setHeat(result))
            // console.log(heat)
            navigate("/intermediatePage")
            

        }
       
    };

    useEffect(()=>{
        // console.log(edit)
        if(edit && item){
            setValue("itemName",item.itemName)
            setValue("partNo",item.partNo)
            setValue("customerName",item.customerName)
            setValue("category",item.category)
            setValue("boxesMoulded",item.boxesMoulded)
            setValue("boxesPoured",item.boxesPoured)
            setValue("cavity",item.cavity)
            setValue("boxesdestroyed",item.boxesdestroyed)
            setValue("boxesleaked",item.boxesleaked)
        }
    },[])

    const [cavity, setCavity] = useState(item ? item.cavity : 0);
    const [boxesPoured, setboxesPoured] = useState(item ? item.boxesPoured : 0);
    const [customItemName, setcustomItemName] = useState(false)
    const [partName, setPartName] = useState(item ? item.partNo : "")
   

    //     const firstInputValue = watch('cavity ', 0);
    //   const secondInputValue = watch('boxesMoulded', 0);



    useEffect(
        () => {
            const product = cavity * boxesPoured;
            setValue('totalCasting', product);
        }, [cavity, boxesPoured]     
    )
    const handleonchange = (e) => {
        if (e.target.value !== '')
            setCavity(e.target.value)
        else {
            setCavity(0)
        }
    }
    const handleonchangebox = (e) => {
        if (e.target.value !== '')
            setboxesPoured(e.target.value)
        else {
            setboxesPoured(0)
        }
    }
    const handleSelectChangeForItemName = (event) => {
        if (event.target.value === "custom") {
            setcustomItemName(true);
            setValue("itemName", "");
            setPartName("")
        } else {
            setcustomItemName(false);
            let v = event.target.value
            setPartName(itempartmap[v])
        }
    }
    const handleoncpartNO = (event) => {
        if (customItemName) {
            setPartName(event.target.value)
        }

    }
    useEffect(() => {
        setValue('partNo', partName)
    }, [partName])
    const itemlist = ["S.tube", "def"]
    const itempartmap = {
        "S.tube": "1",
        "A.R.B Bkt Top ": "3701",
        "Tooth Sigment": "2",
        "Gear Case Cover Front": "3703",
        "Casing": "3",
        "Kp-32": "4",
        "Drop Cover": "5104",
        "Support Plate": "3702",
        "Devil gear": "3354",
        "Mast BKt-150": "3073",
        "CrankPeel": "5",
        "Bearing with sign board": "6",
        "Front spring bkt hanger": "0106",
        "H-Cycle":"3728",
        "Mast BKt-200": "3074",
        "White Iron": "3071",
        "Contact winding plain": "1792",
        "Guide plate":"3712",
        "Rear Spring cycle": "0103",
        "Rear Spring cycle-2": "0107",
        "Socket Cap":"309",
        "Rear Spring Bkt hanger": "0180",

    }
   
    const renderChildFunction=()=>{

    }
    // useEffect(() => {
    //     // This code will run when the component mounts (similar to componentDidMount)
    
    //     // Trigger a page reload to refresh the content
    //     window.location.reload();
    //   }, []);
    

    
  if (heat != null) {
    return <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-6 space-y-4">
    <h2 className="text-2xl font-bold mb-4">Item Registeration</h2>

    {
        !customItemName && <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="itemName">
                Item Name  <sup className="text-red-500">*</sup>
            </label>
            <select
                {...register("itemName", { required: true })}
                defaultValue=""
                id="itemName"
                className="form-style w-full border rounded py-2 px-3"
                onChange={handleSelectChangeForItemName}
            >
                <option value="" disabled>
                    Select custom value for cutom or select multiple from list
                </option>

                {
                    Object.keys(itempartmap).map((item, idx) => (
                        <option value={item} key={idx}>{item}</option>
                    ))
                }
                <option value="custom">
                    Enter Custom Value
                </option>
            </select>
            {errors.itemName && (
                <span className="ml-2 text-xs tracking-wide text-red-500">
                    ItemName is required
                </span>
            )}
        </div>
    }
    {
        customItemName && <NormalInput
            label="Item Name"
            name="itemName"
            placeholder=""
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues} />
    }


    {
        rows.map((row) => (

            row.name === "partNo" ? (<div className="flex flex-col space-y-2" key={row.id}>
                <label className="text-sm text-richblack-5" htmlFor="partNo" >
                    Part No <sup className="text-red-500">*</sup>
                </label>
                <input
                    id="partNo"
                    type="text"
                    placeholder=""
                    disabled={!customItemName}
                    value={partName}
                    {...register("partNo", { required: true })}
                    onChange={handleoncpartNO}
                    className="form-style w-full border rounded py-2 px-3"
                />
                {errors.partNo && (
                    <span className="ml-2 text-xs tracking-wide text-red-500">
                        Part No is required
                    </span>
                )}
            </div>) : <NormalInput key={row.id}
                label={row.label}
                type={row?.type}
                name={row.name}
                placeholder=""
                register={register}
                disabled={row.name === "partNo" ? !customItemName : false}
                errors={errors}
                setValue={setValue}
                getValues={getValues} />


        ))
    }

    <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="boxesMoulded">
            Boxed Moulded <sup className="text-red-500">*</sup>
        </label>
        <input
            id="boxesMoulded"
            type="number"
            placeholder=""
            {...register("boxesMoulded", { required: true })}
            className="appearance-none w-full py-2 px-3 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
        />
        {errors.boxesMoulded && (
            <span className="ml-2 text-xs tracking-wide text-red-500">
                Boxed Moulded is required
            </span>
        )}
    </div>
    <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="boxesPoured">
            Boxed Poured <sup className="text-red-500">*</sup>
        </label>
        <input
            id="boxesPoured"
            type="number"
            placeholder=""
            {...register("boxesPoured", { required: true })}
            onChange={handleonchangebox}
            className="appearance-none w-full py-2 px-3 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
        />
        {errors.boxesPoured && (
            <span className="ml-2 text-xs tracking-wide text-red-500">
                Boxed Poured is required
            </span>
        )}
    </div>
    <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="cavity">
            Cavity <sup className="text-red-500">*</sup>
        </label>
        <input
            id="cavity"
            type="number"
            placeholder=""
            {...register("cavity", { required: true })}
            onChange={handleonchange}
            className="appearance-none w-full py-2 px-3 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
        />
        {errors.cavity && (
            <span className="ml-2 text-xs tracking-wide text-red-500">
                Cavity is required
            </span>
        )}
    </div>
    


    <ChipInput label="Box Size"
        name="boxSize"
        placeholder="Enter box size and press enter for multiple entries"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues} 
        renderChildFunction={renderChildFunction}/>

    <NormalInput
        label="Total Casting"
        name="totalCasting"
        placeholder=""
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
        disabled={true} />
    <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="boxesdestroyed">
            Destroyed <sup className="text-red-500">*</sup>
        </label>
        <input
            id="boxesdestroyed"
            type="number"
            placeholder=""
            {...register("boxesdestroyed", { required: true })}
            className="appearance-none w-full py-2 px-3 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
        />
        {errors.boxesdestroyed && (
            <span className="ml-2 text-xs tracking-wide text-red-500">
                Destroyed is required
            </span>
        )}
    </div>
    <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="boxesleaked">
            Leakage <sup className="text-red-500">*</sup>
        </label>
        <input
            id="boxesleaked"
            type="number"
            placeholder=""
            {...register("boxesleaked", { required: true })}
            className="appearance-none w-full py-2 px-3 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
        />
        {errors.boxesleaked && (
            <span className="ml-2 text-xs tracking-wide text-red-500">
                Leakage is required
            </span>
        )}
    </div>

    <div className="flex flex-col sm:flex-row gap-4">
       
        <button type="submit"  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" >
            Submit item 
        </button>
    </div>

</form>
  } else {
    return <Navigate to="/dashboard" />
  }

}

export default ItemsRegisterForm