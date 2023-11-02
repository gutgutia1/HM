// Import the Mongoose library
const mongoose = require("mongoose")

// Define the user schema using the Mongoose Schema constructor
const heatSchema = new mongoose.Schema(
  {
    // Define the name field with type String, required, and trimmed
    inputDate: {
      type: String,
      required: true,
      trim: true
    },
    heatNo: {
      type: String,
      required: true,
      trim: true,
    },
    meltingSupervisor:{
      type:[String],
    },
    mouldingSupervisor:{
      type:[String],
    },
    pouringSupervisor:{
      type:[String],
    },
    coreSupervisor:{
      type:[String],
    },
    shiftIncharge:{
      type:String,
      required:true
    },
    furnaceNo:{
      type:Number,
      required:true,
    },
    workerType:{
      type:String,
    },
    contractorName:{
      type:String,
    },
    sandIncharge:{
      type:String,
    },
    metalGrade:{
      type:String,
      trim: true,
    },
    itemDescription:[
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Items",
      }
    ],
    mouldingSection:{
      type:[String]
    },
    logDetails:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Log",
    }
  }
)

// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("Heat", heatSchema)
