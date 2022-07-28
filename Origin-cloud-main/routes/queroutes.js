const express= require("express");
const { append } = require("express/lib/response");

const router = express.Router()

const {getuserlocation, authenticate, authorize } = require('../controllers/user.controller')

router.get("/askquestion",authenticate,async function(req,res){
    const new_user = await User.findById({_id:req.user.uid})
    res.render("ask-question",{Usera:new_user})
})



const questionModel = require("../models/quemodels.js")

const Post = require('../models/post.model')

const Group = require('../models/group.model')

const userPost = require('../models/userposts_models')

const User = require('../models/user.model')

const Ad   = require('../models/ad_model')




const fs = require('fs');
const path = require('path');

const multer = require('multer');
const { url } = require("inspector");
  
// const upload = multer({ dest: 'uploads/' })

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage });
  





router.post("/askquestion", authenticate , upload.single("files")
,async function(req,res){
    const question_cateogary=req.body.cateogaries
    const question_title=req.body.title
    const question_tags=req.body.tags
    const question_details=req.body.details

    var today = new Date();

var dateQuest = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();


var image = {}
if (req.file==undefined){
    var image = {
      default:"No image"  
   }
   }
   const filename_1 = req.file.filename
   console.log(filename_1)
   const extension = filename_1.slice(
    filename_1.indexOf(".") + 1,
    filename_1.lastIndexOf("-")
   )
   console.log(extension);

if (req.file!==undefined && (extension ==="png" || extension ==="jpeg" )){
    var image = {
        data: fs.readFileSync(path.join( 'C:/Users/Anonymous/Desktop/Origin-cloud-main/Origin-cloud-main/uploads/' + req.file.filename)),
        contentType: 'image/png'
    }

//    console.log(image);
   }  

   if (req.file!==undefined && extension ==="mp4"){
    var video = {
        data: fs.readFileSync(path.join( 'C:/Users/Anonymous/Desktop/Origin-cloud-main/Origin-cloud-main/uploads/' + req.file.filename)),
        contentType: 'video/mp4'
    }
   }

   const author_naam = await User.findById({_id:req.user.uid})
const Question = new questionModel({
            author_name:author_naam.name,
            author:req.user.uid,
            title:question_title,
             cateogary:question_cateogary,
             tags:question_tags,
             details:question_details,
             img:image,
             vdo:video,
            date:dateQuest     
})

Question.save()
    // console.log(question_tag);
    // console.log(Question);
    console.log("Question Submitted successfully")
    res.redirect("/questions")
})


router.get("/questions", authenticate,getuserlocation, async function(req,res){
    const data = req.userloc 
    const ad =await Ad.find({locations:data.city})
    const new_user = await User.findById({_id:req.user.uid})
    // console.log(new_user)
    const founditems = await questionModel.find({})
        // var thumb = new Buffer(founditems.image.data).toString('base64')
        // console.log(founditems.details);
        res.render("questions",{newQuestions:founditems,Ads:ad,Usera:new_user})
        //  console.log(founditems);
    
   
})

router.get("/questions/:id", authenticate, async function(req,res){
    const QuestionID = req.params.id
    const id= req.user.uid
    console.log(id)
    console.log(QuestionID);
    const new_user = await User.findById({_id:req.user.uid})
    console.log(new_user)
    const foundOne = await questionModel.findById({_id:req.params.id})
    // questionModel.findOne({_id:QuestionID},function(err,foundOne){
        console.log(foundOne.title);


        res.render("question-details",{Question:foundOne,Answers:foundOne.answers,Questcomments:foundOne.questComment,Usera:new_user})
        // console.log(Answers);
    

})

router.post("/questions/:id", authenticate, async function(req,res){
    const QuestionID = req.params.id
    console.log(QuestionID);
    const foundOne = await questionModel.findById({_id:req.params.id})
    // questionModel.findOne({_id:QuestionID},function(err,foundOne){
        console.log(foundOne.title);


        res.redirect("/questions/"+QuestionID)
        // console.log(Answers);
    

})

var MongoClient = require('mongodb').MongoClient;

router.post("/answers/:id", authenticate, async function(req,res){
    const Questionid = req.params.id
    
    const answering_user_id = req.user.uid

    const answering_user = await User.findById({_id:answering_user_id})

    // console.log(Questionid);
    const User_answer=req.body.message

    questionModel.findOne({_id:Questionid},function(err,foundOne){

        var today = new Date();

        var dateAns = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const objid=foundOne._id
        console.log(objid);
        // console.log(req.file.filename);
        MongoClient.connect('mongodb://localhost:27017', function(err, client) {
        if(err) throw err;
        var db =client.db("openDB")
        var collection = db.collection('questions');
        collection.updateOne({_id:objid},{ $push:{answers:{answer:User_answer,date_answer:dateAns,author:answering_user.name,author_id:req.user.uid}}})
        console.log(User_answer);
        res.redirect("/questions/"+Questionid)

        })
        
    })

    // ,img:{data:fs.readFileSync(path.join( 'C:/Users/Anonymous/Desktop/questions/uploads/' + req.file.filename)),contentType:'image/png'}
})

router.post("/comments/:id", authenticate , async function(req,res){
    const commenting_user_id = req.user.uid
    
    const commenting_user = await User.findById({_id:commenting_user_id})

    console.log(commenting_user);

    const Questionid = req.body.comment_details
    // console.log(Questionid);
    const User_comment=req.body.message_comment

    questionModel.findOne({_id:Questionid},function(err,foundOne){
        const objid=foundOne._id

        var today = new Date();

        var datecomm = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        MongoClient.connect('mongodb://localhost:27017', function(err, client) {
        if(err) throw err;
        var db =client.db("openDB")
        var collection = db.collection('questions');
        collection.updateOne({_id:objid},{ $push:{questComment:{qcommment:User_comment,date_comment:datecomm,author:commenting_user.name,author_id:req.user.uid}}})
        console.log(User_comment);
        res.redirect("/questions/"+Questionid)

        })
        
    })

   
})

router.post("/answercomment/:id", authenticate , async function(req,res){
    const Questionid = req.params.id
     
    const answering_user_id = req.user.uid

    const answering_user = await User.findById({_id:answering_user_id})
    
    // console.log(Questionid);
    const User_comment=req.body.messageanswer_comment

    questionModel.findOne({_id:Questionid},function(err,foundOne){
        const objid=foundOne._id
        MongoClient.connect('mongodb://localhost:27017', function(err, client) {
        if(err) throw err;
        var db =client.db("openDB")
        var collection = db.collection('questions');
        collection.updateOne({_id:objid},{ $push:{ansComment:{author:answering_user.name,comment:User_comment,answer:req.body.answercomment_details,author_id:req.user.uid}}})
        console.log(User_comment);
        res.redirect("/questions/"+Questionid)

        })
        
    })

   
})

router.post("/search" ,authenticate,async function(req,res){
    const usera = await User.findById({_id:req.user.uid})
    tag=req.body.search_querry
    console.log(tag);
    const Questions = await questionModel.find({title:{$regex:tag,$options:"i"}})
    const tag_questions = await questionModel.find({tags:{$regex:tag,$options:"i"}})
    // console.log(tag_questions);
    const Users = await User.find({name:{$regex:tag,$options:"i"}})
    // const Groupposts = await questionModel.find({title:{$regex:tag,$options:"i"}})
    const Userposts = await userPost.find({body:{$regex:tag,$options:"i"}})
    const Groups = await Group.find({group_name:{$regex:tag,$options:"i"}})
        // var thumb = new Buffer(founditems.image.data).toString('base64')
        
        res.render("search-result",{keyword:tag,hashtagquest:tag_questions,questions:Questions,users:Users,groups:Groups,posts:Userposts,User:usera})
        //  console.log(founditems);
   
})

router.get("/test",function(req,res){
    res.send("Oauth is working")
})

router.post("/upvote", authenticate ,function(req,res){
    qid=req.body.upvote 
    console.log(qid);
    questionModel.findOne({_id:qid},function(err,foundOne){
        const objid=foundOne._id
        const upvote=foundOne.upvotes + 1
        MongoClient.connect('mongodb://localhost:27017', function(err, client) {
        if(err) throw err;
        var db =client.db("openDB")
        var collection = db.collection('questions');
        collection.updateOne({_id:objid},{ $set:{upvotes:upvote}})
        console.log(upvote);
        res.redirect("/")

        })

    })
})


const upVote = async (req, res) => {

	// Get required fields from request
	const user_id = req.user.uid
	const { id: post_id } = req.params

	// Post id is required to like a post
	if (!post_id) {
		return res.json({
			error: "Missing post id in params"
		})
	}

	try {
		// Get post info from database with post_id
		const question = await questionModel.findById(post_id)
		if (question) {

			// Add current user to posts likes if not exist, save the updated post
			if (question.upvotes.indexOf(user_id) !== -1) {
				question.upvotes = question.upvotes.filter(user => user !== user_id)
				await question.save()
				// res.json({
				// 	message: 'Post disliked.',
				// 	liked: false
				// })
			} else {
				question.upvotes.push(user_id)
				await question.save()
				// res.json({
				// 	message: "Post liked.",
				// 	liked: true
				// })
			}
			res.redirect("/questions/"+ question._id)
		} else {
			return res.json({
				error: "Post not found.",
			})
		}
	} catch (error) {
		// Something went wrong with server, Use `error` as payload if required
		res.json({
			error: "Something went wrong.",
			payload: error
		})
	}
}

router.post("/upvote/:id",authenticate,upVote)




module.exports = router