// Import the Mongoose library
const mongoose = require("mongoose")

// Define the user schema using the Mongoose Schema constructor
const userSchema = new mongoose.Schema(
  {
    // Define the name field with type String, required, and trimmed
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    // Define the password field with type String and required
    password: {
      type: String,
      required: true,
    },
    // Define the role field with type String and enum values of "Admin", "Student", or "Visitor"
    accountType: {
      type: String,
      enum: ["Admin", "Operator1", "Operator2"],
      required: true,
    },
    contactNumber: {
      type: Number,
      trim: true,
    },
    employeeId:{
      type:String,
      required:true,
      
    }
    // Add timestamps for when the document is created and last modified
  }
)

// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("User", userSchema)
