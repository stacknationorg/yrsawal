const Ad   = require('../models/ad_model')

const createAd = async function(req,res){
    
    const Campaign_name=req.body.campaign_name
    const Ad_name = req.body.Ad_name
    const Ad_des = req.body.Ad_des
    const Details = req.body.details
    const Objective = req.body.Objective
    const Type = req.body.Ad_type
    const Hashtags = req.body.hashtags
    const Category = req.body.category
    const B_name = req.body.b_name
    const Ad_body = req.body.ad_body
    const Ad_duration = req.body.Ad_duration
    const Duration_type = req.body.Ad_time_type
    const Ad_budget = req.body.ad_budget
    const Payment_type = req.body.payment_time
    const Ad_headline = req.body.headline
    const Ad_link = req.body.ad_link
    const Locations = req.body.locations

    const  ad = new Ad({
         
        campaign_name:Campaign_name,
         ad_name:Ad_name,
    ad_description:Ad_des,
    locations: Locations,
    ad_logo:
    {
        data: Buffer,
        contentType: String
    },
    image:
    {
        data: Buffer,
        contentType: String
    },
    Objective: Objective,
    category:Category,
    hashtag:Hashtags,
    ad_type:Type,
    business_name:B_name,
    Headline:Ad_headline,
    body_text:Ad_body,
    add_link:Ad_link,
    ad_setup:{
       budget:Ad_budget,
       payment_type:Payment_type
    },
    duration:{
        from:req.body.from_date,
        to:req.body.to_date
    },
    details:Details,
    user:req.user.uid,
    ad_status:"Not Aprroved"      
    })

    ad.save()
    console.log(ad);
    res.json({
        message: "Info stored successfully wait for admin to approve"
    })

}
module.exports = {
    createAd
}