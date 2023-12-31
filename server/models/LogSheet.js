// Import the Mongoose library
const mongoose = require("mongoose")
const logSchema = new mongoose.Schema(
  {
    liningNo:{
        type:String,
      },
    liquidMetal:{
        type:String
    },
    wiReturn:{
        type:String,
      },
    sgimciReturn:{
        type:String
    },
    msScrap:{
        type:String
    },
    pigIron:{
        type:String,
      },
    greyIron:{
        type:String
    },
    mix:{
        type:String
    },
    spongeIron:{
        type:String,
      },
    totalCharge:{
        type:String
    },
    gfpetCoke:{
        type:String
    },
    mcr:{
        type:String,
      },
    sicFesi:{
        type:String
    },
    feMn:{
        type:String
    },
    feboFeSiMgFesi:{
        type:String,
      },
    bismuthMgTreatment:{
        type:String
    },
    totalLiqMetal:{
        type:String
    },
    metalTapped:{
        type:String,
      },
    metalLeftInFurnace:{
        type:String
    },
    powerOn:{
        type:String
    },
    tappedAt:{
        type:String,
      },
    pouringEnded:{
        type:String
    },
    totalTime:{
        type:String
    },
    kwhConsumed:{
        type:String,
      },
    carbon:{
        type:String
    },
    silcon:{
        type:String
    },
    manganese:{
        type:String,
      },
    sulphur:{
        type:String
    },
    pCr:{
        type:String
    },
    phos:{
        type:String
    },
    chromium:{
        type:String
    },
    tappingTemp:{
        type:String,
      },
    lastPouringTemp:{
        type:String
    },
    mottleBarTest:{
        type:String
    },
    melter:{
        type:String,
      },
  },
  { timestamps: true }
)

// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("Log", logSchema)
