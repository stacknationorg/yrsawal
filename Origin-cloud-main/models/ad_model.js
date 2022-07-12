const express = require("express");

const mongoose = require("mongoose")

const adSchema = new mongoose.Schema({
    campaign_name: String,
    ad_name: String,
    ad_description:String,
    locations: [String],
    // ad_logo:
    // {
    //     data: Buffer,
    //     contentType: String
    // },
    // image:
    // {
    //     data: Buffer,
    //     contentType: String
    // },
    Objective: String,
    category:String,
    hashtag:[String],
    ad_type:String,
    business_name:String,
    Headline:String,
    body_text:String,
    add_link:String,
    ad_setup:{
       budget:String,
       payment_type:String
    },
    duration:{
        from:String,
        to:String
    },
    user:String,

    details:String,

    ad_status:String,

    date: String,

})

module.exports = mongoose.model("Ads", adSchema)