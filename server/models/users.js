// Schema is an object that defines the structure of any documents that will be stored in your MongoDB collection;
// it enables you to define types and validators for all of your data items.
//
// Model is an object that gives you easy access to a named collection,
// allowing you to query the collection and use the Schema to validate any documents you save to that collection.
// It is created by combining a Schema, a Connection, and a collection name.

const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');


var UserSchema = new mongoose.Schema({
    email: {
      type: String,
      require: true,
      trim: true,
      minlength: 1,
      unique: true,
      validate: {
        //validator: validator.isEmail,
        validator: (value) => {
          return validator.isEmail(value);
        },
        message: '{value} is not a valid email.'
      }
    },
    password: {
      type: String,
      require: true,
      minlength: 6
    },
    tokens: [{
      accesss: {
        type: String,
        require: true
      },
      token: {
        type: String,
        require: true
      },
    }],

  },

  {
    usePushEach: true
  }
);
// to not give everything back to user - fe in postman to not send password and tokens
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

var User = mongoose.model('User', UserSchema);




// POST /users

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
module.exports = {
  User
};
