const Post = require('../models/post')
const Comment = require('../models/comment');

module.exports.create = async function(req, res){

    try{
        await Post.create({
            content: req.body.content,
            user: req.user._id
       });
    
       if(req.xhr){
           return res.status(200).json({
               data: {
                   post: post
               },
               message: "Post Created!"
           });
       }

       req.flash('success', 'Post published!');
       return res.redirect('back');

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }

 
}


module.exports.destroy = function(req,res){
    Post.findById(req.params.id, function(err, post){
        // .id is in string for comparison
         if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post: req.params.id}, function(err){
                req.flash('success', 'Post deleted');
                return res.redirect('back');
            });
         }else{
             return res.redirect('back');
         }

    });
}