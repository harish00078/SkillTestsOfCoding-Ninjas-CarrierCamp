const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/Polling_System');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to the db'));

db.once('open', function () {
  console.log("Successfully connected to the Database");
});

module.exports = db;
