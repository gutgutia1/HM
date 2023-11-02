import React from 'react'
import { useForm } from 'react-hook-form';
import NormalInput from '../NormalInput';
import { rows } from "../../../Assets/logInputs"
import { registerLog } from '../../../Services/HeatRegister/LogRegister';
import { useDispatch, useSelector } from 'react-redux';
import { setHeat, setStep } from '../../../Slices/op1Slice';
import { Navigate, useNavigate } from 'react-router-dom';

function LogRegisterForm() {
  const { handleSubmit, register, setValue,
    getValues, formState: { errors } } = useForm();
    const{token} = useSelector((state)=>state.auth)
    const{heat} = useSelector((state)=>state.op1)
    const dispatch = useDispatch()
    // console.log(heat._id)
    const navigate = useNavigate()

  const onSubmit = async (data) => {

    data.heatNo=heat._id
    // console.log(data)
    const result= await registerLog(data,token)
    if(result){
      console.log(result)
      dispatch(setHeat(result))
      navigate("/intermediatePage")
    }

  };
  if(heat != null){
    return (
      <div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-6 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Log Registeration</h2>

        {
          rows.map((row) => (
            <NormalInput
              key={row.id}
              label={row.label}
              name={row.name}
              placeholder=""
              register={register}
              errors={errors}
              setValue={setValue}
              getValues={getValues} />
          ))
        }
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" >
          Submit details
        </button>
      </form>
    </div>
    )
  }
  else{
    return (
      <Navigate to = "/dashboard"/>
    )
  }
 
}

export default LogRegisterForm