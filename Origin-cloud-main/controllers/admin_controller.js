const Admin   = require('../models/admin_model')
const Ad   = require('../models/ad_model')
const jwt = require('jsonwebtoken')
const createAdmin =async function(req,res){
    const admin = await Admin.findOne({admin:"yoursawal@gmail.com"})
    if(!admin){
        const new_admin = new Admin({

        })
        new_admin.save()
    }
    res.render("admin-signin")
}

const loginAdmin = async function (req,res){
    const ad = await Ad.find({})
    const username = req.body.admin_email
    const password = req.body.admin_password
    const admin = await Admin.findOne({admin:username})
    if (admin) {
        // Compate password if user exist
        if (await (password, admin.password)) {
            // Genrate a jesonwebtoken and save it in cookie
            const token = jwt.sign({
                email: admin.email,
                uid: admin._id
            }, process.env.SECRET)
            res.cookie('token', token, { httpOnly: true });
            console.log(token);
            res.redirect("/admin/dashboard")
        } else {
            res.json({
                error: "Invalid username or password." // Password didn't match
            })	
        }
    }
    // if(admin.password === password){
    //     res.render("admin-ads",{Ads:ad}) 
    // }
    // else{
    //     res.json({
    //         message:"Please sigin with admin's credentials"
    //     })
    // }
}

const approveAd = async function (req,res){
    const ad_id = req.params.id
    
    
    const admin_response  = req.body.response

    if(admin_response==="approved"){
        await Ad.updateOne(
            {_id:ad_id},
            {
              ad_status:"Approved"  
            })
    }

    if(admin_response==="approved"){
        await Ad.updateOne(
            {_id:ad_id},
            {
              ad_status:"Approved"  
            })
    }

    if(admin_response==="rejected"){
        await Ad.updateOne(
            {_id:ad_id},
            {
              ad_status:"Rejected"  
            })
    }

    const ad = await Ad.find({})
    res.redirect("/admin/dashboard") 

}

const adminAuthenticate = (req, res, next) => {
	// Get saved token from requst cookies
	const token = req.cookies.token
	console.log(token);
	if (token) {
		// Get payload from jsonwebtoken
		const payload = jwt.verify(token, process.env.SECRET)
		if (payload) {
			req.user = payload
			console.log(payload);
			next()
		} else {
			res.redirect("/admin/signin")
			// res.json({
			// 	error: "Authantication failed",
			// 	login: false
			// })
		}
	} else {
		res.redirect("/admin/signin")

		// res.json({
		// 	error: "Authantication failed",
		// 	login: false
		// })
	}
}

module.exports = {
    adminAuthenticate,
    createAdmin,
    loginAdmin,
    approveAd
}