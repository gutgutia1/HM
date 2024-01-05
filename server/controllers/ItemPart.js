const ItemPart = require("../models/ItemsPart")
const csv = require('csvtojson');


exports.insertItem = async(req,res)=>{
    try{
        var ItemPartData = [];
        csv()
        .fromFile(req.file.path)
        .then(async (response)=> {
            // console.log(response)
            // console.log(response.length)
            for(var x=0;x<response.length;x++){
                ItemPartData.push({
                    itemName:response[x]['Casting'],
                    partNo:response[x]['Partnumber'],
                    category:response[x]['Category'],
                    customerName:response[x]['CustomerName'],
                })
            }

            await ItemPart.insertMany(ItemPartData)


        })        
        return res.status(200).json({
            success:true,
            message:"Items inserted successfully"
        })
    }
    catch (error) {
        console.error(error)
        return res.status(500).json({
          success: false,
          message: "Items Cannot be inserted",
        })
      }
}

exports.getItem = async(req,res)=>{
    try{
        const itemList = await ItemPart.find({},{_id:0,__v:0});
        console.log(itemList.length)
        return res.status(200).json({
            success:true,
            message:"Item fetched",
            itemList
        })
    }
    catch (error) {
        console.error(error)
        return res.status(500).json({
          success: false,
          message: "Items Cannot be inserted",
        })
      }
}