var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('We are connected!');
});

var kittySchema = mongoose.Schema({
  name: String
});

// var Kitten = mongoose.model('Kitten', kittySchema);
//
// var kocie = new Kitten({name: 'Kocie'});
// console.log(kocie.name);

kittySchema.methods.speak = function (){
  var greeting = this.name ? 'Meow name is ' + this.name : "I don't have a name. :(";
  console.log(greeting);
};



var Kitten = mongoose.model('Kitten', kittySchema);

var fluffy = new Kitten({
  name: 'Fluffy'
});
//fluffy.speak();

var kocie = new Kitten({
  name: 'Kocie'
});
//kocie.speak();

kocie.save((err, kocie)=>{
  if (err){
    return console.error(err);
  }
  fluffy.speak();
});

Kitten.find((err,kittens)=>{
  if (err){
    return console.error(err);
  }
  console.log(kittens.name);
});
