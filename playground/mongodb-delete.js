const {
  MongoClient,
  ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const myDB = db.db('TodoApp');



  myDB.collection('Users').deleteMany({
    name: 'Marcia'
  }).then((result) => {
    console.log(result);
  });
  // można i bez then
  //  myDB.collection('Users').deleteMany({name: 'Marcia'});

  myDB.collection('Users').findOneAndDelete({
    // pamietać o single quote!
  _id: new ObjectID('5a57a6cd5a64b16f8fce17e4')
  }).then((result) => {
    console.log(result);
  });
});






// MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
//   if (err){
//     return console.log('Unable to connect to MongoDB server');
//   }
//   console.log('Connected to MongoDB server');
//   const myDB = db.db('TodoApp');
//
//   //deleteMany - many documents and delete them
//   //
//   // myDB.collection('Todos').deleteMany({text: 'Eat dinner'}).then((result)=>{
//   //   console.log(result);
//   // });
//
//
//   //deleteOne - usuwa jedno i tyle
//   //
//   // myDB.collection('Todos').deleteOne({text: 'Eat dinner'}).then((result)=>{
//   //   console.log(result);
//   // });
//
//   //findOneAndDelete - usuwa jedno i pokazuje jego zawartość
//   //
//   // myDB.collection('Todos').findOneAndDelete({text: 'Eat dinner'}).then((result)=>{
//   //   console.log(result);
//   // });
//
//   // db.close();
// });
