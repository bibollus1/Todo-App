// libs
const express = require('express');
const bodyParser = require('body-parser');


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
  todo.save().then((doc)=>{
    res.send(doc);
    console.log("Success!");
  },(e)=>{
    res.send(e);
    console.error("Error: ", e);
  });
});


app.listen(3000, () => {
  console.log('Started on port 3000!');
});

module.exports = {
  app
}
