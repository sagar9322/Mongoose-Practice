// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// require('dotenv').config();

// let _db;

// const mongoConnect = callback => {
//   MongoClient.connect(
//     `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PWD}@cluster0.nu2y6hy.mongodb.net/?retryWrites=true&w=majority`
//   )
//     .then(client => {
//       console.log('Connected!');
//       _db = client.db();
//       callback();
//     })
//     .catch(err => {
//       console.log(err);
//       throw err;
//     });
// };

// const getDb = () => {
//   if (_db) {
//     return _db;
//   }
//   throw 'No database found!';
// };

// exports.mongoConnect = mongoConnect;
// exports.getDb = getDb;