import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'; import { useDispatch, useSelector } from "react-redux"
import ChipInput from '../ChipInput';
import NormalInput from '../NormalInput';
import { editHeat, registerHeat } from '../../../Services/HeatRegister/HeatRegister';
import { resetHeatState, setEdit, setHeat } from '../../../Slices/op1Slice';
import { useNavigate } from 'react-router-dom';

function HeatRegisterForm() {

  const { handleSubmit, register, setValue,
    getValues, formState: { errors } } = useForm();
  const { token } = useSelector((state) => state.auth)
  const {heat,edit} = useSelector((state)=>state.op1)
  const dispatch = useDispatch()
  const [isContractor, setisContractor] = useState(false)
  const [customMetalGrade, setCustomMetalGrade] = useState(false)
  const [customMouldingSection, setcustomMouldingSection] = useState(false)
  const metGrade = ["VME", "NEW PLANT", "HAND MOULDING","Old Pallete", "New Pallete"];
  const mouldSec = [];
  const navigate = useNavigate()
  const handleSelectChange = (event) => {
    event.target.value === "Contractor" ? setisContractor(true) : setisContractor(false)
  }

  const handleSelectChangeForMtalGrade = (event) => {

    if (event.target.value === "custom") {
      setCustomMetalGrade(true);
      setValue("metalGrade", "");
    } else {
      setCustomMetalGrade(false);
    }
  }
  const handleSelectChangeForMouldSec = (event) => {

    if (event.target.value === "custom") {
      setcustomMouldingSection(true);
      setValue("mouldingSection", "");
    } else {
      setcustomMouldingSection(false);
    }


  }


  const onSubmit = async (data) => {
    if(edit){
      const result= await editHeat(data,token)
      if (result) {
        dispatch(setHeat(result))
        dispatch(setEdit(false))
        navigate("/intermediatePage")
      }
    }
    else{
      const result = await registerHeat(data, token)
      if (result) {
        dispatch(setHeat(result))
        navigate("/intermediatePage")
      }
    }

  };

  
    useEffect(()=>{
      if(edit){
       if(heat.workerType=="Contractor"){
        setisContractor(true)
       }
        setValue("inputDate", heat.inputDate)
        setValue("heatNo", heat.heatNo)
        setValue("meltingSupervisor", heat.meltingSupervisor)
        setValue("mouldingSupervisor", heat.mouldingSupervisor)
        setValue("pouringSupervisor", heat.pouringSupervisor)
        setValue("coreSupervisor", heat.coreSupervisor)
        setValue("shiftIncharge", heat.shiftIncharge)
        setValue("shiftNumber", heat.shiftNumber)
        setValue("furnaceNo", heat.furnaceNo)
        setValue("workerType", heat.workerType)
        setValue("contractorName", heat?.contractorName)
        setValue("sandIncharge", heat.sandIncharge)
        setValue("metalGrade", heat.metalGrade)
        setValue("mouldingSection", heat.mouldingSection)
          
      }
    },[])
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Heat Registeration</h2>
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="inputDate">
          Heat Entry Date <sup className="text-red-500">*</sup>
        </label>
        <input
          id="inputDate"
          type="date"
          disabled={edit ? true : false}
          {...register("inputDate", { required: true })}
          className="form-style w-full border rounded py-2 px-3"
        />
        {errors.inputDate && (
          <span className="ml-2 text-xs tracking-wide text-red-500 ">
            Heat date is required
          </span>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="heatNo">
          Heat No <sup className="text-black-200">*</sup>
        </label>
        <input
          id="heatNo"
          placeholder=""
          disabled={edit ? true : false}
          {...register("heatNo", { required: true })}
          className="form-style w-full border rounded py-2 px-3"
        />
        {errors.heatNo && (
          <span className="ml-2 text-xs tracking-wide text-black-500">
            Heat No is required
          </span>
        )}
      </div>
      <ChipInput
        label="Melting Supervisor"
        name="meltingSupervisor"
        placeholder="Enter supervisors and press enter for multiple entries"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      <ChipInput
        label="Moulding Supervisor"
        name="mouldingSupervisor"
        placeholder="Enter supervisors and press enter for multiple entries"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      <ChipInput
        label="Pouring Supervisor"
        name="pouringSupervisor"
        placeholder="Enter supervisors and press enter for multiple entries"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      <ChipInput
        label="Core Supervisor"
        name="coreSupervisor"
        placeholder="Enter supervisors and press enter for multiple entries"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      <NormalInput
        label="Shift Incharge"
        name="shiftIncharge"
        placeholder=""
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues} />

      <NormalInput
        label="Shift Number"
        name="shiftNumber"
        placeholder=""
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues} />

      <NormalInput
        label="Furnace Number"
        name="furnaceNo"
        placeholder=""
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues} />

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="workerType">
          Worker Type <sup className="text-black-200">*</sup>
        </label>
        <select
          {...register("workerType", { required: true })}
          defaultValue=""
          id="workerType"
          className="form-style w-full border rounded py-2 px-3"
          onChange={handleSelectChange}
        >
          <option value="" disabled>
            Choose a Category
          </option>
          <option value="Company">
            Company
          </option>
          <option value="Contractor">
            Contractor
          </option>
        </select>
        {errors.heatCategory && (
          <span className="ml-2 text-xs tracking-wide text-black-200">
            Course Category is required
          </span>
        )}
      </div>
      {
        isContractor && <NormalInput
          label="Contractor Name"
          name="contractorName"
          placeholder=""
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues} />
      }
      <NormalInput
        label="Sand Incharge"
        name="sandIncharge"
        placeholder=""
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues} />

      {
        !customMetalGrade && <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="metalGrade">
            Metal Grade <sup className="text-black-200">*</sup>
          </label>
          <select
            {...register("metalGrade", { required: true })}
            defaultValue=""
            id="metalGrade"
            className="form-style w-full border rounded py-2 px-3"
            onChange={handleSelectChangeForMtalGrade}
          >
            <option value="" disabled>
              Select custom value for cutom or select from list
            </option>

            {
              metGrade.map((grade, idx) => (
                <option value={grade} key={idx}>{grade}</option>
              ))
            }
            <option value="custom">
              Enter Custom Value
            </option>
          </select>
          {errors.heatCategory && (
            <span className="ml-2 text-xs tracking-wide text-black-200">
              Course Category is required
            </span>
          )}
        </div>
      }
      {
        customMetalGrade && <NormalInput
          label="Metal Grade"
          name="metalGrade"
          placeholder=""
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues} />
      }

      <NormalInput
        label="Moulding Section"
        name="mouldingSection"
        placeholder=""
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues} />






      <div className="flex flex-col sm:flex-row gap-4">
        <button type="submit"  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" >
          {edit ? "Submit edited details" :"Submit heat details"}
        </button>
        
      </div>
    </form>
  )
}

export default HeatRegisterForm