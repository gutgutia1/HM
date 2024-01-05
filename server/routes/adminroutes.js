const http = require('http');
const fs = require('fs');

const express = require('express');
const multer = require('multer');

const Router = express.Router;
const {insertItem, getItem}= require("../controllers/ItemPart")
const {auth,isOP1}= require("../middleware/auth")



const upload = multer({ dest: 'tmp/csv/' });
const router = new Router();




router.post("/importItemParts",upload.single('file'),insertItem)
router.get("/getItemList",auth,isOP1,getItem)


module.exports = router