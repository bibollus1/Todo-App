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

  myDB.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5a57663a379d440dc4ba6d76')
  }, {
    $set: {
      name: "MarciaZaRokITrochę"
    },
    $inc: {
      age: 2
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  // myDB.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5a57a9980fa3f710880cbe77')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result)=>{
  //   console.log(result);
  // });
  // db.close();
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
