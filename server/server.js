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
var {
  authenticate
} = require('./middleware/authenticate');

var app = express();
// bodyparser take json and converts to body object

app.use(bodyParser.json());

// for Heroku
const port = process.env.PORT || 3000;

// for resource creation
app.post('/todos', authenticate,(req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
    // completed: req.body.completed,
    // completedAt: req.body.completedAt
  });
  todo.save().then((doc) => {
    res.send(doc);
    console.log("Success!");
  }, (e) => {
    res.send(e);
    console.error("Error: ", e);
  });
});

app.get('/todos', authenticate,(req, res) => {
  // return everything
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
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

app.get('/todos/:id', authenticate,(req, res) => {
  var id = req.params.id;
  //res.send(req.params);
  if (!ObjectID.isValid(id)) {
    console.log('Id not valid');
    res.status(404).send();
  }
  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
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

app.delete('/todos/:id', authenticate, (req, res) => {
  // get the id
  var id = req.params.id;
  // validate id - > not valid return 404
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
    console.log('wtf');
  }
  // remove todo by id
  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id

  }).then((todo) => {
    if (!todo) {

      return res.status(404).send();console.log('wtf');
    }
    return res.status(200).send(todo);console.log('wtf');
  }).catch((e) => {
    return res.status(404).send();console.log('wtf');

  });
  // success
  // if no doc 404
  // if doc, send doc back with 200
  // error -404
});
// LODASH PICK

app.patch('/todos/:id',authenticate ,(req, res) => {
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

  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  }, {
    $set: body
  }, {
    new: true
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    // res.send({todo:todo})
    res.send({
      todo
    })
  }).catch((e) => {
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

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(404).send();
  });
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(()=>{
    res.status(200).send();
  }, ()=>{
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}! `);
});

module.exports = {
  app
};
