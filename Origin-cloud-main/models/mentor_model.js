const express = require("express");

const mongoose = require("mongoose")

const mentorSchema = new mongoose.Schema({
        name:String,
        occupation:String,
        gender:String,
        country:String,
        email:String,
        experience:String,
        user:String,
        category:String,
        // stream:String,
        // field:String,
        why_you:String,
        mentor_experience:String,
        current_job:String,
        session_duration:String,
        timings:String
})

module.exports = mongoose.model("Mentor", mentorSchema)