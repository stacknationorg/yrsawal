const express = require("express");

const mongoose = require("mongoose")

const menteeSchema = new mongoose.Schema({
        name:String,
        occupation:String,
        gender:String,
        country:String,
        email:String,
        experience:String,
        user:String,
        stream:String,
        field:String,
        expert_details:String,
        timeslot:String,
        time:String
})

module.exports = mongoose.model("Mentee", menteeSchema)
