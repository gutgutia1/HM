const Heat=require("../models/Heat")
const moment=require("moment")
exports.heatDetails = async(req,res)=>{
    try{
        const{
            inputDate,
            heatNo,
            meltingSupervisor:meltingSupervisor,
            mouldingSupervisor:mouldingSupervisor,
            pouringSupervisor:pouringSupervisor,
            coreSupervisor:coreSupervisor,
            shiftIncharge,
            furnaceNo,
            workerType,
            contractorName,
            sandIncharge,
            metalGrade,
            mouldingSection:mouldingSection,
        }=req.body
        const existingHeat = await Heat.findOne({ heatNo })
        if (existingHeat) {
        return res.status(400).json({
            success: false,
            message: "Heat Number Already Exists",
        })
        }
        const date=new Date(inputDate)
        if(!moment(date,"YYYY-MM-DD",true).isValid()){
          return res.status(500).json({
            success: false,
            message: "Invalid Date",
          })
        }
        
          
        // const meltingSupervisor=JSON.parse(_meltingSupervisor)
        // const mouldingSupervisor=JSON.parse(_mouldingSupervisor)
        // const coreSupervisor=JSON.parse(_coreSupervisor)
        // const pouringSupervisor=JSON.parse(_pouringSupervisor)
        // const mouldingSection=JSON.parse(_mouldingSection)
        const heat = await Heat.create({
            inputDate,
            heatNo,
            meltingSupervisor,
            mouldingSupervisor,
            pouringSupervisor,
            coreSupervisor,
            shiftIncharge,
            furnaceNo,
            workerType,
            contractorName,
            sandIncharge,
            metalGrade,
            mouldingSection,
          })
          return res.status(200).json({
            success: true,
            message: "Heat registered successfully",
            heat
          })
        } catch (error) {
          console.error(error)
          return res.status(500).json({
            success: false,
            message: "Heat cannot be registered. Please try again.",
          })
        }
      }