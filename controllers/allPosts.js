const BlogPost = require('../models/BlogPost.js')
module.exports = async (req, res) =>{
    const blogposts = await BlogPost.find({}).populate('userid');
    
     
    res.render('allposts',{
        blogposts
        
        // or you can use blogposts:blogposts
    }
    );
}