const BlogPost = require('../models/BlogPost.js')
const path = require('path')


module.exports = (req,res)=>{
    
    let image = req.files.image;

    const uploadPath = path.resolve(__dirname,'../public/img',image.name);

    image.mv(uploadPath, async (error) => {
        if (error) {
          console.error(error);
          return res.status(500).send('Error uploading file.');
        }
    
        // The file has been successfully moved
        // Continue with the rest of your code here
        // For example, you can create a blog post:
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name,
            userid: req.session.userId
        });
    
        res.redirect('/');

    })
    
    // image.mv(path.resolve(__dirname,'uploads','img',image.name), async (error)=>{
        // if (error) {
        //     console.error(error);
        //     // Handle the error appropriately, e.g., return an error response to the client
        //   } else {
        //     await BlogPost.create(req.body);
        //     res.redirect('/');
        //   }
        
    //     await BlogPost.create(req.body)
    //     res.redirect('/')
    //     console.log(path.resolve(__dirname,'uploads','img',image.name))

    //  }) 

    
}

