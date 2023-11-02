// Import the Mongoose library
const mongoose = require("mongoose")

// Define the user schema using the Mongoose Schema constructor
const itemSchema = new mongoose.Schema(
  {
    // Define the name field with type String, required, and trimmed
    itemName: {
        type: String,
        trim: true,
    },
    partNo: {
      type: String,
      trim: true,
    },
    customerName:{
      type:String,
    },
    category:{
      type:String,
    },
    boxesMoulded:{
      type:Number,
    },
    cavity:{
      type:Number,
    },
    boxSize:{
      type:String,
      
    },
    totalMoulded:{
      type:Number,
    },
  }
)

// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("Items", itemSchema)
