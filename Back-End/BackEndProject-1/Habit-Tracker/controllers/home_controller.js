// const Post = require('../models/post');
const Habit = require('../models/habitModel');
const User = require('../models/user');



module.exports.home = async function(req, res){

    try{
        //  populate the user of each post
        let habit = await Habit.find({})
        .populate('user')
        .populate({
            path: 'description',
            populate: {
                path: 'user'
            }
        });
    
        let users = await User.find({});

        return res.render('home', {
            title: "Codeial | Home",
            // posts:  posts,
            all_users: users
        });

    }catch(err){
        console.log('Error', err);
        return;
    }
   
}

// module.exports.actionName = function(req, res){}


// using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();

// posts.then()
