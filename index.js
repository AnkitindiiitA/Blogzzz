
const express = require('express')
app = express() 
const path = require('path');
const staticpath = (path.join(__dirname,'/public'))
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const BlogPost = require('./models/BlogPost')
const fileUplaod = require('express-fileupload')
const expressSession = require('express-session');
const flash = require('connect-flash');


app.use(flash());



 


app.use(expressSession({
    secret: 'keyboard cat'
}))

global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()  
});

const allpostsController = require('./controllers/allPosts');
app.get('/allposts', allpostsController)

const logoutController = require('./controllers/logout')
app.get('/auth/logout',logoutController)



// const validateMiddleWare = (req,res,next)=>{
//        if(req.files == null || req.body.title == null || req.body.title == null)
//        {
//             return res.redirect('/posts/new')
//        } 
//             next()
// }
const validateMiddleware = require("./middleware/validateMiddleware");
const authMiddleware= require('./middleware/authMiddleware');


app.use(fileUplaod({
    useTempFiles:true,
    tempFileDir:'public/img/'
}))

app.use('/posts/store',validateMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


// app.post('/posts/store', (req,res)=>{
    
//     let image = req.files.image;

//     const uploadPath = path.resolve(__dirname,'public/img',image.name);

//     image.mv(uploadPath, async (error) => {
//         if (error) {
//           console.error(error);
//           return res.status(500).send('Error uploading file.');
//         }
    
//         // The file has been successfully moved
//         // Continue with the rest of your code here
//         // For example, you can create a blog post:
//         await BlogPost.create({
//             ...req.body,
//             image: '/img/' + image.name
//         });
    
//         res.redirect('/');

//     })
    
//     // image.mv(path.resolve(__dirname,'uploads','img',image.name), async (error)=>{
//         // if (error) {
//         //     console.error(error);
//         //     // Handle the error appropriately, e.g., return an error response to the client
//         //   } else {
//         //     await BlogPost.create(req.body);
//         //     res.redirect('/');
//         //   }
        
//     //     await BlogPost.create(req.body)
//     //     res.redirect('/')
//     //     console.log(path.resolve(__dirname,'uploads','img',image.name))

//     //  }) 

    
// }) 

const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')

// mongoose.connect('mongodb://localhost:27017/my_database',{
//     useNewUrlParser:true,
//     useUnifiedTopology: true
// }).then(() =>{
//     console.log(`connection successful`);
// }).catch((error) =>{
//     console.log('Connection error:', error);
// })

mongoose.connect('mongodb://127.0.0.1:27017/my_database', {
    useNewUrlParser: true
}).then(() => {
    console.log('Connection successful');
}).catch((error) => {
    console.log('Connection error:', error);
});



const newUserController = require('./controllers/newUser')


// app.post('/posts/store',storePostController)
app.post('/posts/store',authMiddleware,storePostController)

// app.post('/posts/store',(req,res)=>{ 
//       console.log(req.body);
//       res.redirect('/')
// })

app.set('view engine','ejs');

app.use(express.static(staticpath))

// app.get('/',async (req,res)=>{
//        const blogposts = await BlogPost.find({})
//     //    console.log(blogposts)
//         res.render('index',{blogposts: blogposts});
//     })

const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
// app.get('/auth/register', newUserController)

app.get('/auth/register',redirectIfAuthenticatedMiddleware, newUserController)
app.get('/',homeController);

const storeUserController = require('./controllers/storeUser')
// app.post('/users/register', storeUserController)
app.post('/users/register',redirectIfAuthenticatedMiddleware, storeUserController)

const loginController = require('./controllers/login')
// app.get('/auth/login', loginController)
app.get('/auth/login',redirectIfAuthenticatedMiddleware, loginController)

const loginUserController = require('./controllers/loginUser')
// app.post('/users/login',loginUserController)
app.post('/users/login',redirectIfAuthenticatedMiddleware, loginUserController)

// app.get('/',(req,res)=>{   
//     //res.sendFile(path.resolve(__dirname,'pages/index.html'))
//     res.render('index');
// })

app.get('/about',(req,res)=>{ 
    //res.sendFile(path.resolve(__dirname,'pages/about.html'))
    res.render('about');
})
 
app.get('/contact',(req,res)=>{ 
    //res.sendFile(path.resolve(__dirname,'pages/contact.html'))
    res.render('contact');
})

// app.get('/post/:id',async (req,res)=>{ 
//     //res.sendFile(path.resolve(__dirname,'pages/post.html'))
//     // console.log(req.params)
//     const blogpost = await BlogPost.findById(req.params.id)
//     console.log(blogpost)
//     res.render('post',{
//         blogpost
//     })
// })
app.get('/post/:id',getPostController)


const newPostController = require('./controllers/newPost')
// app.get('/posts/new',newPostController)
app.get('/posts/new',authMiddleware,newPostController)

// app.get('/post',(req,res)=>{
//     res.render('post')
// }) 

app.use((req, res) => res.render('notfound'));

app.listen(3000,()=>{
    console.log("App listening on port 3000")
})