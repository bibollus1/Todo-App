// libs
const express = require('express');
const bodyParser = require('body-parser');
const{ObjectID} = require('mongodb');

// local
const {
  mongoose
} = require('./db/mongoose.js');
const {
  Todo
} = require('./models/todo.js');
const {
  User
} = require('./models/users.js')

var app = express();
// bodyparser take json and converts to body object

app.use(bodyParser.json());

// for resource creation
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    completedAt: req.body.completedAt
  });
  todo.save().then((doc) => {
    res.send(doc);
    console.log("Success!");
  }, (e) => {
    res.send(e);
    console.error("Error: ", e);
  });
});

app.get('/todos', (req, res) => {
  // return everything
  Todo.find().then((todos) => {
    res.send({todos}); // making code more flexible for future
  }, (e) => {
    res.status(400).send(e);
  });
});
// 1. validate is id valid method
// 2. is not stop and send 404 - send back empty body
// 3. findById
// 4. success - if todo - send it back
// if no todo - 404 with empty body
// 5. error - send back 400 - send back empty body
// GET /todos/12345
app.get('/todos/:id', (req,res) =>{
  var id = req.params.id;
  //res.send(req.params);
  if(!ObjectID.isValid(id)){
    console.log('Id not valid');
    res.status(404).send();
  }
  Todo.findById(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();

    }
    res.send({todo});
    console.log('Id: ', id);
  }, (e) =>{
    res.status(400).send();
    console.error(e)
  });

});


app.listen(3000, () => {
  console.log('Started on port 3000!');
});

module.exports = {
  app
}
