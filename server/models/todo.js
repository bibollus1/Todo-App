const mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true

  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId, 
    require: true
  }
});

module.exports={Todo};


// Adding todo


// var newTodo = new Todo({
//   text: "Cook dinner"
// });
// var sthTodo = new Todo({
//   text: 'Something to do'
// });
//
// sthTodo.save().then((doc)=>{
//   console.log('Saved challenge!');
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e)=>{
//   console.log('Unable to finish challenge!');
// });
