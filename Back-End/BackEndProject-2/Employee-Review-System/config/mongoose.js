const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
// mongoose.connect('mongodb://127.0.0.1:27017/employee_review');
mongoose.connect('mongodb+srv://harish:harish123@cluster0.0qpeyqk.mongodb.net/employee_review');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to the db'));

db.once('open', function () {
  console.log("Successfully connected to the Database");
});

module.exports = db;
