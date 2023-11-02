import React, { useEffect, useState } from 'react'
import axios from "axios";



import NormalInput from '../NormalInput'
import { useForm } from 'react-hook-form';
import { getExcel } from '../../../Services/HeatRegister/HeatRegister';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
const BASE_URL = process.env.REACT_APP_BASE_URL

function GenerateReport() {
    const { handleSubmit, register, setValue,
        getValues, formState: { errors } } = useForm();
    const [downloadedFile, setDownloadedFile] = useState(null);
    const { token } = useSelector((state) => state.auth)
    // console.log(step)
    const onSubmit = async (data) => {
        const toastId=toast.loading("Loading")
        axios.get(BASE_URL + `/opone/getDateExcel?inputDate=${data.inputDate}`, {
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {
            toast.dismiss(toastId)
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${data.inputDate}.xlsx`);
            document.body.appendChild(link);
            link.click();
            toast.success("Excel downloaded")
        }).catch((error) => {
            toast.dismiss(toastId)
            toast.error("No excel found")
            console.error('Promise rejected:', error);
          })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-6 space-y-4">
            <h1 className="text-2xl font-semibold mb-4">Date Form</h1>
            <div className="mb-4">
                <label>Select date for excel generation:</label> <sup className="text-red-500">*</sup>
                <input
                    type="date"
                    {...register("inputDate", { required: true })} // Register the 'date' input
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
                {errors.inputDate && (
                    <span className="ml-2 text-xs tracking-wide text-red-500 ">
                        Heat date is required
                    </span>
                )}
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-4 transition duration-300"
            >
                Submit
            </button>
            {downloadedFile && (
                <a href={downloadedFile} download="example.xlsx">
                    Click to download Excel file
                </a>
            )}
        </form>
    )
}

export default GenerateReport