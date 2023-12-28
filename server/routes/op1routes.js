const express = require("express")
const router = express.Router()

const {heatDetails, createDateExcel, getHeatDetails, editHeatDetails}=require("../controllers/Heat")
const {logDetails} = require("../controllers/Logsheet")
const {itemDetails, editItemDetails} = require("../controllers/Items")
const {auth,isOP1}= require("../middleware/auth")

router.post("/registerHeat",auth,isOP1,heatDetails)
router.post("/registerLog",auth,isOP1,logDetails)
router.post("/registerItem",auth,isOP1,itemDetails)
router.get("/getDateExcel",createDateExcel)
router.post("/getHeatDetails",auth,isOP1,getHeatDetails)
router.post("/editHeatDetails",auth,isOP1,editHeatDetails)
router.post("/editItemDetails",auth,isOP1,editItemDetails)


module.exports = router