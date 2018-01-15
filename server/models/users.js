const mongoose = require('mongoose');

var User = mongoose.model('User',{
  email: {
    type: String,
    require: true,
    trim: true,
    minlength: 1
  }
});


// Example of creating new user
//
// var krzynio = new User({
//   email: 'bibollus1@gmail.com'
// });
//
//
// krzynio.save().then((doc)=>{
//   console.log('User succesfully added to DB!');
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) =>{
//   console.error('Unable to add user!');
// });
//
 module.exports = {User};
