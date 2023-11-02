const express = require("express")
const router = express.Router()

const {heatDetails}=require("../controllers/Heat")
const {logDetails} = require("../controllers/Logsheet")
const {itemDetails} = require("../controllers/Items")
const {auth,isOP1}= require("../middleware/auth")

router.post("/registerHeat",auth,isOP1,heatDetails)
router.post("/registerLog",auth,isOP1,logDetails)
router.post("/registerItem",auth,isOP1,itemDetails)


module.exports = router