const express = require("express")

const router = express.Router()

const Ad = require('../models/ad_model')

const questionModel = require("../models/quemodels.js")

const Post = require('../models/post.model')

const Group = require('../models/group.model')

const userPost = require('../models/userposts_models')

const User = require('../models/user.model')

const Admin = require('../models/admin_model')
// const User = require('../models/user.model')
const { authenticate, authorize } = require('../controllers/user.controller')
const { createAdmin,loginAdmin,approveAd,adminAuthenticate} = require('../controllers/admin_controller')


router.get("/signin",createAdmin)


router.get("/dashboard",adminAuthenticate, async function(req,res){
    const ad = await Ad.find({})
    res.render("admin-ads",{Ads:ad})
})

router.get("/dashboardadmin",adminAuthenticate,async function(req,res){

    const users = await User.find({})
    const questions = await questionModel.find({})
    const userposts = await userPost.find({})
    const groupposts = await Post.find({})
    const groups = await Group.find({})

    res.render("admin-dashboard",{Users:users,Questions:questions,Userposts:userposts,Groupposts:groupposts,Groups:groups}) 
 })

router.post("/dashboard",loginAdmin)

router.post("/approve/:id",adminAuthenticate, approveAd)





module.exports = router