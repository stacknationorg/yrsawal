const express = require("express")

const router = express.Router()

const Ad = require('../models/ad_model')

const Admin = require('../models/admin_model')
// const User = require('../models/user.model')
const { authenticate, authorize } = require('../controllers/user.controller')
const { createAdmin,loginAdmin,approveAd,adminAuthenticate} = require('../controllers/admin_controller')


router.get("/signin",createAdmin)


router.get("/dashboard",adminAuthenticate, async function(req,res){
    const ad = await Ad.find({})
    res.render("admin-ads",{Ads:ad})
})

router.post("/dashboard",loginAdmin)

router.post("/approve/:id",adminAuthenticate, approveAd)



module.exports = router