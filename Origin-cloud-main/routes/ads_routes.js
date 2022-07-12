const express = require("express")

const router = express.Router()

const Ad = require('../models/ad_model')
const User = require('../models/user.model')
const { authenticate, authorize } = require('../controllers/user.controller')
const { createAd } = require('../controllers/ads_controller')

router.get("/publish", authenticate,async function(req,res){
    
    const user = await User.findById({_id:req.user.uid})

    res.render("ad-center",{User:user})
})

router.post("/publish/:id",authenticate,createAd)

module.exports = router