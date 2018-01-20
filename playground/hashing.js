const bcrypt = require('bcryptjs');

var password = '123abc!';

bcrypt.genSalt(10, (err,salt)=>{
  bcrypt.hash(password, salt,(err, hash)=>{
    console.log(hash);
  });
});

var hashedPassword = '$2a$10$oNOTirPpxeinc5G7JciHsO7.s4cWyOxq3GnCHBUw3oNLGKIn.sCRS';

bcrypt.compare(password, hashedPassword, (err,res)=>{
  console.log(res);
});

// crypto-js
// w aplikacji - jsonwebtoken
// jwt.io

// const jwt = require('jsonwebtoken');
//
// var data = {
//   id: 5
// };
//
// var token = jwt.sign(data,'123abc');
// console.log(token);
// // jwt.verify
//
// var decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);

// Obydwie funkcje poniżej do haszowania, zawarte są w lib jsonwebtoken.
// const {SHA256} = require('crypto-js');
//
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
// console.log(hash);
//
//
// var data = {
//   id: 4
// };
//
// var token = {
//   data,
//   // haszujemy datę i dodajemy nasz sekret, który jest niewidzialny dla usera
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };
//
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// ////////////JASON WEB TOKEN
// // haszujemy datę jeszcze raz i porównujemy z hashem stworzonym w obiekcie.
// // jeśli obiekt byłby zmodyfikowany na zewnątrz, to nie znałby hasła i wyszłaby różnica
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if (resultHash === token.hash){
//   console.log('Data was not changed!');
// } else {
//   console.log('Data was changed. Do not trust!');
// };
