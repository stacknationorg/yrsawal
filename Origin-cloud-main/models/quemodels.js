const express = require("express");

const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema({
    title: String,
    cateogary: String,
    author:String,
    tags: [String],
    img:
    {
        data: Buffer,
        contentType: String
    },
    details: String,



    answers: [{
        author:String,
        author_id:String,
        answer: String,
        date_answer: String,
        img: {
            data: Buffer,
            contentType: String
        },
      
    }]
    ,

    date: String,
    questComment: [{
        author:String,
        author_id:String,
        qcommment: String,
        date_comment: String
    }
    ],
    ansComment:[
       {author:String,
        author_id:String,
        answer:String,
        comment:String
       }
    ],
    upvotes: [String],
})

module.exports = mongoose.model("Question", questionSchema)