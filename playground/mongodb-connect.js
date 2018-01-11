// http://mongodb.github.io/node-mongodb-native/3.0/api/

//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // to samo co wyżej przed przecinkiem



// Object Destructuring
//
// var user = {
//   name: 'Krzysio',
//   age: 25
// };
//
// var {name} = user;
// var name2 = user.name;


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    // dzięki return po wywołaniu loga, funkcja się skończy
    // to zapobiega niechcianym bugom
    // zamiast tego, można użyć else, ale tak jest przejrzyściej
    return console.log("Unable to connect to MongoDB server");
  }
  console.log('Success! Connected to MongoDB');
  const myDB = db.db('TodoApp');
  // db.close();


// });
// DODAWANIE ELEMENTÓW DO MONGODB - Na końcu dodać klamrę i nawias zamykający!
//
myDB.collection('Todos').insertOne({
  text: 'Eat dinner',
  completed: false

}, (err, result)=>{
  if (err){
    return console.log('Unable to insert todo!', err);
  }
  // ops attribute is going to store all of the docs that were inserted in this case
  console.log(JSON.stringify(result.ops,undefined,2));
});


db.close();
});

// myDB.collection('Users').insertOne({
//   name: 'Marcia',
//   age: 22,
//   location: 'Szczecinek, Poland'
// },(err, result)=>{
//   if (err){
//     return console.log("Unable to insert Users", err);
//   }
//   console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
// });
//
// db.close();
//


// const MongoClient=require('mongodb').MongoClient;
// MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{
//  if (err) {
//  return console.log('Unable to connect to MongoDB server');
//  }
//  console.log('Connected to MongoDB server');
//  const myDB=db.db('TodoApp');
//  myDB.collection('Todos').insertOne({
//  text: 'something to do',
//  completed: false
//  },(err,result)=>{
//  if(err) return console.log('Unable to insert todo', err);
//  console.log(JSON.stringify(result.ops, undefined,2));
//  });
//  db.close();
// });
