// libs
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const {
  ObjectID
} = require('mongodb');



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
var {authenticate} = require('./middleware/authenticate');

var app = express();
// bodyparser take json and converts to body object

app.use(bodyParser.json());

// for Heroku
const port = process.env.PORT || 3000;

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
    res.send({
      todos
    }); // making code more flexible for future
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
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  //res.send(req.params);
  if (!ObjectID.isValid(id)) {
    console.log('Id not valid');
    res.status(404).send();
  }
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();

    }
    res.send({
      todo
    });
    console.log('Id: ', id);
  }, (e) => {
    res.status(400).send();
    console.error(e)
  });
});

app.delete('/todos/:id', (req, res) => {
  // get the id
  var id = req.params.id;
  // validate id - > not valid return 404
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  // remove todo by id
  Todo.findByIdAndRemove(id).then((todo) => {
    if (todo === null) {
      console.log("Can't find document!");
      return res.status(404).send();
    }
    return res.status(200).send(todo);
  }).catch((e) => {
    return res.status(404).send();
  });
  // success
  // if no doc 404
  // if doc, send doc back with 200
  // error -404
});
// LODASH PICK

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set:body}, {new: true}).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    // res.send({todo:todo})
    res.send({todo})
  }).catch((e)=>{
    res.status(404).send();
  })
});

////////////////////////////////////////////////////
////////////////////////////User
////////////////Authentication
///////Start

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req,res)=>{
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) =>{
    return user.generateAuthToken().then((token)=>{
      res.header('x-auth', token).send(user);
    });
  }).catch((e)=>{
    res.status(404).send();
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}! `);
});

module.exports = {
  app
};
