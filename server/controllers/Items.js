const Items=require("../models/Items")
const Heat=require("../models/Heat")
exports.itemDetails = async(req,res)=>{
    try{
        const{
            itemName,
            partNo,
            customerName,
            category,
            boxesMoulded,
            cavity,
            boxSize,
            heatNo
        }=req.body
        // const heatobj = await Heat.findOne({ heatNo })
        const totalMoulded = boxesMoulded * cavity;
        const ItemDetails = await Items.create({
            itemName,
            partNo,
            customerName,
            category,
            boxesMoulded,
            cavity,
            boxSize,
            totalMoulded
          })
          const updatedHeat = await Heat.findByIdAndUpdate(
            heatNo,
            {
                $push: {
                    itemDescription: ItemDetails._id,
                },
              },
            { new: true }
          ).populate({
              path: "itemDescription",
            })
            .exec()
          return res.status(200).json({
            success: true,
            message: "Items registered successfully",
            updatedHeat
          })
        } catch (error) {
          console.error(error)
          return res.status(500).json({
            success: false,
            message: "Item cannot be registered. Please try again.",
          })
        }
      }