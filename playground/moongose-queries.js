const{ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/users')
// challenge - query users collecion, grab id, findById, handle: query works without user, query with found user, and error.

var chalId = '5a59f46cfc3d140dfc49eb35';

User.findById(chalId).then((user)=>{
  if(!user){
    return console.error('Id not found!');
  }
  console.log('User', user);
}, (e) =>{console.error(e)});


// var id = '5a5bb5772ac83415c0931dd04';
//
// if(!ObjectID.isValid(id)){
//   console.log('Id not valid');
// }

// we don't have to manualy convert string to object id

// Todo.find({
//   _id: id
// }).then((todos)=>{
//   console.log('Todos', todos);
// });
//
// // If looking to find one document by something other than id use find one
//
// Todo.findOne({
//   _id: id
// }).then((todo)=>{
//   console.log('Todo', todo);
// });

// looking to find by ID use methid below

// Todo.findById(id).then((todo)=>{
//   if(!todo){
//     return console.error('Id not found!');;
//   }
//   console.log('Todo by id', todo);
// }).catch((e)=>console.log(e));


//mongoosejs.com/docs/queries.html
