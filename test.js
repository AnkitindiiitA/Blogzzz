// const mongoose = require('mongoose')
// const BlogPost = require('./models/BlogPost')
// console.log(BlogPost)
const path = require('path')
// mongoose.connect('mongodb://localhost:27017/my_database', {
//     useNewUrlParser: true
// }).then(() =>{
//     console.log(`connection successful`);
// }).catch((err) =>{
//     console.log(err);
// })
// BlogPost.create(
//     {
//         title: 'The Mythbuster’s Guide to Saving Money on Energy Bills',
//         body: 'If you have been here a long time, you might remember when I went on ITV Tonight todispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite moneytopics, because once you get past the boring bullet-point lists, a whole new world of thrifty nerderyopens up. You know those bullet-point lists. You start spotting them everything at this time of year.They go like this:' 
//     }

//     ).then(result =>{
//         console.log(result)
//     })
// const spath=path.resolve(__dirname,'public/img',image.name)
// console.log(spath)

//     const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/bdaRegistration",{
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
//     // useCreateIndex:true
// }).then(() =>{
//     console.log(`connection successful`);
// }).catch((err) =>{
//     console.log(err);
// });

const fs = require('fs');

const directoryPath = path.resolve(__dirname, 'uploads');
console.log(directoryPath)
fs.access(directoryPath, fs.constants.W_OK, (error) => {
  if (error) {
    console.error('Write access is not granted for the directory.');
    console.error(error);
    return;
  }

  console.log('Write access is granted for the directory.');
});