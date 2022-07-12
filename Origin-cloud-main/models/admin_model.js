const express = require("express");

const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
     admin:{
        type:String,
        default:"yoursawal@gmail.com"
     }, 
     password:{
        type:String,
        default:"pas@yrswl1"
     } 
})

module.exports = mongoose.model("Admin", adminSchema)