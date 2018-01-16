const{ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/users')

Todo.remove({}).then((result)=>{
  console.log(result);
});

const id = "5a5d0e381aecb22f9891a3e7";

Todo.findOneAndRemove({_id: id}).then((todo)=>{

});

// Todo.findByIdAndRemove(id).then((todo)=>{
//   console.log(todo);
// });
