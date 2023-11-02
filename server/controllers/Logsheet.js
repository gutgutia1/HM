const Log=require("../models/LogSheet")
const Heat=require("../models/Heat")
exports.logDetails = async(req,res)=>{
    try{
        const{
            liningNo,
            liquidMetal,
            wiReturn,
            sgimciReturn,
            msScrap,
            pigIron,
            greyIron,
            mix,
            spongeIron,
            totalCharge,
            gfpetCoke,
            mcr,
            sicFesi,
            feMn,
            feboFeSiMgFesi,
            bismuthMgTreatment,
            totalLiqMetal,
            metalTapped,
            metalLeftInFurnace,
            powerOn,
            tappedAt,
            pouringEnded,
            totalTime,
            kwhConsumed,
            carbon,
            silcon,
            manganese,
            sulphur,
            pCr,
            phos,
            chromium,
            tappingTemp,
            lastPouringTemp,
            mottleBarTest,
            melter,
            heatNo
        }=req.body
        // const heatobj = await Heat.findOne({ heatNo })
        const logDetails = await Log.create({
            liningNo,
            liquidMetal,
            wiReturn,
            sgimciReturn,
            msScrap,
            pigIron,
            greyIron,
            mix,
            spongeIron,
            totalCharge,
            gfpetCoke,
            mcr,
            sicFesi,
            feMn,
            feboFeSiMgFesi,
            bismuthMgTreatment,
            totalLiqMetal,
            metalTapped,
            metalLeftInFurnace,
            powerOn,
            tappedAt,
            pouringEnded,
            totalTime,
            kwhConsumed,
            carbon,
            silcon,
            manganese,
            sulphur,
            pCr,
            phos,
            chromium,
            tappingTemp,
            lastPouringTemp,
            mottleBarTest,
            melter,
          })
          const updatedHeat = await Heat.findByIdAndUpdate(
            heatNo,
            {
                logDetails:logDetails._id
            },
            { new: true }
          ).populate({
              path: "logDetails",
            })
            .exec()
          return res.status(200).json({
            success: true,
            message: "Log registered successfully",
            updatedHeat
          })
        } catch (error) {
          console.error(error)
          return res.status(500).json({
            success: false,
            message: "Log cannot be registered. Please try again.",
          })
        }
      }