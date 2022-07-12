
const mongoose = require('mongoose')


const sharedpostSchema = new mongoose.Schema({
	author:String,			// Author id
	body: String,           // Content of post
    shared_timeline:String,
    type:String,
    group:String,
    posts_id:String

})

module.exports = mongoose.model('sharedPost', sharedpostSchema)
