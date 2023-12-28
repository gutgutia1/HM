const Items = require("../models/Items")
const Heat = require("../models/Heat")
exports.itemDetails = async (req, res) => {
  try {
    const {
      itemName,
      partNo,
      customerName,
      category,
      boxesMoulded,
      cavity,
      boxSize,
      heatNo,
      totalCasting,
      inputDate,
      boxesPoured,
      boxesleaked,
      boxesdestroyed

    } = req.body
    // const heatobj = await Heat.findOne({ heatNo })
    // const totalMoulded = boxesMoulded * cavity;
    const ItemDetails = await Items.create({
      itemName,
      partNo,
      customerName,
      category,
      boxesMoulded,
      cavity,
      boxSize,
      totalCasting,
      inputDate,
      boxesPoured,
      boxesleaked,
      boxesdestroyed

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

exports.editItemDetails = async(req,res)=>{
  try {
    const {
      
      itemName,
      partNo,
      customerName,
      category,
      boxesMoulded,
      cavity,
      boxSize,
      heatNo,
      totalCasting,
      inputDate,
      boxesPoured,
      boxesleaked,
      boxesdestroyed,
      _id

    } = req.body
    
    const existingItem = await Items.findOneAndUpdate({_id},{itemName,
      partNo,
      customerName,
      category,
      boxesMoulded,
      cavity,
      boxSize,
      totalCasting,
      inputDate,
      boxesPoured,
      boxesleaked,
      boxesdestroyed},{new:true})
    const updatedHeat = await Heat.findById(
      {_id:heatNo}
    ).populate({
      path: "itemDescription",
    })
      .exec()
    return res.status(200).json({
      success: true,
      message: "Items edited successfully",
      updatedHeat
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Item cannot be edited. Please try again.",
    })
  }
}