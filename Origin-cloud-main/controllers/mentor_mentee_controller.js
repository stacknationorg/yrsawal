const Mentor   = require('../models/mentor_model')
const Mentee   = require('../models/mentee_model')

const Razorpay = require("razorpay")

var instance = new Razorpay({
	key_id:"rzp_live_PnQSHoPi5lwM25",
	key_secret:"ENUzbqgpXhxDX4BZGHvPXsyw"
})

const createMentor = async function(req,res){

    const reg_mentor = await Mentor.findOne({user:req.user.uid})

    if(reg_mentor.transaction==="not done"){

    const mentor = new Mentor({
        name:req.body.name,
        occupation:req.body.occupation,
        gender:req.body.gender,
        country:req.body.country,
        email:req.body.email,
        experience:req.body.experience,
        user:req.user.uid,
        category:req.body.category,
        // stream:String,
        // field:String,
        why_you:req.body.why_you,
        mentor_experience:req.body.mentor_experience,
        current_job:req.body.current_job,
        session_duration:req.body.session_duration,
        timings:req.body.timing
    })
    mentor.save()

    var options = {
        amount: 1,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
      };
      instance.orders.create(options, function(err, order) {
        console.log(order);
        res.render("mentorpay2",{OrderId:order.id})
      });
   
    
}
else{
    res.json({
        message:"You have already registerd as mentor"
    })
}

}

const createMentee = async function(req,res){

    const mentee = new Mentee({
        name:req.body.name,
        occupation:req.body.occupation,
        gender:req.body.gender,
        country:req.body.country,
        email:req.body.email,
        experience:req.body.experience,
        user:req.user.uid,
        category:req.body.category,
        stream:req.body.stream,
        field:req.body.field,
        expert_details:req.body.expert_details,
        timeslot:req.body.timeslot,
        time:req.body.time
    })
    mentee.save()
    // res.json({
    //     message:"Your Info has been recorded wait for admin's approval and mentor's appointment"
    // })

    res.redirect("/user/mentee/pay/"+ mentee._id)

}

module.exports = {
    createMentee,
    createMentor
}