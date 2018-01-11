const {
  MongoClient,
  ObjectID
} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log("Unable to connect to MongoDB server");
  }
  console.log('Success! Connected to MongoDB');
  const myDB = db.db('TodoApp');


  myDB.collection('Users').find({
    name: 'Marcia'
  }).toArray().then((docs) => {
    console.log('Users: ' + docs.length);
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });


  //Zliczanie ile jest wyników
  // myDB.collection('Todos').find().count().then((count) => {
  //   console.log('Todos: ' + count);
  // //  console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  // szukanie po zapytaniu
  // find zwraca kursor z mongodb, nie cały dokument
  // toArray zwraca promise
  // tworzenie query dzieje się w find
  // {completed: falfse}
  //
  // myDB.collection('Todos').find({
  //   _id: new ObjectID('5a5662df2595671b100f3d5b')
  // }).toArray().then((docs) => {
  //   console.log('Todos: ');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });



  //db.close();
});
