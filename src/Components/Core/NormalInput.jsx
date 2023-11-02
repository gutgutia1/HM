import React from 'react'

function NormalInput({
    // Props to be passed to the component
    label,
    name,
    placeholder,
    register,
    errors,
    setValue,
    getValues,
    type,disabled,
    value
  }) {
    // const [chips, setChips] = useState("")
    // useEffect(() => {
    //     setValue(name, chips)
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    //   }, [chips])
  return (
    <div className="flex flex-col space-y-2">
    <label className="text-sm text-richblack-5" htmlFor={name}>
    {label} <sup className="text-red-500">*</sup>
    </label>
    <input
      id={name}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
      value={value}
      {...register(name, { required: true })}
      className="form-style w-full border rounded py-2 px-3"
    />
     {errors[name] && (
      <span className="ml-2 text-xs tracking-wide text-red-500">
        {label} is required
      </span>
    )} 
  </div>
  )
}

export default NormalInput